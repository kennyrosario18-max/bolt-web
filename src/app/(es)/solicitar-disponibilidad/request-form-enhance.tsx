/** Lógica del formulario de disponibilidad — vanilla, sin hidratación React
 *  (shim del PRD F3). Reglas de negocio portadas 1:1 del componente anterior:
 *   · fechas locales RD (mínimo = hoy local, no UTC),
 *   · mínimo de días por zona (aviso en vivo + bloqueo al enviar),
 *   · armado del mensaje wa.me idéntico al resumen anterior,
 *   · captura dual (form_submit + form_open_whatsapp) en window.__boltEvents,
 *   · a11y: aria-invalid/aria-describedby, aria-live en avisos, role=status en éxito.
 *  Las escrituras iniciales al DOM (min, preselección) se difieren a 'load' para
 *  no chocar con la hidratación del router (mismatch). */

interface Fields {
  nombre: string; email: string; whatsapp: string; modelo: string;
  llegada: string; salida: string; entrega: string; pasajeros: string; comentarios: string;
}
interface Payload {
  phone: string; header: string; plazas: string; recommend: string;
  day: string; days: string; f: Fields;
  errFechas: string; errOrden: string; errMin: string; warnMin: string; zoneNoteTpl: string;
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

  function syncDeps(){
    var o=zopt();
    var md=o?o.getAttribute('data-mindays'):'';
    var note=o?o.getAttribute('data-note'):'';
    var name=o?o.getAttribute('data-name'):'';
    // Sin toggles de hidden: las regiones aria-live viven siempre en el árbol de
    // a11y; vacías las saca del flujo la regla :empty de globals.css.
    if(md&&note){zonaNote.textContent=fill(P.zoneNoteTpl,{name:name,min:md,note:note});}
    else{zonaNote.textContent='';}
    var d=diffDays(llegada.value,salida.value);
    if(md&&d>0&&d<+md){
      warn.textContent=fill(P.warnMin,{name:name,min:md,days:d,dayword:d===1?P.day:P.days});
    }else{warn.textContent='';}
    updateEstimate();
  }

  // Tarifa "desde" del día: la del modelo elegido; si no, por pasajeros
  // (5+ personas => tarifa de 6 plazas). Devuelve 0 si no hay con qué estimar.
  function dailyPrice(){
    var mo=modelo.options[modelo.selectedIndex];
    if(mo&&mo.value&&mo.getAttribute('data-price'))return +mo.getAttribute('data-price');
    var pax=pasajeros?pasajeros.value:'';
    if(pax){var n=parseInt(pax,10)||7;return n>=5?P.price6:P.price4;}
    return 0;
  }
  function updateEstimate(){
    if(!estimate)return;
    var d=diffDays(llegada.value,salida.value),daily=dailyPrice();
    if(d>0&&daily>0){
      var total=Math.round(d*daily*1.18);      // ITBIS 18% incluido
      var deposit=Math.round(total*0.30);       // depósito de confirmación 30%
      estimate.textContent=fill(P.estimateTpl,{total:total,days:d,dayword:d===1?P.day:P.days,deposit:deposit});
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
          Pasajeros:val('pasajeros')||'(no indicado)',
          Comentarios:val('comentarios'),
          message:summary,
          botcheck:''
        })
      }).catch(function(){});
    }catch(e){}
  }

  function buildMsg(d){
    var o=zopt();
    var zoneName=o&&o.value?o.getAttribute('data-name'):'';
    var zoneNote=o?o.getAttribute('data-note'):'';
    var mo=modelo.options[modelo.selectedIndex];
    var modelStr=(mo&&mo.value)?(mo.getAttribute('data-name')+' ('+mo.getAttribute('data-pax')+' '+P.plazas+')'):P.recommend;
    var f=P.f;
    var lines=[
      P.header,'',
      f.nombre+': '+val('nombre'),
      f.email+': '+val('email'),
      f.whatsapp+': '+val('whatsapp'),
      f.modelo+': '+modelStr,
      f.llegada+': '+val('llegada'),
      f.salida+': '+val('salida')+(d>0?(' ('+d+' '+(d===1?P.day:P.days)+')'):''),
      f.entrega+': '+zoneName+(zoneNote?(' — '+zoneNote):''),
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
    var o=zopt();
    var md=o?+(o.getAttribute('data-mindays')||0):0;
    if(md&&d<md){showError(fill(P.errMin,{name:o.getAttribute('data-name'),min:md}),salida);return;}
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
  function initState(){
    var pre=new URLSearchParams(location.search).get('modelo');
    if(pre){for(var i=0;i<modelo.options.length;i++){if(modelo.options[i].value===pre){modelo.selectedIndex=i;break;}}}
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
