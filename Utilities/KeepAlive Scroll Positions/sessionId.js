// src/utilities/sessionId.js

/**
 * Genera un ID de sesión único para esta carga de la App.
 * Usa crypto.randomUUID() si está disponible, o un fallback simple.
 */
export function generateSessionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback: timestamp + número aleatorio
  return (
    Date.now().toString(36) +
    '-' +
    Math.random().toString(36).substr(2, 9)
  );
}