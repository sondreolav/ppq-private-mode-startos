import { sdk } from '../sdk'
import { configJson } from '../fileModels/config.json'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  apiKey: Value.text({
    name: i18n('PPQ.AI API Key'),
    description: i18n(
      'Your API key from ppq.ai (Settings → API Keys). Leave blank to keep the key already saved, or to set one later from the Status Page.',
    ),
    required: false,
    default: null,
    masked: true,
    placeholder: 'sk-...',
    // Same exact shape check as upstream v0.6.0, so a key accepted here is
    // never later rejected by the proxy's own status-page endpoint.
    patterns: [
      {
        regex: '^sk-[A-Za-z0-9]{16,64}$',
        description: i18n('A PPQ.AI key starts with "sk-".'),
      },
    ],
  }),
  debug: Value.toggle({
    name: i18n('Verbose Logging'),
    description: i18n(
      'Log every request the proxy handles. Useful for troubleshooting.',
    ),
    default: false,
  }),
})

export const configureApiKey = sdk.Action.withInput(
  'configure-api-key',

  async ({ effects }) => ({
    name: i18n('Configure PPQ API Key'),
    description: i18n(
      'Set the PPQ.AI API key the proxy uses to authenticate. Requests are billed to this key.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  // Prefill: the API key is never echoed back into the form.
  async ({ effects }) => ({
    debug: (await storeJson.read((s) => s.debug).once()) ?? false,
  }),

  async ({ effects, input }) => {
    // Write each setting only when it actually changed. main.ts re-runs — and
    // the daemon restarts — on every file change, so writing both files
    // unconditionally would restart the service twice in a single action.
    const currentDebug = (await storeJson.read((s) => s.debug).once()) ?? false
    if (input.debug !== currentDebug) {
      await storeJson.merge(effects, { debug: input.debug })
    }

    const apiKey = (input.apiKey ?? '').trim()
    if (apiKey) await configJson.merge(effects, { apiKey })
  },
)