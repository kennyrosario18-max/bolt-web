import Script from "next/script";
import { CF_BEACON_TOKEN } from "@/lib/analytics";
import { IS_PREVIEW } from "@/lib/site-url";

/** Captura delegada de conversión (vanilla, sin hidratación React — alineado con
 *  el objetivo cero-JS del PRD): un solo listener global registra clics en
 *  WhatsApp, teléfono y email desde CUALQUIER página sin tocar los componentes.
 *  Los eventos quedan en window.__boltEvents (inspeccionables) y listos para
 *  reenviarse a Cloudflare Zaraz o un endpoint cuando se conecte. */
const CONVERSION_LISTENER = `
(function(){
  document.addEventListener('click', function(e){
    var a = e.target && e.target.closest && e.target.closest('a');
    if(!a) return;
    var h = a.getAttribute('href') || '';
    var ev = h.indexOf('wa.me') > -1 ? 'wa_click'
      : h.indexOf('tel:') === 0 ? 'tel_click'
      : h.indexOf('mailto:') === 0 ? 'email_click' : null;
    if(ev){ (window.__boltEvents = window.__boltEvents || []).push({event: ev, path: location.pathname, t: Date.now()}); }
  }, true);
})();
`;

export function Analytics() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: CONVERSION_LISTENER }} />
      {!IS_PREVIEW && CF_BEACON_TOKEN ? (
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon={`{"token":"${CF_BEACON_TOKEN}"}`}
        />
      ) : null}
    </>
  );
}
