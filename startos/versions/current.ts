import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  // Tracks upstream ppq-private-mode-proxy (package.json version).
  version: '0.6.0:0',
  releaseNotes: {
    en_US:
      'Updated to upstream v0.6.0 (Tinfoil model catalog refreshed to glm-5-3/flash and deepseek-v4-flash; host-header and origin security fixes). Added Service-to-Service URL action for plain-HTTP Open WebUI integration.',
    es_ES:
      'Actualizado a upstream v0.6.0 (catálogo de modelos Tinfoil actualizado a glm-5-3/flash y deepseek-v4-flash; mejoras de seguridad de host/origin). Añadida acción de URL de servicio a servicio para Open WebUI.',
    de_DE:
      'Aktualisiert auf Upstream v0.6.0 (Tinfoil-Modellkatalog auf glm-5-3/flash und deepseek-v4-flash aktualisiert; Host-/Origin-Sicherheitskorrekturen). Service-to-Service-URL-Aktion für Open WebUI hinzugefügt.',
    pl_PL:
      'Zaktualizowano do upstream v0.6.0 (odświeżony katalog modeli Tinfoil o glm-5-3/flash i deepseek-v4-flash; poprawki bezpieczeństwa nagłówków host/origin). Dodano akcję adresu między usługami dla Open WebUI.',
    fr_FR:
      "Mis à jour vers l'amont v0.6.0 (catalogue Tinfoil actualisé vers glm-5-3/flash et deepseek-v4-flash ; correctifs de sécurité des en-têtes host/origin). Ajout de l'action URL de service à service pour Open WebUI.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
