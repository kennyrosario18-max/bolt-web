/** Lógica del formulario de disponibilidad — vanilla, sin hidratación React
 *  (shim del PRD F3). Reglas de negocio portadas 1:1 del componente anterior:
 *   · fechas locales RD (mínimo = hoy local, no UTC),
 *   · mínimo de días: por zona, general (2) y de temporada alta (5); manda el mayor
 *     (aviso en vivo + bloqueo al enviar),
 *   · transporte por zona (nota en vivo + 1 viaje en el estimado si no está exento),
 *   · links prellenados: ?modelo= ?zona= ?alojamiento= ?lugar= (ej. el link de la villa),
 *   · armado del mensaje wa.me idéntico al resumen anterior,
 *   · captura dual (form_submit + form_open_whatsapp) en window.__boltEvents,
 *   · a11y: aria-invalid/aria-describedby, aria-live en avisos, role=status en éxito.
 *  Las escrituras iniciales al DOM (min, preselección) se difieren a 'load' para
 *  no chocar con la hidratación del router (mismatch). */

interface Fields {
  nombre: string; email: string; whatsapp: string; modelo: string;
  llegada: string; salida: string; entrega: string; alojamiento: string; pasajeros: string; comentarios: string;
}
interface Payload {
  phone: string; header: string; plazas: string; recommend: string;
  day: string; days: string; f: Fields;
  errFechas: string; errOrden: string; errMin: string; warnMin: string; zoneNoteTpl: string;
  errBaseMin: string; warnBaseMin: string; errHighMin: string; warnHighMin: string;
  minBase: number; minHigh: number; high: ReadonlyArray<readonly [string, string]>;
  transportTpl: string; transportNoFreeTpl: string; estTransport: string; estTransportFree: string; estTransportQuoted: string;
  estHigh: string; night: string; nights: string; high4: number; high6: number;
  estimateTpl: string; price4: number; price6: number;
  web3key: string; emailSubject: string;
}

