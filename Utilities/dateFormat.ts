export type DisplayMode = 'datetime' | 'date' | 'time';

export interface FormatDateOptions {
  locale?: string;              // p. ej. 'es-ES'
  timeZone?: string;            // p. ej. 'UTC' o 'Europe/Madrid'
  format24h?: boolean;          // true → 24 h, false → 12 h (am/pm)
  display?: DisplayMode;        // 'datetime' | 'date' | 'time'
  proximity?: boolean;          // si true activa “hoy/mañana/ayer/día de la semana”
}

// Cache de formateadores
interface Formatters {
  dateFmt: Intl.DateTimeFormat;
  timeFmt: Intl.DateTimeFormat;
  dateTimeFmt: Intl.DateTimeFormat;
  partsFmt: Intl.DateTimeFormat;
  rtf: Intl.RelativeTimeFormat;
  weekdayFmt: Intl.DateTimeFormat;
}
const fmtCache = new Map<string, Formatters>();

function getCachedFormatters(
  locale: string,
  timeZone: string,
  format24h: boolean
): Formatters {
  const key = `${locale}|${timeZone}|${format24h}`;
  if (fmtCache.has(key)) {
    return fmtCache.get(key)!;
  }

  const dateFmt = new Intl.DateTimeFormat(locale, {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const timeFmt = new Intl.DateTimeFormat(locale, {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: !format24h
  });

  const dateTimeFmt = new Intl.DateTimeFormat(locale, {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: !format24h
  });

  // Usado por getYMD para extraer año/mes/día
  const partsFmt = new Intl.DateTimeFormat(locale, {
    timeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  const weekdayFmt = new Intl.DateTimeFormat(locale, {
    timeZone,
    weekday: 'long'
  });

  const fmts = { dateFmt, timeFmt, dateTimeFmt, partsFmt, rtf, weekdayFmt };
  fmtCache.set(key, fmts);
  return fmts;
}

/**
 * Formatea una fecha (ISO string o Date) a distintos modos,
 * con proximidad (“ayer”, “hoy”, “mañana”, días de la semana)
 * y un único formateador para ‘datetime’.
 */
export function dateFormat(
  input: string | Date,
  {
    locale = 'es-ES',
    timeZone = 'UTC',
    format24h = false,
    display = 'datetime',
    proximity = false
  }: FormatDateOptions = {}
): string {
  // Aceptar Date directamente
  const date = input instanceof Date ? input : new Date(input);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date input: ${input}`);
  }
  const now = new Date();

  // Obtener formateadores cacheados
  const { dateFmt, timeFmt, dateTimeFmt, partsFmt, rtf, weekdayFmt } =
    getCachedFormatters(locale, timeZone, format24h);

  // Extrae sólo año/mes/día
  function getYMD(d: Date) {
    const parts = partsFmt.formatToParts(d);
    return {
      y: +parts.find(p => p.type === 'year')!.value,
      m: +parts.find(p => p.type === 'month')!.value,
      d: +parts.find(p => p.type === 'day')!.value
    };
  }
  function diffDays(a: Date, b: Date): number {
    const A = getYMD(a), B = getYMD(b);
    return Math.floor((Date.UTC(A.y, A.m - 1, A.d) -
                       Date.UTC(B.y, B.m - 1, B.d)) / 86_400_000);
  }
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  // Proximidad: “ayer”/“hoy”/“mañana” o día de la semana
  if (proximity) {
    const diff = diffDays(date, now);

    if (diff >= -1 && diff <= 1) {
      const label = rtf.format(diff, 'day');
      if (display === 'date')  return cap(label);
      if (display === 'time')  return timeFmt.format(date);
      return `${cap(label)} ${timeFmt.format(date)}`;
    }
    if (diff > 1 && diff <= 6) {
      const dia = cap(weekdayFmt.format(date));
      if (display === 'date')  return dia;
      if (display === 'time')  return timeFmt.format(date);
      return `${dia} ${timeFmt.format(date)}`;
    }
  }

  // Sin proximidad: modo date, time o datetime
  switch (display) {
    case 'date':     return dateFmt.format(date);
    case 'time':     return timeFmt.format(date);
    case 'datetime': return dateTimeFmt.format(date);
  }
}
