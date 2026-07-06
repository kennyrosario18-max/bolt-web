import Link from "next/link";
import { CONTACT, ZONES, WEB3FORMS_ACCESS_KEY } from "@/content/site";
import { BoltIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n";

/** Formulario concierge — server component sin React (misma arquitectura que el
 *  formulario de disponibilidad). El aliado reserva por el huésped: villa, zona,
 *  fechas y nº de carritos. Envía por WhatsApp + email (Web3Forms). */

const T = {
  es: {
    kicker: "Reserva para aliados",
    h1: "Formulario concierge",
    lead: "Reserva los golf carts de tu huésped en un minuto. Nos llega por WhatsApp con todos los datos completos.",
    partnersBack: "← Programa de Aliados",
    partnersHref: "/aliados",
    lAliado: "Aliado / villa / agencia *",
    lWhatsapp: "Tu WhatsApp *",
    lVilla: "Villa o residencial del huésped *",
    lZona: "Zona de entrega *",
    zonaPlaceholder: "Selecciona la zona…",
    lCheckin: "Check-in *",
    lCheckout: "Check-out *",
    lCarts4: "Carritos de 4 plazas",
    lCarts6: "Carritos de 6 plazas",
    lComentarios: "Comentarios",
    comentariosPlaceholder: "Horario de entrega, nombre del huésped, notas…",
    header: "⚡ RESERVA CONCIERGE — boltgolfcars.com",
    fAliado: "Aliado/Villa",
    fWhatsapp: "WhatsApp",
    fHuesped: "Villa del huésped",
    fZona: "Zona",
    fCheckin: "Check-in",
    fCheckout: "Check-out",
    fCarts: "Carritos",
    fComentarios: "Comentarios",
    carts4Unit: "de 4 plazas",
    carts6Unit: "de 6 plazas",
    submit: "Enviar reserva por WhatsApp",
    errReq: "Completa el aliado, tu WhatsApp, la villa y la zona.",
    errFechas: "Selecciona check-in y check-out.",
    errOrden: "El check-out debe ser posterior al check-in.",
    errCarts: "Indica al menos 1 carrito (de 4 o de 6 plazas).",
    sentTitle: "Reserva enviada",
    success: "Gracias. Verificamos disponibilidad y te confirmamos por WhatsApp lo antes posible.",
    openWa: "Abrir WhatsApp",
    waFallback: "Si WhatsApp no se abrió, escríbenos al",
    disclaimer: "Al enviar se abrirá WhatsApp con la reserva lista. Tarifas y cuenta según tu acuerdo de aliado.",
    emailSubject: "Nueva reserva concierge — BOLT",
  },
  en: {
    kicker: "Partner booking",
    h1: "Concierge form",
    lead: "Book your guest's golf carts in a minute. It reaches us on WhatsApp with all the details.",
    partnersBack: "← Partner Program",
    partnersHref: "/en/partners",
    lAliado: "Partner / villa / agency *",
    lWhatsapp: "Your WhatsApp *",
    lVilla: "Guest's villa or community *",
    lZona: "Delivery zone *",
    zonaPlaceholder: "Select the zone…",
    lCheckin: "Check-in *",
    lCheckout: "Check-out *",
    lCarts4: "4-seat carts",
    lCarts6: "6-seat carts",
    lComentarios: "Comments",
    comentariosPlaceholder: "Delivery time, guest name, notes…",
    header: "⚡ CONCIERGE BOOKING — boltgolfcars.com",
    fAliado: "Partner/Villa",
    fWhatsapp: "WhatsApp",
    fHuesped: "Guest villa",
    fZona: "Zone",
    fCheckin: "Check-in",
    fCheckout: "Check-out",
    fCarts: "Carts",
    fComentarios: "Comments",
    carts4Unit: "4-seat",
    carts6Unit: "6-seat",
    submit: "Send booking via WhatsApp",
    errReq: "Fill in the partner, your WhatsApp, the villa and the zone.",
    errFechas: "Select check-in and check-out.",
    errOrden: "Check-out must be after check-in.",
    errCarts: "Enter at least 1 cart (4 or 6 seats).",
    sentTitle: "Booking sent",
    success: "Thank you. We'll verify availability and confirm on WhatsApp as soon as possible.",
    openWa: "Open WhatsApp",
    waFallback: "If WhatsApp didn't open, message us at",
    disclaimer: "On send, WhatsApp opens with the booking ready. Rates and account per your partner agreement.",
    emailSubject: "New concierge booking — BOLT",
  },
} as const;

const inputCls =
  "w-full rounded-box border border-steel/60 bg-white px-4 py-3 text-base text-ink outline-none transition-colors focus:border-ink focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-1";
const labelCls = "block text-sm font-bold text-ink";

export function ConciergeForm({ locale = "es" }: { locale?: Locale }) {
  const t = T[locale];
  const payload = {
    phone: CONTACT.whatsapp,
    header: t.header,
    f: {
      aliado: t.fAliado, whatsapp: t.fWhatsapp, huesped: t.fHuesped, zona: t.fZona,
      checkin: t.fCheckin, checkout: t.fCheckout, carts: t.fCarts, comentarios: t.fComentarios,
    },
    carts4Unit: t.carts4Unit,
    carts6Unit: t.carts6Unit,
    errReq: t.errReq, errFechas: t.errFechas, errOrden: t.errOrden, errCarts: t.errCarts,
    web3key: WEB3FORMS_ACCESS_KEY,
    emailSubject: t.emailSubject,
  };

  return (
    <>
      <style>{`#mobile-cta{display:none}`}</style>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">{t.kicker}</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{t.h1}</h1>
          <p className="mt-3 text-white/70">{t.lead}</p>
          <Link href={t.partnersHref} className="mt-4 inline-block text-sm font-bold text-volt hover:text-white">
            {t.partnersBack}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <form id="cg-form" className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="cg-aliado">{t.lAliado}</label>
            <input id="cg-aliado" name="aliado" required className={inputCls} autoComplete="organization" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="cg-whatsapp">{t.lWhatsapp}</label>
            <input id="cg-whatsapp" name="whatsapp" type="tel" required placeholder="+1 809 000 0000" className={inputCls} autoComplete="tel" />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="cg-villa">{t.lVilla}</label>
            <input id="cg-villa" name="villa" required className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="cg-zona">{t.lZona}</label>
            <select id="cg-zona" name="zona" required className={inputCls}>
              <option value="">{t.zonaPlaceholder}</option>
              {ZONES.map((z) => (
                <option key={z.id} value={z.id} data-name={z.name}>{z.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls} htmlFor="cg-checkin">{t.lCheckin}</label>
            <input id="cg-checkin" name="checkin" type="date" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="cg-checkout">{t.lCheckout}</label>
            <input id="cg-checkout" name="checkout" type="date" required className={inputCls} />
          </div>

          <div>
            <label className={labelCls} htmlFor="cg-carts4">{t.lCarts4}</label>
            <input id="cg-carts4" name="carts4" type="number" min="0" max="20" inputMode="numeric" placeholder="0" className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="cg-carts6">{t.lCarts6}</label>
            <input id="cg-carts6" name="carts6" type="number" min="0" max="20" inputMode="numeric" placeholder="0" className={inputCls} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="cg-comentarios">{t.lComentarios}</label>
            <textarea id="cg-comentarios" name="comentarios" rows={3} className={inputCls} placeholder={t.comentariosPlaceholder} />
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="cg-extra">No llenar<input id="cg-extra" name="empresa" tabIndex={-1} autoComplete="off" /></label>
          </div>

          <p id="cg-error" hidden role="alert" className="rounded-box bg-red-50 px-4 py-3 text-sm font-semibold text-danger sm:col-span-2" />

          <div className="sm:col-span-2">
            <button type="submit" className="w-full rounded-full bg-volt px-8 py-4 text-base font-bold text-ink transition-transform hover:scale-[1.02] sm:w-auto">
              <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />{t.submit}
            </button>
            <p className="mt-3 text-xs text-steel">{t.disclaimer}</p>
          </div>
        </form>

        <div id="cg-success" hidden role="status" tabIndex={-1} className="rounded-card border border-line bg-cream p-8 text-center outline-none">
          <BoltIcon className="mx-auto text-volt" size={44} />
          <h2 className="mt-3 font-display text-2xl font-extrabold">{t.sentTitle}</h2>
          <p className="mx-auto mt-3 max-w-lg text-inktext">{t.success}</p>
          <a id="cg-wa" href={`https://wa.me/${CONTACT.whatsapp}`} className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-full bg-volt px-8 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105" target="_blank" rel="noopener noreferrer">
            <BoltIcon className="inline-block align-[-0.15em]" size={15} />{t.openWa}
          </a>
          <p className="mt-3 text-sm text-steel">
            {t.waFallback}{" "}
            <a href={`https://wa.me/${CONTACT.whatsapp}`} className="font-bold text-ink underline" target="_blank" rel="noopener noreferrer">{CONTACT.phoneDisplay}</a>.
          </p>
        </div>
      </section>
      <ConciergeEnhance payload={payload} />
    </>
  );
}

function ConciergeEnhance({ payload }: { payload: unknown }) {
  const script = `
(function(){
  var P=${JSON.stringify(payload)};
  var form=document.getElementById('cg-form');
  if(!form)return;
  var $=function(id){return document.getElementById(id);};
  var checkin=$('cg-checkin'),checkout=$('cg-checkout'),zona=$('cg-zona'),err=$('cg-error');
  function val(id){var el=$(id);return el?el.value.trim():'';}
  function diffDays(a,b){if(!a||!b)return 0;var x=a.split('-'),y=b.split('-');return Math.round((new Date(+y[0],+y[1]-1,+y[2])-new Date(+x[0],+x[1]-1,+x[2]))/86400000);}
  function showError(msg,fld){err.textContent=msg;err.hidden=false;if(fld){fld.focus();}err.scrollIntoView({block:'center',behavior:'smooth'});}
  function track(ev){(window.__boltEvents=window.__boltEvents||[]).push({event:ev,path:location.pathname,t:Date.now()});}
  function zoneName(){var o=zona.options[zona.selectedIndex];return o&&o.value?o.getAttribute('data-name'):'';}
  function carts(){var c4=parseInt(val('cg-carts4'),10)||0,c6=parseInt(val('cg-carts6'),10)||0;var parts=[];if(c4>0)parts.push(c4+' '+P.carts4Unit);if(c6>0)parts.push(c6+' '+P.carts6Unit);return{total:c4+c6,text:parts.join(' + ')};}
  function buildMsg(d,ck){
    var f=P.f;
    return [P.header,'',
      f.aliado+': '+val('cg-aliado'),
      f.whatsapp+': '+val('cg-whatsapp'),
      f.huesped+': '+val('cg-villa'),
      f.zona+': '+zoneName(),
      f.checkin+': '+val('cg-checkin'),
      f.checkout+': '+val('cg-checkout')+(d>0?(' ('+d+'d)'):''),
      f.carts+': '+ck.text,
      val('cg-comentarios')?(f.comentarios+': '+val('cg-comentarios')):''
    ].filter(Boolean).join('\\n');
  }
  function sendEmail(summary){
    if(!P.web3key)return;
    try{fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify({access_key:P.web3key,subject:P.emailSubject,from_name:'BOLT concierge · boltgolfcars.com',
        Aliado:val('cg-aliado'),WhatsApp:val('cg-whatsapp'),Villa:val('cg-villa'),Zona:zoneName(),
        Checkin:val('cg-checkin'),Checkout:val('cg-checkout'),message:summary,botcheck:''})}).catch(function(){});}catch(e){}
  }
  function succeed(){form.hidden=true;var s=$('cg-success');s.hidden=false;s.focus();}
  form.addEventListener('submit',function(e){
    e.preventDefault();err.hidden=true;
    if(val('empresa')){succeed();return;}
    if(!val('cg-aliado')||!val('cg-whatsapp')||!val('cg-villa')||!zoneName()){showError(P.errReq);return;}
    var ci=checkin.value,co=checkout.value;
    if(!ci||!co){showError(P.errFechas,!ci?checkin:checkout);return;}
    var d=diffDays(ci,co);
    if(d<=0){showError(P.errOrden,checkout);return;}
    var ck=carts();
    if(ck.total<1){showError(P.errCarts,$('cg-carts4'));return;}
    var summary=buildMsg(d,ck);
    var url='https://wa.me/'+P.phone+'?text='+encodeURIComponent(summary);
    track('concierge_submit');track('form_open_whatsapp');
    sendEmail(summary);
    var fb=$('cg-wa');if(fb)fb.setAttribute('href',url);
    window.open(url,'_blank','noopener,noreferrer');
    succeed();
  });
  checkin.addEventListener('change',function(){checkout.min=checkin.value;});
})();
`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
