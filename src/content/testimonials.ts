/** Testimonios de clientes — fuente de verdad. Slot listo pero VACÍO a
 *  propósito (F4): la sección solo se renderiza cuando haya reseñas reales, para
 *  no inventar prueba social. Añade objetos aquí cuando Kenny recopile reseñas
 *  verificables (con permiso del cliente). */
export interface Testimonial {
  /** Cita en español. */
  quote: string;
  /** Cita en inglés. */
  quoteEn: string;
  /** Nombre o iniciales del huésped. */
  author: string;
  /** Contexto breve: zona / villa / fecha (ej. "Cap Cana · dic 2026"). */
  context: string;
}

export const TESTIMONIALS: Testimonial[] = [];
