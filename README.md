<p align="center">
  <img src="icon.png" alt="PPQ Private Mode Logo" width="21%">
</p>

# PPQ Private Mode on StartOS

> Everything not listed in this document should behave the same as upstream
> PPQ Private Mode. If a feature, setting, or behavior is not mentioned here,
> the upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[PPQ Private Mode](https://github.com/PayPerQ/ppq-private-mode-proxy) is a local proxy that encrypts AI requests on your server and only lets them be decrypted inside an attested hardware enclave, so neither PPQ.AI nor the model host can read them. This package runs that proxy and points any OpenAI- or Anthropic-compatible client at it.

- **Upstream proxy repo:** <https://github.com/PayPerQ/ppq-private-mode-proxy>
- **Upstream wrapper (this is a fork of it):** <https://github.com/Start9-Community/ppq-private-mode-startos>

---

## Changes in this fork

Forked from [Start9-Community/ppq-private-mode-startos](https://github.com/Start9-Community/ppq-private-mode-startos). Tracks upstream `ppq-private-mode-proxy` v0.6.0:

- **Upstream v0.6.0 updates:** Updated model catalog (`private/glm-5-3`, `private/glm-5-3-flash`, `private/deepseek-v4-flash`), host and origin security hardening against browser CSRF/DNS rebinding.
- **DNS-rebinding hardening (default on).** StartOS now sets `PPQ_ALLOWED_HOSTS` automatically to the exact hostnames the API interface is served on (LAN IP, `.local`, private/public domains, the bridge address and loopback). A hostile web page can no longer reach the proxy as "same-origin" or overwrite the stored API key via `/setup/api-key`. The list is resolved reactively, so adding a domain later is picked up on the next restart.
- **New action — Service-to-Service URL.** Resolves the internal LXC-bridge address and prints the `http://<bridge-ip>:<port>/v1` base URL that Open WebUI (or any service container on this same StartOS server) should dial — plain HTTP, no TLS or cert handling. This is what an on-box client must use instead of the LAN `https://` address, which fails certificate validation inside another container's runtime.
- **Key validation matches upstream.** `configureApiKey` uses the exact same API-key shape check as upstream v0.6.0 (`^sk-[A-Za-z0-9]{16,64}$`), so a key accepted in StartOS is never rejected later by the proxy itself.
- **No glוןouble restart on configure.** The action only writes settings that actually changed (both `debug` and the API key are compared against the stored value first), so toggling logging or replacing the key restarts the service once — and only when something really changed.
- **Stable consumer contract.** `startos/utils.ts` exports `apiHostId` (`'main'`) and `apiPort` (`8787`) for dependents to import, mirroring the pattern Open WebUI already uses for its other AI backends.
- **Docs.** `README.md` and `instructions.md` document the same-server / Open WebUI connection flow and updated models.

Version: `0.6.0:4`, built with SDK 2.0.9.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

One image, built from upstream's own Dockerfile.

| Property      | Value                                      |
| ------------- | ------------------------------------------ |
| Image         | Built from the vendored upstream submodule |
| Architectures | x86_64, aarch64                            |
| Command       | The proxy's server entrypoint              |

| Subcontainer | Purpose                                  |
| ------------ | ---------------------------------------- |
| `proxy-sub`  | The only daemon — the one to `attach` to |

**Upstream is vendored as a git submodule and built here**, rather than pulled as a published image — so the shipped bits correspond to a specific upstream commit.

One oneshot runs first, giving the data directory to the unprivileged user the image runs as.

## Volume and Data Layout

One volume, with a deliberate split down the middle.

| Volume | Subpath | Mount Point | Purpose                       |
| ------ | ------- | ----------- | ----------------------------- |
| `main` | `proxy` | `/data`     | Upstream's own data directory |

| Path                | Written by                | Holds                      |
| ------------------- | ------------------------- | -------------------------- |
| `proxy/config.json` | The proxy, and the action | The PPQ.AI API key         |
| `store.json`        | The action                | The package's own settings |

**Only the `proxy` subpath is mounted into the container.** The package's own settings live at the volume root, outside what the proxy can see — so the proxy neither reads them nor overwrites them when it rewrites its own file.

## File Models

Two models, and keeping them apart is the point.

| File                | Format | Modelled                | Written by                |
| ------------------- | ------ | ----------------------- | ------------------------- |
| `proxy/config.json` | JSON   | Yes — `FileHelper.json` | The proxy, and the action |
| `store.json`        | JSON   | Yes — `FileHelper.json` | The action                |

**The proxy's config file is co-owned, and its shape must stay exactly upstream's.** The proxy rewrites the whole file when a key is saved on its status page, so anything else stored there would be destroyed — which is why the verbose-logging setting lives in a separate file the container cannot see.

**The API key is not passed as an environment variable**, though upstream supports that. Leaving it out means the proxy's own key store is the single owner of the key, so a key set through the status page and a key set through the action are the same key rather than two competing sources.
The config file is read reactively, which is what makes a key saved by the action take effect: the write restarts the daemon, and the proxy reloads the file at start.

## Dependencies

None.

**But the service is not self-contained.** Every request is forwarded to PPQ.AI's enclave, so the package needs working internet and a funded PPQ.AI account. Running this proxy locally is not running inference locally — what it buys is that the request contents are encrypted end-to-end into the enclave.

## Network Access and Interfaces

**Two interfaces on one address**, which is unusual and deliberate.

| Interface | Id    | Type | Port | Description                                         |
| --------- | ----- | ---- | ---- | --------------------------------------------------- |
| Status    | `ui`  | ui   | 8787 | Attestation state, available models, setup snippets |
| API       | `api` | api  | 8787 | The OpenAI-compatible endpoint                      |

Both are exported from the **same binding**, because they are the same server: one is the page a person opens, the other is the URL a client is pointed at. Bound on the `main` MultiHost over HTTP and not masked.

**Neither is authenticated by StartOS**, and the status page is where the API key can be saved — so anyone who can reach the address can read the attestation state, use your key for inference, and replace it. Treat the address as a credential.

Since 0.6.0:4 the package sets **`PPQ_ALLOWED_HOSTS`** automatically to the hostnames StartOS serves this binding on (LAN IP, `.local`, private/public domains, plus the bridge IP and loopback). This thwarts DNS-rebinding: a request whose `Host` is not one of those names is refused by the proxy before any request handling, so a hostile web page cannot act as "same-origin" against it.

**Same-server consumption (service-to-service).** A client running in *another service's container on this same server* — Open WebUI, a custom agent — must not use the LAN `https://` address: the calling runtime does not trust this server's self-signed Root CA, so the dial fails certificate verification. What it *should* use is the LXC-bridge address, which is plain HTTP — no TLS, no cert handling. Run the **Service-to-Service URL** action and paste the returned `http://<bridge-ip>:<port>/v1` URL into the client. The LAN `https://` address (e.g. `https://192.168.0.158:56849`) remains correct for off-box clients — a browser with the server's Root CA trusted, or `curl -k`.

## Installation and First-Run Flow

Install seeds nothing and raises an `important` task asking for the PPQ.AI API key.

**That task is deliberately not `critical`**, and the reasoning is worth knowing: a `critical` task suspends the ordinary controls, which would leave the user unable to start the service — and the service's own status page is the other place a key can be saved. Blocking startup would block one of the two ways to complete the task.

So the proxy starts without a key. It serves its status page, performs attestation, and answers inference requests with an authentication error until a key exists.

**A key saved on the status page clears the task too.** The action clears its own task when it runs, but the status page never goes through the action — so the restart that the save triggers is where the package notices a key now exists and clears the prompt itself. Without that, StartOS would keep asking for a key the user had already set.

## Actions

Two actions, both available whether or not the service is running.

### Configure PPQ API Key

Sets the API key and the verbose-logging switch.

- **What it changes:** the key in the proxy's config file, and the logging setting in the package's own store.
- **Cost:** the service restarts, since the proxy reads its config at start.
- **Repeat safety:** idempotent. **Leaving the key blank keeps the existing one** rather than clearing it, so the action can be used to toggle logging without re-entering the key.
- **The key is never echoed back into the form.** The logging toggle is pre-filled; the key is not.
- **The key's shape is checked before it is written**, with the exact same pattern upstream v0.6.0 uses (`^sk-[A-Za-z0-9]{16,64}$`) — so a key accepted here is never rejected later by the proxy's own status-page endpoint.
- **Only changed settings are written.** Each value (`debug`, `apiKey`) is compared against the stored value first; nothing is written when it did not change, so no spurious restarts.

**Requests are billed to whichever key is set.**

### Service-to-Service URL

Resolves the internal LXC-bridge address another service on this same server (Open WebUI) dials to reach the proxy.

- **What it returns:** the copyable base URL `http://<bridge-ip>:<assigned-port>/v1`.
- **Why it exists:** the LAN `https://` address fails from another container, because that container's runtime does not trust this server's Root CA; the bridge address is plain HTTP and needs no trust setup.
- **Usage:** in Open WebUI, Admin Panel → Connections → OpenAI API, paste the URL, Save, and add the `private/` model IDs shown on the Status Page.
- **Cost:** none; the service does not restart.

## Tasks

One, and it is advisory.

| Task                  | Severity    | Raised when               | Cleared when                      |
| --------------------- | ----------- | ------------------------- | --------------------------------- |
| Configure PPQ API Key | `important` | An init that finds no key | The action runs, or a key appears |

`important` does not block the service from starting — see [Installation and First-Run Flow](#installation-and-first-run-flow) for why that matters here.

## Health Checks

One check, on the only daemon.

| Check   | Displayed as      | Method                 |
| ------- | ----------------- | ---------------------- |
| `proxy` | "Encrypted Proxy" | Port 8787 is listening |

**Here a port check means more than usual.** The proxy binds its port only after remote attestation of the enclave has succeeded, so a listening port is evidence that the encrypted channel was verified — not merely that a process started.

It still says nothing about the key: an unset or rejected key shows a green check and an authentication error on the request.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')`. That is the proxy's config file, holding the API key, and the package's settings.

**The backup contains the API key in recoverable form**, and requests made with it are billed to your account. There is nothing else here: no conversation history, no cache, no model data.

A restored instance comes back with the same key and works immediately, since nothing in the configuration is tied to the server it ran on.

## Limitations and Differences

1. **Inference is not local.** Requests go to PPQ.AI's enclave; the privacy claim is about who can decrypt them, not about where they run.
2. **A funded PPQ.AI account is required**, and requests are billed to the configured key.
3. **Neither interface is authenticated**, and the status page can both use and replace the key.
4. **The status page and the API share one address**, so they cannot be exported separately.
5. **The API key cannot be cleared from the action** — leaving the field blank preserves it.
6. **The package cannot add settings to the proxy's config file**, which upstream rewrites wholesale.
7. **The only package-level setting is verbose logging.** Everything else is upstream's.
8. **Same-server clients must use the bridge address, not the LAN `https://` URL** — see [Network Access and Interfaces](#network-access-and-interfaces).
9. **Known SDK listener warning (accepted).** `main` reads the files reactively with `.const()` — necessary so a key saved on the Status Page clears the setup task. That hits the known Start9 SDK pattern around `FileHelper.produce` that can emit a cosmetic `MaxListenersExceededWarning` (start9labs/start-technologies#3182). It is library-side and cosmetic; the reactive reads are required, so we deliberately do not "fix" it.
10. **Upstream request bodies are unbounded (accepted, documented).** Upstream v0.6.0 does not cap HTTP request-body size, so a client that can reach the API could spend memory with very large POSTs (a potential DoS). This is upstream code — this wrapper cannot fix it without forking the proxy — so the mitigation is to keep the API interface private (LAN/VPN/Tor) and never expose it on the public internet. The interface is unauthenticated anyway (see #3), so it should never be publicly reachable.

---

## Quick Reference for AI Consumers

```yaml
package_id: ppq-private-mode
image: built from ./ppq-private-mode-proxy # upstream vendored as a git submodule
architectures:
  - x86_64
  - aarch64
subcontainers:
  - proxy-sub
volumes:
  main:
    proxy: /data # PPQ_DATA_DIR; store.json sits at the volume root, unmounted
file_models:
  - proxy/config.json # upstream's shape exactly — the proxy rewrites it wholesale
  - store.json # package-owned; kept outside the mount so the proxy can't clobber it
startos_managed_env_vars:
  - PPQ_DATA_DIR
  - HOST
  - PORT
  - DEBUG
  - PPQ_ALLOWED_HOSTS # set automatically from the binding's addresses (v0.6.0:4+)
  # PPQ_API_KEY is deliberately NOT set — the proxy's key store owns the key
dependencies: [] # but requires internet and a funded PPQ.AI account
interfaces:
  ui: { type: ui, port: 8787 } # status page; also where a key can be saved
  api: { type: api, port: 8787 } # same binding, exported as a second interface
actions:
  - configure-api-key # blank key field preserves the existing key
  - show-service-to-service-url # prints http://<bridge-ip>:<port>/v1 for same-server clients (Open WebUI)
tasks:
  - { action: configure-api-key, severity: important } # not critical, by design
health_checks:
  - proxy # the port opens only after enclave attestation succeeds
```

**Stable contract for dependents:** `startos/utils.ts` exports `apiHostId` (`'main'`) and `apiPort` (`8787`) — the values a package like Open WebUI imports rather than hardcoding (`sdk.host.getBridgeAddress(effects, { packageId: 'ppq-private-mode', hostId: apiHostId, internalPort: apiPort, ssl: false })`).