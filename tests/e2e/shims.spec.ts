import { expect, test } from "@playwright/test";

/** Smoke E2E de los shims vanilla y el CSS interactivo — lo más frágil de la
 *  arquitectura sin React. Corre contra el build final (out/). */

/** Hoy en RD (ISO), igual que lo calcula el shim del formulario para llegada.min. */
const todayRD = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santo_Domingo" }).format(new Date());
const addDays = (iso: string, n: number) => {
  const [y, m, d] = iso.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return t.toISOString().slice(0, 10);
};
/** Misma fecha (mes-día) en el primer año en que todavía es futura: las pruebas que ENVÍAN el
 *  formulario no pueden usar fechas pasadas porque llegada.min las bloquea. */
const upcoming = (iso: string) => {
  let s = iso;
  while (s <= addDays(todayRD(), 1)) s = `${Number(s.slice(0, 4)) + 1}${s.slice(4)}`;
  return s;
};

test.describe("filtro de flota (CSS :checked ~)", () => {
  test("filtra por línea y vuelve a Todos", async ({ page }) => {
    await page.goto("/flota/");
    const visibles = page.locator(".fleet-item:visible");
    await expect(visibles).toHaveCount(11);

    // Los radios son sr-only: se interactúa con la píldora (label), como el usuario.
    await page.locator('label[for="ff-clubcar"]').click();
    await expect(page.locator(".fleet-item:visible")).toHaveCount(3);

    await page.locator('label[for="ff-all"]').click();
    await expect(page.locator(".fleet-item:visible")).toHaveCount(11);
  });

  test("sin scroll horizontal en móvil (regresión del fieldset U7)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/flota/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe("switcher de idioma (shim counterpart)", () => {
  test("página simple: /precios → /en/pricing", async ({ page }) => {
    await page.goto("/precios/");
    await page.locator("nav [data-langswitch]").click();
    await expect(page).toHaveURL(/\/en\/pricing\/$/);
  });

  test("blog: traduce el slug del artículo", async ({ page }) => {
    await page.goto("/blog/golf-cart-cap-cana-guia/");
    await page.locator("nav [data-langswitch]").click();
    await expect(page).toHaveURL(/\/en\/blog\/golf-cart-cap-cana-guide\/$/);
  });
});

test.describe("menú móvil (Popover API + shim)", () => {
  test("abre, marca aria-expanded y cierra con Escape", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const toggle = page.locator("#nav-toggle");
    const nav = page.locator("#nav-movil");

    await toggle.click();
    await expect(nav).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");
    await expect(nav).toBeHidden();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("formulario de disponibilidad (shim de validación)", () => {
  test("bloquea por mínimo de días de la zona y anuncia el error", async ({ page }) => {
    // Los campos vacíos los bloquea el navegador (required nativo) antes del
    // shim; la regla de negocio propia es el mínimo por zona (Casa de Campo: 7).
    await page.goto("/solicitar-disponibilidad/");
    await page.locator("#nombre").fill("Test QA");
    await page.locator("#whatsapp").fill("+1 809 000 0000");
    await page.locator("#email").fill("qa@example.com");
    await page.locator("#zona").selectOption("casa-de-campo");
    await page.locator("#alojamiento").selectOption("villa");
    await page.locator("#lugar").fill("Villa QA");
    const llegada = upcoming("2027-01-10");
    await page.locator("#llegada").fill(llegada);
    await page.locator("#salida").fill(addDays(llegada, 2)); // 2 días < mínimo 7

    // Aviso en vivo (aria-live) antes de enviar.
    await expect(page.locator("#min-warning")).toContainText(/mínimo/i);

    await page.locator('#req-form button[type="submit"]').click();
    const error = page.locator("#form-error");
    await expect(error).toBeVisible();
    await expect(error).toContainText(/mínimo/i);
    await expect(page.locator("#salida")).toHaveAttribute("aria-invalid", "true");
  });

  test("renta mínima: 2 días en temporada regular y 5 en temporada alta", async ({ page }) => {
    await page.goto("/solicitar-disponibilidad/");
    await page.locator("#nombre").fill("Test QA");
    await page.locator("#whatsapp").fill("+1 809 000 0000");
    await page.locator("#email").fill("qa@example.com");
    await page.locator("#zona").selectOption("cap-cana");
    await page.locator("#alojamiento").selectOption("villa");
    await page.locator("#lugar").fill("Villa QA");
    // 1 día en temporada regular: bloquea (no se renta por un solo día; sin vía por WhatsApp).
    const regular = upcoming("2027-02-10");
    await page.locator("#llegada").fill(regular);
    await page.locator("#salida").fill(addDays(regular, 1));
    await expect(page.locator("#min-warning")).toContainText(/mínima es de 2 días/);
    await expect(page.locator("#min-warning")).not.toContainText(/WhatsApp/);
    await page.locator('#req-form button[type="submit"]').click();
    await expect(page.locator("#form-error")).toContainText(/mínima es de 2 días/);
    await expect(page.locator("#form-error")).not.toContainText(/WhatsApp/);
    // 3 días que tocan la temporada alta (26 dic): bloquea con mínimo 5.
    const festivo = upcoming("2026-12-26");
    await page.locator("#llegada").fill(festivo);
    await page.locator("#salida").fill(addDays(festivo, 3));
    await expect(page.locator("#min-warning")).toContainText(/Temporada alta/);
    await page.locator('#req-form button[type="submit"]').click();
    await expect(page.locator("#form-error")).toContainText(/5 días/);
    // 5 días en temporada alta: sin aviso.
    await page.locator("#salida").fill(addDays(festivo, 5));
    await expect(page.locator("#min-warning")).toBeEmpty();
  });

  test("fecha de llegada pasada: bloqueada por el min nativo (hoy en RD)", async ({ page }) => {
    await page.goto("/solicitar-disponibilidad/");
    const hoy = todayRD();
    await expect(page.locator("#llegada")).toHaveAttribute("min", hoy);
    await page.locator("#nombre").fill("Test QA");
    await page.locator("#whatsapp").fill("+1 809 000 0000");
    await page.locator("#email").fill("qa@example.com");
    await page.locator("#zona").selectOption("cap-cana");
    await page.locator("#alojamiento").selectOption("villa");
    await page.locator("#lugar").fill("Villa QA");
    await page.locator("#llegada").fill(addDays(hoy, -3));
    await page.locator("#salida").fill(addDays(hoy, 1));
    await page.locator('#req-form button[type="submit"]').click();
    // La validación nativa (min) frena el envío: el formulario sigue visible y el campo es inválido.
    await expect(page.locator("#req-form")).toBeVisible();
    await expect(page.locator("#req-success")).toBeHidden();
    expect(await page.locator("#llegada").evaluate((el) => (el as HTMLInputElement).validity.rangeUnderflow)).toBe(true);
  });

  test("origen de la visita: utm_source viaja en la copia por correo, no en WhatsApp", async ({ page }) => {
    // Llega por una landing con utm_source y después va al formulario: el origen sobrevive en sessionStorage.
    await page.goto("/alquiler/cap-cana/?utm_source=instagram");
    await page.goto("/solicitar-disponibilidad/?modelo=eco-cross-4-2");
    expect(await page.evaluate(() => sessionStorage.getItem("bolt_origen"))).toBe("instagram");

    // Intercepta el respaldo por correo (Web3Forms) y captura el cuerpo enviado.
    let body: Record<string, string> | null = null;
    await page.route("https://api.web3forms.com/submit", async (route) => {
      body = route.request().postDataJSON();
      await route.fulfill({ status: 200, contentType: "application/json", body: '{"success":true}' });
    });
    await page.locator("#nombre").fill("Test QA");
    await page.locator("#whatsapp").fill("+1 809 000 0000");
    await page.locator("#email").fill("qa@example.com");
    await page.locator("#zona").selectOption("cap-cana");
    await page.locator("#alojamiento").selectOption("villa");
    await page.locator("#lugar").fill("Villa QA");
    const llegada = upcoming("2027-02-10");
    await page.locator("#llegada").fill(llegada);
    await page.locator("#salida").fill(addDays(llegada, 4));
    // El envío abre wa.me en otra pestaña (sin red en CI): se captura y se cierra.
    const popup = page.context().waitForEvent("page");
    await page.locator('#req-form button[type="submit"]').click();
    await expect(page.locator("#req-success")).toBeVisible();
    await expect.poll(() => body).not.toBeNull();
    expect(body!.Origen).toBe("instagram");
    // El mensaje de WhatsApp del cliente no lleva el origen, pero sí el estimado que vio en pantalla.
    const waHref = decodeURIComponent((await page.locator("#wa-fallback").getAttribute("href")) ?? "");
    expect(waHref).toContain("wa.me/");
    expect(waHref).not.toMatch(/instagram|Origen/);
    expect(waHref).toMatch(/Estimado web \(1 carrito, ITBIS incluido\): US\$\d+ · 4 días · transporte incluido US\$71 \(1 viaje\) · depósito 50%/);
    await (await popup).close();
  });

  test("origen de la visita: sin utm ni referrer es 'directo'", async ({ page }) => {
    await page.goto("/");
    expect(await page.evaluate(() => sessionStorage.getItem("bolt_origen"))).toBe("directo");
  });

  test("un día más sale más barato: Precedent 4 días en PCRC", async ({ page }) => {
    // 4 × 50 × 1.18 = 236 + 71 = US$307; con 5 días y entrega gratis: 5 × 50 × 1.18 = US$295.
    await page.goto("/solicitar-disponibilidad/?modelo=cc-precedent-2-2&zona=puntacana-resort");
    await page.locator("#llegada").fill("2027-02-10");
    await page.locator("#salida").fill("2027-02-14");
    await expect(page.locator("#estimate")).toContainText("US$307");
    await expect(page.locator("#estimate-tip")).toContainText("US$295");
    await expect(page.locator("#estimate-tip")).toContainText(/igual o más barato/);
  });

  test("la landing de zona prellena la zona en el formulario", async ({ page }) => {
    await page.goto("/alquiler/cap-cana/");
    await page.locator('a[href*="/solicitar-disponibilidad/?zona=cap-cana"]').first().click();
    await expect(page).toHaveURL(/zona=cap-cana/);
    await expect(page.locator("#zona")).toHaveValue("cap-cana");
    await expect(page.locator("#zona-note")).toContainText(/gratis desde 5 días/);
  });

  test("más de 6 pasajeros: sin total, manda a cotizar varios carritos", async ({ page }) => {
    await page.goto("/solicitar-disponibilidad/?modelo=eco-cross-4-2");
    await page.locator("#zona").selectOption("cap-cana");
    await page.locator("#llegada").fill("2027-02-10");
    await page.locator("#salida").fill("2027-02-14");
    await expect(page.locator("#estimate")).toContainText("US$");
    await page.locator("#pasajeros").selectOption({ index: 7 }); // "Más de 6 (varios carritos)"
    await expect(page.locator("#estimate")).toContainText(/más de 6/i);
    await expect(page.locator("#estimate")).not.toContainText("US$");
    // Al volver a un grupo normal, el estimado regresa.
    await page.locator("#pasajeros").selectOption("4");
    await expect(page.locator("#estimate")).toContainText("US$");
  });

  test("estimado con temporada alta: cada noche a su tarifa", async ({ page }) => {
    await page.goto("/solicitar-disponibilidad/?modelo=eco-cross-4-2");
    await page.locator("#zona").selectOption("puntacana-resort");
    // 5 noches en temporada alta: 5 × US$110 × 1.18 = 649 → US$649 (transporte gratis, 5+ días en PCRC)
    await page.locator("#llegada").fill("2026-12-28");
    await page.locator("#salida").fill("2027-01-02");
    await expect(page.locator("#estimate")).toContainText("US$649");
    await expect(page.locator("#estimate")).toContainText(/5 noches a tarifa de temporada alta/);
    // Mixta: 4–9 ene = 3 noches alta (4, 5, 6) + 2 regular: (3×110 + 2×90) × 1.18 = 601.8 → US$602
    await page.locator("#llegada").fill("2027-01-04");
    await page.locator("#salida").fill("2027-01-09");
    await expect(page.locator("#estimate")).toContainText("US$602");
    await expect(page.locator("#estimate")).toContainText(/3 noches a tarifa de temporada alta/);
  });

  test("otro complejo privado o evento: transporte cotizado", async ({ page }) => {
    await page.goto("/solicitar-disponibilidad/?modelo=eco-cross-4-2");
    await page.locator("#zona").selectOption("otra-zona");
    await expect(page.locator("#zona-note")).toContainText(/complejos privados/);
    await page.locator("#llegada").fill("2027-02-10");
    await page.locator("#salida").fill("2027-02-14");
    await expect(page.locator("#estimate")).toContainText(/transporte cotizado aparte/);
  });

  test("link prellenado de la villa: zona, alojamiento y lugar", async ({ page }) => {
    await page.goto("/solicitar-disponibilidad/?zona=cap-cana&alojamiento=villa&lugar=Las%20Palmas%20108");
    await expect(page.locator("#zona")).toHaveValue("cap-cana");
    await expect(page.locator("#alojamiento")).toHaveValue("villa");
    await expect(page.locator("#lugar")).toHaveValue("Las Palmas 108");
    await expect(page.locator("#zona-note")).toContainText("US$60");
  });

  test("muestra el estimado en vivo con fechas + modelo", async ({ page }) => {
    await page.goto("/solicitar-disponibilidad/?modelo=eco-cross-4-2");
    await page.locator("#llegada").fill("2027-01-10");
    await page.locator("#salida").fill("2027-01-13");
    await page.locator("#zona").selectOption({ index: 1 });
    // PCRC: 3 días × US$90 × 1.18 = 319 + transporte (1 viaje, < 5 días) 60 × 1.18 = 71 → US$390
    await expect(page.locator("#zona-note")).toContainText("US$60");
    await expect(page.locator("#estimate")).toContainText("US$390");
    await expect(page.locator("#estimate")).toContainText(/transporte|transport/i);
    await expect(page.locator("#estimate-tip")).toBeEmpty();
    // 4 días (uno antes de la exención): 4 × 90 × 1.18 = 425 + 71 = US$496, y el aviso de que
    // con 5 días la entrega sale gratis por US$531 (solo US$35 más).
    await page.locator("#salida").fill("2027-01-14");
    await expect(page.locator("#estimate")).toContainText("US$496");
    await expect(page.locator("#estimate-tip")).toContainText("US$531");
    await expect(page.locator("#estimate-tip")).toContainText("US$35");
    // 5 días o más en PCRC: transporte gratis → 5 × 90 × 1.18 = US$531, sin aviso.
    await page.locator("#salida").fill("2027-01-15");
    await expect(page.locator("#estimate")).toContainText("US$531");
    await expect(page.locator("#estimate")).toContainText(/gratis|free/i);
    await expect(page.locator("#estimate-tip")).toBeEmpty();
    // Zona cotizada (Casa de Campo, 7+ días): el estimado avisa que el transporte va aparte.
    await page.locator("#salida").fill("2027-01-18");
    await page.locator("#zona").selectOption("casa-de-campo");
    await expect(page.locator("#estimate")).toContainText(/cotizado|quoted/i);
  });
});

test.describe("formulario concierge (email obligatorio)", () => {
  test("el correo es required y el shim lo incluye en el resumen", async ({ page }) => {
    await page.goto("/reserva-concierge/");
    const email = page.locator("#cg-email");
    await expect(email).toHaveAttribute("required", "");
    await expect(email).toHaveAttribute("type", "email");

    // Con todo lleno menos carritos, el shim corre (natives pasan) y bloquea
    // por carritos — prueba de que el flujo del shim sigue vivo tras el cambio.
    await page.locator("#cg-aliado").fill("QA Concierge");
    await page.locator("#cg-whatsapp").fill("+1 809 000 0000");
    await email.fill("concierge@example.com");
    await page.locator("#cg-villa").fill("Villa QA");
    await page.locator("#cg-zona").selectOption({ index: 1 });
    await page.locator("#cg-checkin").fill("2027-02-01");
    await page.locator("#cg-checkout").fill("2027-02-05");
    await page.locator('#cg-form button[type="submit"]').click();
    await expect(page.locator("#cg-error")).toContainText(/carrito|cart/i);
  });
});

test.describe("mega-menú de flota (desktop)", () => {
  test("aparece con foco y Escape lo cierra (WCAG 1.4.13)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const trigger = page.locator("header nav .group > a").first();
    const mega = page.locator(".mega");

    await trigger.focus();
    await expect(mega).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(mega).toBeHidden();
  });
});
