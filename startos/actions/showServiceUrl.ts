import { sdk } from '../sdk'
import { apiHostId, apiPort } from '../utils'
import { i18n } from '../i18n'

/**
 * Surfaces the internal (service-to-service) base URL another StartOS service
 * on this same server — e.g. Open WebUI — should be pointed at.
 *
 * The LAN `https://` address fails from another container on the box, because
 * the calling runtime does not trust this server's self-signed Root CA. The
 * LXC bridge address is plain HTTP, so no TLS/cert handling is involved. We
 * resolve it from our own binding rather than assuming anything about the
 * bridge IP or the assigned external port.
 */
export const showServiceUrl = sdk.Action.withoutInput(
  'show-service-to-service-url',

  async ({ effects }) => ({
    name: i18n('Service-to-Service URL'),
    description: i18n(
      'Resolve the internal URL that services on this same StartOS server (e.g. Open WebUI) can use to reach this proxy over the LXC bridge, without TLS.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    const bridge = await sdk.host
      .getBridgeAddress(effects, {
        // Explicit self-reference: `packageId` may be omitted (it then defaults
        // to this package), but naming it keeps the call in lockstep with the
        // documented service-to-service contract in README.md.
        packageId: 'ppq-private-mode',
        hostId: apiHostId,
        internalPort: apiPort,
        ssl: false,
      })
      .once()

    if (!bridge) {
      throw new Error(
        i18n(
          'Could not resolve the service-to-service address for this package.',
        ),
      )
    }

    return {
      version: '1',
      title: i18n('Service-to-Service Base URL'),
      message: i18n(
        'Paste this URL into Open WebUI (Admin → Connections → OpenAI API, URL field), Save, then add the private/ model IDs shown on the Status Page. This address only works from services on this same server — it is not reachable from your browser.',
      ),
      result: {
        type: 'single',
        value: `http://${bridge}/v1`,
        copyable: true,
        qr: false,
        masked: false,
      },
    }
  },
)