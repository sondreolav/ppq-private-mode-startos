// Constants shared across this package's startos/ code.

// Port the proxy listens on inside the container (upstream default).
export const apiPort = 8787

// Host id of the binding the proxy's API and Status Page are served from.
// Dependents import this along with apiPort (the stable contract) rather than
// hardcoding either — mirroring the open-webui KNOWN_BACKENDS pattern.
export const apiHostId = 'main'

// Upstream's PPQ_DATA_DIR inside the container: where it persists the API key
// saved from the status page.
export const dataDir = '/data'