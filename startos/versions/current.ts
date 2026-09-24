import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  // Tracks upstream ppq-private-mode-proxy (package.json version).
  version: '0.6.0:2',
  releaseNotes: {
    en_US:
      'Corrected the package repository URL in the manifest to point at this fork, and made the Service-to-Service URL action\'s getBridgeAddress call resolve this package\'s binding explicitly (packageId). Package tracks upstream v0.6.0 (refreshed Tinfoil model catalog incl. glm-5-3, glm-5-3-flash and deepseek-v4-flash; host-header and origin security fixes).',
    es_ES:
      'Corregida la URL del repositorio del paquete en el manifiesto para apuntar a este fork, y el call getBridgeAddress de la acción de URL de servicio a servicio ahora resuelve explícitamente la binding de este paquete (packageId). El paquete sigue upstream v0.6.0 (catálogo de modelos Tinfoil actualizado, incl. glm-5-3, glm-5-3-flash y deepseek-v4-flash; mejoras de seguridad de host/origin).',
    de_DE:
      'Die Repository-URL des Pakets im Manifest wurde korrigiert, und der getBridgeAddress-Aufruf der Service-to-Service-URL-Aktion löst jetzt explizit die Binding dieses Pakets auf (packageId). Das Paket folgt Upstream v0.6.0 (aktualisierter Tinfoil-Modellkatalog inkl. glm-5-3, glm-5-3-flash und deepseek-v4-flash; Host-/Origin-Sicherheitskorrekturen).',
    pl_PL:
      'Poprawiono adres URL repozytorium pakietu w manifeście, a wywołanie getBridgeAddress w akcji adresu między usługami rozwiązuje teraz jawnie binding tego pakietu (packageId). Pakiet śledzi upstream v0.6.0 (odświeżony katalog modeli Tinfoil, m.in. glm-5-3, glm-5-3-flash i deepseek-v4-flash; poprawki bezpieczeństwa host/origin).',
    fr_FR:
      "Correction de l'URL du dépôt du paquet dans le manifeste pour pointer vers ce fork, et l'appel getBridgeAddress de l'action URL de service à service résout désormais explicitement la binding de ce paquet (packageId). Le paquet suit l'amont v0.6.0 (catalogue Tinfoil actualisé, incl. glm-5-3, glm-5-3-flash et deepseek-v4-flash ; correctifs de sécurité host/origin).",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})