import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  // Tracks upstream ppq-private-mode-proxy (package.json version).
  version: '0.4.1:1',
  releaseNotes: {
    en_US:
      'Added a Service-to-Service URL action that resolves the internal LXC-bridge address Open WebUI (and other services on this same server) can use to reach the proxy without TLS.',
    es_ES:
      'Se ha añadido una acción de URL de servicio a servicio que resuelve la dirección interna del puente LXC que Open WebUI (y otros servicios de este servidor) pueden usar para llegar al proxy sin TLS.',
    de_DE:
      'Neue Aktion „Service-to-Service-URL“: ermittelt die interne LXC-Bridge-Adresse, über die Open WebUI (und andere Dienste auf diesem Server) den Proxy ohne TLS erreichen können.',
    pl_PL:
      'Dodano akcję „Adres URL między usługami”, która ustala wewnętrzny adres mostu LXC, pod którym Open WebUI (i inne usługi na tym serwerze) może dotrzeć do proxy bez TLS.',
    fr_FR:
      "Ajout d'une action « URL de service à service » qui résout l'adresse interne du pont LXC par laquelle Open WebUI (et d'autres services de ce serveur) peuvent joindre le proxy sans TLS.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})