function script(p: Payload): string {
  return `
(function(){
  var P=${JSON.stringify(p)};
  var form=document.getElementById('req-form');
  if(!form)return;
  var $=function(id){return document.getElementById(id);};
  var llegada=$('llegada'),salida=$('salida'),zona=$('zona'),modelo=$('modelo'),pasajeros=$('pasajeros');
  var zonaNote=$('zona-note'),warn=$('min-warning'),err=$('form-error'),estimate=$('estimate');

  // Fechas RD locales: se parsean por componentes (no UTC) para un conteo exacto.
  function diffDays(a,b){if(!a||!b)return 0;var x=a.split('-'),y=b.split('-');return Math.round((new Date(+y[0],+y[1]-1,+y[2])-new Date(+x[0],+x[1]-1,+x[2]))/86400000);}
  function zopt(){return zona.options[zona.selectedIndex];}
  function fill(tpl,map){return tpl.replace(/\\{(\\w+)\\}/g,function(_,k){return map[k]!=null?map[k]:'';});}
  function val(id){var el=$(id);return el?el.value.trim():'';}

  // ¿Alguna noche de la renta [llegada, salida) cae en temporada alta? Fechas ISO: se comparan como texto.
  function isHigh(a,b){if(!a||!b)return false;for(var i=0;i<P.high.length;i++){if(a<=P.high[i][1]&&b>P.high[i][0])return true;}return false;}
  // Mínimo que manda: el de la zona si es mayor; si no, el general o el de temporada alta.
  function minRule(){
    var o=zopt(),zm=o?+(o.getAttribute('data-mindays')||0):0;
    var hs=isHigh(llegada.value,salida.value),base=hs?P.minHigh:P.minBase;
    if(zm>=base)return{min:zm,kind:'zone',name:o.getAttribute('data-name')};
    return{min:base,kind:hs?'high':'base',name:''};
  }
  function syncDeps(){
    var o=zopt();
    var md=o?o.getAttribute('data-mindays'):'';
    var note=o?o.getAttribute('data-note'):'';
    var name=o?o.getAttribute('data-name'):'';
    // Sin toggles de hidden: las regiones aria-live viven siempre en el árbol de
    // a11y; vacías las saca del flujo la regla :empty de globals.css.
    var tp=o?o.getAttribute('data-transport'):'',ff=o?o.getAttribute('data-freefrom'):'';
    if(md&&note){zonaNote.textContent=fill(P.zoneNoteTpl,{name:name,min:md,note:note});}
    else if(tp&&ff){zonaNote.textContent=fill(P.transportTpl,{price:tp,free:ff});}
    else if(tp){zonaNote.textContent=fill(P.transportNoFreeTpl,{price:tp});}
    else if(note){zonaNote.textContent=note;}
    else{zonaNote.textContent='';}
    var d=diffDays(llegada.value,salida.value),r=minRule();
    if(d>0&&d<r.min){
      var tpl=r.kind==='zone'?P.warnMin:(r.kind==='high'?P.warnHighMin:P.warnBaseMin);
      warn.textContent=fill(tpl,{name:r.name,min:r.min,days:d,dayword:d===1?P.day:P.days});
    }else{warn.textContent='';}
    updateEstimate();
  }

  // Tarifas "desde" del día [regular, temporada alta]: las del modelo elegido; si no, por pasajeros
  // (5+ personas => 6 plazas). [0,0] si no hay con qué estimar.
  function dailyPrices(){
    var mo=modelo.options[modelo.selectedIndex];
    if(mo&&mo.value&&mo.getAttribute('data-price'))return [+mo.getAttribute('data-price'),+(mo.getAttribute('data-hprice')||mo.getAttribute('data-price'))];
    var pax=pasajeros?pasajeros.value:'';
    if(pax){var n=parseInt(pax,10)||7;return n>=5?[P.price6,P.high6]:[P.price4,P.high4];}
    return [0,0];
  }
  // Noches de la renta que caen en temporada alta (cada noche = fecha de inicio de ese día de renta).
  function highNights(a,d){
    if(!a)return 0;var x=a.split('-'),c=0;
    for(var i=0;i<d;i++){
      var t=new Date(+x[0],+x[1]-1,+x[2]+i),iso=t.getFullYear()+'-'+('0'+(t.getMonth()+1)).slice(-2)+'-'+('0'+t.getDate()).slice(-2);
      for(var k=0;k<P.high.length;k++){if(iso>=P.high[k][0]&&iso<=P.high[k][1]){c++;break;}}
    }
    return c;
  }
  // Transporte de la zona elegida: [tarifa por viaje, días desde los que es gratis].
  function zoneTransport(){var o=zopt();return [o?+(o.getAttribute('data-transport')||0):0,o?+(o.getAttribute('data-freefrom')||0):0];}
  function updateEstimate(){
    if(!estimate)return;
    var d=diffDays(llegada.value,salida.value),pr=dailyPrices(),daily=pr[0];
    if(d>0&&daily>0){
      var hn=highNights(llegada.value,d);
      var zt=zoneTransport(),exempt=!!(zt[0]&&zt[1]&&d>=zt[1]);
      var tr=(zt[0]&&!exempt)?Math.round(zt[0]*1.18):0;   // 1 viaje con ITBIS; 0 si exento o se cotiza
      var total=Math.round(((d-hn)*daily+hn*pr[1])*1.18)+tr;    // ITBIS 18% incluido; noches de temporada alta a su tarifa
      var deposit=Math.round(total*0.50);       // depósito de confirmación 50%
      var trTxt=tr?fill(P.estTransport,{amount:tr}):(exempt?P.estTransportFree:(zt[0]?'':P.estTransportQuoted));
      var hsTxt=hn?fill(P.estHigh,{n:hn,nightword:hn===1?P.night:P.nights}):'';
      estimate.textContent=fill(P.estimateTpl,{total:total,days:d,dayword:d===1?P.day:P.days,deposit:deposit,transport:trTxt,season:hsTxt});
    }else{estimate.textContent='';}
  }

  function clearError(){
    err.hidden=true;err.textContent='';
    [llegada,salida,zona].forEach(function(fld){fld.removeAttribute('aria-invalid');fld.removeAttribute('aria-describedby');});
  }
  function showError(msg,fld){
    err.textContent=msg;err.hidden=false;
    if(fld){fld.setAttribute('aria-invalid','true');fld.setAttribute('aria-describedby','form-error');fld.focus();}
    err.scrollIntoView({block:'center',behavior:'smooth'});
  }

  function track(ev){(window.__boltEvents=window.__boltEvents||[]).push({event:ev,path:location.pathname,t:Date.now()});}

  // Respaldo por email (Web3Forms) — fire-and-forget: nunca bloquea ni rompe el
  // flujo de WhatsApp aunque el servicio falle. Garantiza que el lead quede
  // registrado aunque wa.me no abra.
  function sendEmail(summary){
    if(!P.web3key)return;
    var o=zopt(),mo=modelo.options[modelo.selectedIndex];
    try{
      fetch('https://api.web3forms.com/submit',{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify({
          access_key:P.web3key,
          subject:P.emailSubject,
          from_name:'BOLT · boltgolfcars.com',
          replyto:val('email'),
          Nombre:val('nombre'),
          WhatsApp:val('whatsapp'),
          Email:val('email'),
          Modelo:(mo&&mo.value)?mo.getAttribute('data-name'):P.recommend,
          Llegada:val('llegada'),
          Salida:val('salida'),
          Entrega:(o&&o.value)?o.getAttribute('data-name'):'',
          Alojamiento:alojaStr()||'(no indicado)',
          Pasajeros:val('pasajeros')||'(no indicado)',
          Comentarios:val('comentarios'),
          message:summary,
          botcheck:''
        })
      }).catch(function(){});
    }catch(e){}
  }

  function alojaStr(){
    var a=$('alojamiento');
    var tipo=(a&&a.value)?a.options[a.selectedIndex].text:'';
    var lugar=val('lugar');
    if(tipo&&lugar)return tipo+' · '+lugar;
    return tipo||lugar;
  }

  function buildMsg(d){
    var o=zopt();
    var zoneName=o&&o.value?o.getAttribute('data-name'):'';
    var zoneNote=(zonaNote.textContent||'').replace(zoneName+': ','');   // misma nota que ve el cliente, sin repetir la zona
    var mo=modelo.options[modelo.selectedIndex];
    var modelStr=(mo&&mo.value)?(mo.getAttribute('data-name')+' ('+mo.getAttribute('data-pax')+' '+P.plazas+')'):P.recommend;
    var f=P.f,aloja=alojaStr();
    var lines=[
      P.header,'',
      f.nombre+': '+val('nombre'),
      f.email+': '+val('email'),
      f.whatsapp+': '+val('whatsapp'),
      f.modelo+': '+modelStr,
      f.llegada+': '+val('llegada'),
      f.salida+': '+val('salida')+(d>0?(' ('+d+' '+(d===1?P.day:P.days)+')'):''),
      f.entrega+': '+zoneName+(zoneNote?(' — '+zoneNote):''),
      aloja?(f.alojamiento+': '+aloja):'',
      val('pasajeros')?(f.pasajeros+': '+val('pasajeros')):'',
      val('comentarios')?(f.comentarios+': '+val('comentarios')):''
    ];
    return lines.filter(Boolean).join('\\n');
  }

  function succeed(){
    form.hidden=true;
    var s=$('req-success');
    s.hidden=false;
    s.focus();
  }

  form.addEventListener('submit',function(e){
    e.preventDefault();
    clearError();
    if(val('empresa')){succeed();return;} // honeypot: éxito falso, sin abrir WhatsApp
    var la=llegada.value,sa=salida.value;
    if(!la||!sa){showError(P.errFechas,!la?llegada:salida);return;}
    var d=diffDays(la,sa);
    if(d<=0){showError(P.errOrden,salida);return;}
    var r=minRule();
    if(d<r.min){
      var etpl=r.kind==='zone'?P.errMin:(r.kind==='high'?P.errHighMin:P.errBaseMin);
      showError(fill(etpl,{name:r.name,min:r.min}),salida);return;
    }
    var summary=buildMsg(d);
    var url='https://wa.me/'+P.phone+'?text='+encodeURIComponent(summary);
    track('form_submit');track('form_open_whatsapp');
    sendEmail(summary); // respaldo por email (no bloquea)
    var fb=$('wa-fallback');if(fb)fb.setAttribute('href',url);
    window.open(url,'_blank','noopener,noreferrer');
    succeed();
  });
  // salida.min se ajusta al elegir la llegada — interacción del usuario, ya
  // post-hidratación, así que mutar el atributo aquí no provoca mismatch.
  llegada.addEventListener('change',function(){salida.min=llegada.value;syncDeps();});
  salida.addEventListener('change',syncDeps);
  zona.addEventListener('change',syncDeps);
  if(modelo)modelo.addEventListener('change',updateEstimate);
  if(pasajeros)pasajeros.addEventListener('change',updateEstimate);

  // Preselección ?modelo y avisos iniciales. selectedIndex es una propiedad (no
  // un atributo que React reconcilie en un <select> no controlado), así que no
  // genera mismatch de hidratación.
  function preselect(el,v){if(!el||!v)return;for(var i=0;i<el.options.length;i++){if(el.options[i].value===v){el.selectedIndex=i;return;}}}
  function initState(){
    var q=new URLSearchParams(location.search);
    preselect(modelo,q.get('modelo'));
    preselect(zona,q.get('zona'));
    preselect($('alojamiento'),q.get('alojamiento'));
    var lugar=$('lugar'),lg=q.get('lugar');
    if(lugar&&lg&&!lugar.value)lugar.value=lg.slice(0,80);   // propiedad value: no toca el HTML
    syncDeps();
  }
  if(document.readyState==='complete')initState();
  else window.addEventListener('load',initState);
})();
`;
}

export function RequestFormEnhance({ payload }: { payload: Payload }) {
  return <script dangerouslySetInnerHTML={{ __html: script(payload) }} />;
}
