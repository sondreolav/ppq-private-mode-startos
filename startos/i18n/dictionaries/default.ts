export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting PPQ Private Mode!': 0,
  'Encrypted Proxy': 1,
  'The proxy is ready — enclave attestation verified': 2,
  'The proxy is not ready (enclave attestation pending)': 3,
  // interfaces.ts
  'Status Page': 4,
  'Enclave attestation state, the available private models, and client setup snippets': 5,
  'OpenAI-Compatible API': 6,
  'Point any OpenAI or Anthropic SDK client at this URL to use PPQ private (TEE) models with end-to-end encryption': 7,
  // actions/configureApiKey.ts
  'PPQ.AI API Key': 8,
  'Your API key from ppq.ai (Settings → API Keys). Leave blank to keep the key already saved, or to set one later from the Status Page.': 9,
  'A PPQ.AI key starts with "sk-".': 10,
  'Verbose Logging': 11,
  'Log every request the proxy handles. Useful for troubleshooting.': 12,
  'Configure PPQ API Key': 13,
  'Set the PPQ.AI API key the proxy uses to authenticate. Requests are billed to this key.': 14,
  // init/taskConfigureApiKey.ts
  'Add your PPQ.AI API key here, or start the service and save one on the Status Page': 15,
  // actions/showServiceUrl.ts
  'Service-to-Service URL': 16,
  'Resolve the internal URL that services on this same StartOS server (e.g. Open WebUI) can use to reach this proxy over the LXC bridge, without TLS.': 17,
  'Service-to-Service Base URL': 18,
  'Paste this URL into Open WebUI (Admin → Connections → OpenAI API, URL field), Save, then add the private/ model IDs shown on the Status Page. This address only works from services on this same server — it is not reachable from your browser.': 19,
  'Could not resolve the service-to-service address for this package.': 20,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict