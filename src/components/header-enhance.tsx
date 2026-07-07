import { SEGMENT_ES_TO_EN } from "@/lib/i18n";

/** Mejora progresiva del header — vanilla, sin hidratación React (shim del PRD
 *  F3). Hace dos cosas y nada más:
 *   1. Switcher de idioma: reescribe [data-langswitch] a la ruta equivalente
 *      exacta (mismo algoritmo que counterpartPath en lib/i18n) + query actual.
 *      Sin JS el enlace ya apunta a la home del otro idioma (respaldo válido).
 *   2. Menú móvil: sincroniza aria-expanded con el Popover API y, en navegadores
 *      sin soporte de Popover, activa un toggle de clase + Escape de respaldo.
 *  El mapa de segmentos se inyecta desde la MISMA fuente que usa el servidor. */
const SCRIPT = `
(function(){
  var MAP=${JSON.stringify(SEGMENT_ES_TO_EN)};
  var REV={};for(var k in MAP)REV[MAP[k]]=k;
  function counterpart(p){
    var c=p.replace(/\\/+$/,'')||'/';
    if(c==='/')return '/en';
    if(c==='/en')return '/';
    var parts=c.split('/').filter(Boolean);
    if(parts[0]==='en'){var es=REV[parts[1]];if(!es)return '/';return '/'+[es].concat(parts.slice(2)).join('/')+'/';}
    var en=MAP[parts[0]];if(!en)return '/en/';return '/en/'+[en].concat(parts.slice(1)).join('/')+'/';
  }
  function initLang(){
    // Interceptamos el clic en vez de reescribir el href: así el atributo del DOM
    // queda igual que lo renderizó el servidor (sin mismatch de hidratación) y el
    // clic normal navega a la ruta equivalente exacta + query. Un clic con
    // modificador (nueva pestaña) usa el href de respaldo (home del otro idioma).
    document.addEventListener('click',function(e){
      var a=e.target&&e.target.closest&&e.target.closest('[data-langswitch]');
      if(!a)return;
      if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
      e.preventDefault();
      location.href=counterpart(location.pathname)+(location.search||'');
    });
  }
  function initMenu(){
    var btn=document.getElementById('nav-toggle');
    var nav=document.getElementById('nav-movil');
    if(!btn||!nav)return;
    function sync(open){
      btn.setAttribute('aria-expanded',open?'true':'false');
      if(open)btn.classList.add('is-open');else btn.classList.remove('is-open');
    }
    if(typeof nav.showPopover==='function'){
      // Popover nativo: el atributo popovertarget hace el toggle; solo reflejamos
      // el estado (aria-expanded + animación de la hamburguesa).
      nav.addEventListener('toggle',function(e){sync(e.newState==='open');});
    }else{
      // Respaldo sin Popover: el atributo se ignora (nav visible) → lo ocultamos y
      // gestionamos apertura, Escape y foco a mano.
      nav.style.display='none';
      btn.addEventListener('click',function(){
        var open=nav.style.display==='none';
        nav.style.display=open?'block':'none';
        sync(open);
      });
      document.addEventListener('keydown',function(e){
        if(e.key==='Escape'&&nav.style.display!=='none'){
          nav.style.display='none';sync(false);btn.focus();
        }
      });
    }
  }
  // Header gana glass+sombra al hacer scroll (clase .is-scrolled → CSS).
  function initScroll(){
    var h=document.getElementById('site-header');
    if(!h)return;
    var on=function(){ if(window.pageYOffset>8)h.classList.add('is-scrolled');else h.classList.remove('is-scrolled'); };
    on();
    window.addEventListener('scroll',on,{passive:true});
  }
  function init(){initLang();initMenu();initScroll();}
  if(document.readyState!=='loading')init();
  else document.addEventListener('DOMContentLoaded',init);
})();
`;

export function HeaderEnhance() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
