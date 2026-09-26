import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  // Tracks upstream ppq-private-mode-proxy (package.json version).
  version: '0.6.0:3',
  releaseNotes: {
    en_US:
      'API-key validation now matches upstream exactly (sk- + 16-64 alphanumeric), and Configure PPQ API Key only writes settings that actually changed — no more double restart. Also corrects packageRepo to point at this fork and passes packageId explicitly in the Service-to-Service URL action. Follows upstream v0.6.0 (Tinfoil model catalog incl. glm-5-3, glm-5-3-flash and deepseek-v4-flash; host-header and origin security fixes).',
    es_ES:
      'La validación de la clave API ahora coincide exactamente con upstream (sk- + 16-64 alfanuméricos) y Configure PPQ API Key solo escribe los ajustes que realmente cambian — sin doble reinicio. También corrige packageRepo para apuntar a este fork y pasa packageId explícitamente en la acción URL de servicio a servicio. Sigue upstream v0.6.0 (catálogo de modelos Tinfoil actualizado, incl. glm-5-3, glm-5-3-flash y deepseek-v4-flash; mejoras de seguridad host/origin).',
    de_DE:
      'Die API-Schlüssel-Prüfung entspricht jetzt exakt Upstream (sk- + 16-64 alphanumerisch), und „Configure PPQ API Key“ schreibt nur geänderte Einstellungen — kein doppelter Neustart mehr. Zudem korrigiert packageRepo auf diesen Fork und übergibt packageId explizit in der Service-to-Service-URL-Aktion. Folgt Upstream v0.6.0 (aktualisierter Tinfoil-Modellkatalog inkl. glm-5-3, glm-5-3-flash und deepseek-v4-flash; Host-/Origin-Sicherheitskorrekturen).',
    pl_PL:
      'Walidacja klucza API jest teraz dokładnie zgodna z upstream (sk- + 16-64 znaki alfanumeryczne), a akcja Configure PPQ API Key zapisuje tylko faktycznie zmienione ustawienia — bez podwójnego restartu. Poprawiono również packageRepo tak, aby wskazywało ten fork, i jawnie przekazano packageId w akcji adresu między usługami. Pakiet śledzi upstream v0.6.0 (odświeżony katalog modeli Tinfoil, m.in. glm-5-3, glm-5-3-flash i deepseek-v4-flash; poprawki bezpieczeństwa host/origin).',
    fr_FR:
      "La validation de la clé API correspond désormais exactement à l'amont (sk- + 16-64 alphanumériques) et l'action Configure PPQ API Key n'écrit que les réglages réellement modifiés — plus de double redémarrage. Corrige également packageRepo pour pointer vers ce fork et passe explicitement packageId dans l'action URL de service à service. Suit l'amont v0.6.0 (catalogue Tinfoil actualisé, incl. glm-5-3, glm-5-3-flash et deepseek-v4-flash ; correctifs de sécurité host/origin).",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})