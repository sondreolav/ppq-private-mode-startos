import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  // Tracks upstream ppq-private-mode-proxy (package.json version).
  version: '0.6.0:4',
  releaseNotes: {
    en_US:
      'DNS-rebinding hardening: PPQ_ALLOWED_HOSTS is now set automatically from the actual hostnames StartOS serves this API on (addresses, .local, domains, plus bridge and loopback), so a hostile page can no longer reach the proxy as same-origin or overwrite the stored key. Configure PPQ API Key now only writes the API key when it actually changed (no unnecessary restart).',
    es_ES:
      'Refuerzo contra DNS-rebinding: PPQ_ALLOWED_HOSTS ahora se establece automáticamente a partir de los hostnames reales que StartOS sirve en esta API (direcciones, .local, dominios, más bridge y loopback), de modo que una página hostil ya no puede llegar al proxy como mismo-origen ni sobrescribir la clave guardada. Configure PPQ API Key ahora solo escribe la clave API cuando realmente cambia (sin reinicio innecesario).',
    de_DE:
      'DNS-Rebinding-Härtung: PPQ_ALLOWED_HOSTS wird jetzt automatisch aus den tatsächlichen Hostnamen gesetzt, die StartOS für diese API bedient (Adressen, .local, Domains sowie Bridge und Loopback), sodass eine bösartige Seite den Proxy nicht mehr als Same-Origin erreichen oder den gespeicherten Schlüssel überschreiben kann. „Configure PPQ API Key“ schreibt den API-Schlüssel jetzt nur noch, wenn er sich tatsächlich geändert hat (kein unnötiger Neustart).',
    pl_PL:
      'Wzmocnienie przed atakiem DNS-rebinding: PPQ_ALLOWED_HOSTS jest teraz ustawiane automatycznie na podstawie rzeczywistych nazw hostów, które StartOS serwuje dla tego API (adresy, .local, domeny oraz most i loopback), dzięki czemu wroga strona nie może już dotrzeć do proxy jako same-origin ani nadpisać zapisanego klucza. Akcja Configure PPQ API Key zapisuje teraz klucz API tylko wtedy, gdy faktycznie się zmienił (bez zbędnego restartu).',
    fr_FR:
      "Durcissement anti DNS-rebinding : PPQ_ALLOWED_HOSTS est désormais défini automatiquement à partir des noms d'hôte réels servis par StartOS pour cette API (adresses, .local, domaines, pont et loopback), de sorte qu'une page hostile ne peut plus atteindre le proxy en same-origin ni écraser la clé enregistrée. L'action Configure PPQ API Key n'écrit la clé API que lorsqu'elle change réellement (pas de redémarrage inutile).",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})