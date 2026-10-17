import { UMAMI_DOMAINS, UMAMI_SRC, UMAMI_WEBSITE_ID } from "@/lib/analytics";
import { IS_PREVIEW } from "@/lib/site-url";

/** Captura delegada de conversión (vanilla, sin hidratación React — alineado con
 *  el objetivo cero-JS del PRD): un solo listener global registra clics en
 *  WhatsApp, teléfono y email desde CUALQUIER página sin tocar los componentes.
 *  Los eventos quedan en window.__boltEvents (inspeccionables) y, si Umami está
 *  cargado, se reenvían con umami.track.
 *
 *  Origen de la visita (para el campo "Origen" del correo de solicitudes): en cada
 *  página se guarda en sessionStorage `bolt_origen` = utm_source si viene en la URL;
 *  si no hay nada guardado, el dominio que nos enlazó, o "directo". Sin datos
 *  personales, dentro de try/catch (modo privado o storage bloqueado = nada). */
const CONVERSION_LISTENER = `
(function(){
  try{
    var q=new URLSearchParams(location.search),u=q.get('utm_source'),ss=window.sessionStorage;
    if(u){ss.setItem('bolt_origen',(u.toLowerCase().replace(/[^a-z0-9_-]/g,'').slice(0,40))||'otro');}
    else if(!ss.getItem('bolt_origen')){
      var r='';try{r=document.referrer?new URL(document.referrer).hostname.replace(/^www\\./,''):'';}catch(e){}
      ss.setItem('bolt_origen',(r&&r!==location.hostname)?r.slice(0,60):'directo');
    }
  }catch(e){}
  document.addEventListener('click', function(e){
    var a = e.target && e.target.closest && e.target.closest('a');
    if(!a) return;
    var h = a.getAttribute('href') || '';
    var ev = h.indexOf('wa.me') > -1 ? 'wa_click'
      : h.indexOf('tel:') === 0 ? 'tel_click'
      : h.indexOf('mailto:') === 0 ? 'email_click' : null;
    if(ev){
      (window.__boltEvents = window.__boltEvents || []).push({event: ev, path: location.pathname, t: Date.now()});
      try{ if(window.umami && window.umami.track) window.umami.track(ev); }catch(e){}
    }
  }, true);
})();
`;

export function Analytics() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: CONVERSION_LISTENER }} />
      {!IS_PREVIEW && UMAMI_WEBSITE_ID ? (
        // Script plano (no next/script): sobrevive al strip de hidratación.
        <script defer src={UMAMI_SRC} data-website-id={UMAMI_WEBSITE_ID} data-domains={UMAMI_DOMAINS} />
      ) : null}
    </>
  );
}
