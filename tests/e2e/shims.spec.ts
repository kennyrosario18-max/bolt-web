import { expect, test } from "@playwright/test";

/** Smoke E2E de los shims vanilla y el CSS interactivo — lo más frágil de la
 *  arquitectura sin React. Corre contra el build final (out/). */

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
    await page.locator("#llegada").fill("2027-01-10");
    await page.locator("#salida").fill("2027-01-12"); // 2 días < mínimo 7

    // Aviso en vivo (aria-live) antes de enviar.
    await expect(page.locator("#min-warning")).toContainText(/mínimo/i);

    await page.locator('#req-form button[type="submit"]').click();
    const error = page.locator("#form-error");
    await expect(error).toBeVisible();
    await expect(error).toContainText(/mínimo/i);
    await expect(page.locator("#salida")).toHaveAttribute("aria-invalid", "true");
  });

  test("muestra el estimado en vivo con fechas + modelo", async ({ page }) => {
    await page.goto("/solicitar-disponibilidad/?modelo=eco-cross-4-2");
    await page.locator("#llegada").fill("2027-01-10");
    await page.locator("#salida").fill("2027-01-13");
    await page.locator("#zona").selectOption({ index: 1 });
    // 3 días × US$85 × 1.18 = US$301 (redondeado)
    await expect(page.locator("#estimate")).toContainText("US$301");
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
