import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  // Tracks upstream ppq-private-mode-proxy (package.json version).
  version: '0.6.0:5',
  releaseNotes: {
    en_US:
      'Rebased onto upstream start-sdk 3.0.3. The Verbose Logging description now states that error messages may include sensitive content, even when verbose logging is off.',
    es_ES:
      'Actualizado a start-sdk 3.0.3. La descripción de Registro detallado ahora indica que los mensajes de error pueden incluir contenido sensible, incluso con el registro desactivado.',
    de_DE:
      'Auf start-sdk 3.0.3 umgestellt. Die Beschreibung von „Ausführliche Protokollierung“ weist nun darauf hin, dass Fehlermeldungen sensiblen Inhalt enthalten können, auch wenn die Protokollierung aus ist.',
    pl_PL:
      'Przejście na start-sdk 3.0.3. Opis opcji Szczegółowe logowanie informuje teraz, że komunikaty błędów mogą zawierać poufne treści, nawet gdy logowanie jest wyłączone.',
    fr_FR:
      "Passage à start-sdk 3.0.3. La description de la Journalisation détaillée indique désormais que les messages d'erreur peuvent contenir du contenu sensible, même lorsque la journalisation est désactivée.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
