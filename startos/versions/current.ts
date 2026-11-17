import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  // Tracks upstream ppq-private-mode-proxy (package.json version).
  version: '0.8.0:0',
  releaseNotes: {
    en_US:
      'Updates the proxy to 0.8.0. The private model list is now read from PPQ.AI at startup, so models PPQ.AI adds or retires appear without a package update; private/deepseek-v4-flash is now private/deepseek-v4-1-flash. Adds PDF and document input for private models and fixes requests from clients that send an empty tool list.',
    es_ES:
      'Actualiza el proxy a 0.8.0. La lista de modelos privados ahora se obtiene de PPQ.AI al iniciar, por lo que los modelos que PPQ.AI añade o retira aparecen sin actualizar el paquete; private/deepseek-v4-flash ahora es private/deepseek-v4-1-flash. Añade entrada de PDF y documentos para los modelos privados y corrige las solicitudes de clientes que envían una lista de herramientas vacía.',
    de_DE:
      'Aktualisiert den Proxy auf 0.8.0. Die Liste der privaten Modelle wird jetzt beim Start von PPQ.AI geladen, sodass von PPQ.AI hinzugefügte oder eingestellte Modelle ohne Paket-Update erscheinen; private/deepseek-v4-flash heißt jetzt private/deepseek-v4-1-flash. Außerdem kommen PDF- und Dokumenteingabe für private Modelle hinzu, und Anfragen von Clients mit leerer Werkzeugliste funktionieren wieder.',
    pl_PL:
      'Aktualizuje proxy do wersji 0.8.0. Lista modeli prywatnych jest teraz pobierana z PPQ.AI przy starcie, więc modele dodawane lub wycofywane przez PPQ.AI pojawiają się bez aktualizacji pakietu; private/deepseek-v4-flash to teraz private/deepseek-v4-1-flash. Dodaje obsługę plików PDF i dokumentów dla modeli prywatnych oraz naprawia żądania klientów wysyłających pustą listę narzędzi.',
    fr_FR:
      "Met à jour le proxy vers 0.8.0. La liste des modèles privés est désormais lue depuis PPQ.AI au démarrage : les modèles ajoutés ou retirés par PPQ.AI apparaissent sans mise à jour du paquet ; private/deepseek-v4-flash devient private/deepseek-v4-1-flash. Ajoute la prise en charge des PDF et des documents pour les modèles privés et corrige les requêtes des clients qui envoient une liste d'outils vide.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
