import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  // Tracks upstream ppq-private-mode-proxy (package.json version).
  version: '0.6.0:6',
  releaseNotes: {
    en_US:
      'Updates Node.js to 22.23.4 with security fixes and moves to start-sdk 3.1.0.',
    es_ES:
      'Actualiza Node.js a 22.23.4 con correcciones de seguridad y pasa a start-sdk 3.1.0.',
    de_DE:
      'Aktualisiert Node.js auf 22.23.4 mit Sicherheitskorrekturen und wechselt zu start-sdk 3.1.0.',
    pl_PL:
      'Aktualizuje Node.js do wersji 22.23.4 z poprawkami bezpieczeństwa i przechodzi na start-sdk 3.1.0.',
    fr_FR:
      "Met à jour Node.js vers 22.23.4 avec des correctifs de sécurité et passe à start-sdk 3.1.0.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
