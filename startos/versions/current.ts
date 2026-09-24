import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  // Tracks upstream ppq-private-mode-proxy (package.json version).
  version: '0.6.0:1',
  releaseNotes: {
    en_US:
      'Corrected the package repository URL in the manifest to point at this fork. Package tracks upstream v0.6.0 (refreshed Tinfoil model catalog incl. glm-5-3, glm-5-3-flash and deepseek-v4-flash; host-header and origin security fixes).',
    es_ES:
      'Corregida la URL del repositorio del paquete en el manifiesto para apuntar a este fork. El paquete sigue upstream v0.6.0 (catálogo de modelos Tinfoil actualizado, incl. glm-5-3, glm-5-3-flash y deepseek-v4-flash; mejoras de seguridad de host/origin).',
    de_DE:
      'Die Repository-URL des Pakets im Manifest wurde korrigiert, sodass sie auf diesen Fork zeigt. Das Paket folgt Upstream v0.6.0 (aktualisierter Tinfoil-Modellkatalog inkl. glm-5-3, glm-5-3-flash und deepseek-v4-flash; Host-/Origin-Sicherheitskorrekturen).',
    pl_PL:
      'Poprawiono adres URL repozytorium pakietu w manifeście, aby wskazywał na ten fork. Pakiet śledzi upstream v0.6.0 (odświeżony katalog modeli Tinfoil, m.in. glm-5-3, glm-5-3-flash i deepseek-v4-flash; poprawki bezpieczeństwa host/origin).',
    fr_FR:
      "Correction de l'URL du dépôt du paquet dans le manifeste pour pointer vers ce fork. Le paquet suit l'amont v0.6.0 (catalogue Tinfoil actualisé, incl. glm-5-3, glm-5-3-flash et deepseek-v4-flash ; correctifs de sécurité host/origin).",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
