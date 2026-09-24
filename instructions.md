# PPQ Private Mode

## Documentation

- [Upstream proxy documentation](https://github.com/PayPerQ/ppq-private-mode-proxy) — endpoints, client examples, and how the encryption works
- [PPQ.AI API docs](https://ppq.ai/api-docs) — creating an API key and funding your account

## What you get on StartOS

A local endpoint your AI clients talk to instead of talking to a model provider
directly. Everything sent through it is encrypted on your server and only
decrypted inside an attested hardware enclave, so neither PPQ.AI nor the model
host can read your queries.

Two interfaces share one address:

- **Status Page** — a web page showing whether enclave attestation succeeded,
  which private models are available, and how to point a client at the proxy.
  It is also where you can save your API key.
- **OpenAI-Compatible API** — the same address, ready to copy into a client.

The only thing the service stores is your PPQ.AI API key and the logging
setting.

## Getting set up

You need a funded API key from [ppq.ai](https://ppq.ai) — create one under
**Settings → API Keys**, since usage is billed per query to that key. You can
save it before or after starting the service; the proxy runs either way and
simply refuses inference requests until it has one.

1. Start the service. It performs a cryptographic attestation of the remote
   enclave, which the health check reports as ready — usually within a few
   seconds.
2. Open the **Status Page**, confirm attestation says _verified_, and paste your
   key into the API key form. The proxy picks it up immediately, then restarts
   once to persist it.
3. Copy the **OpenAI-Compatible API** address to point a client at it.

If you would rather not start the service first, run the **Configure PPQ API
Key** action instead of step 2 — it does the same thing from the Actions tab.

## Using PPQ Private Mode

### Connecting a client

Point any OpenAI-compatible client at the API address:

```
POST <api-address>/v1/chat/completions
{"model": "private/glm-5-3", "messages": [{"role": "user", "content": "Hello"}]}
```

Anthropic-SDK clients (including Claude Code) can use the native endpoint at
`<api-address>/v1/messages`. For Claude Code, set:

```
export ANTHROPIC_BASE_URL="<api-address>"
export ANTHROPIC_MODEL="private/glm-5-3"
```

`GET <api-address>/v1/models` lists the available private models, and the Status
Page shows the same list.

Requests are billed to your saved API key by default. To bill a different
PPQ.AI key per request, pass it as an `Authorization: Bearer` header.

### Open WebUI (or any service on this same server)

Open WebUI and this proxy are separate StartOS services. From one container to
another, the LAN `https://` address fails certificate validation — the calling
container does not trust this server's self-signed Root CA. Use the internal
LXC-bridge address instead, which is plain HTTP (no TLS involved):

1. On this service, run the **Service-to-Service URL** action (Actions tab).
2. Copy the URL it prints — `http://<bridge-ip>:<port>/v1`.
3. In Open WebUI: **Admin Panel → Connections → OpenAI API**, paste the URL in
   the URL field, click **Save**, and add the `private/` model IDs shown on the
   Status Page (for example `private/glm-5-3`).

Any other service container on the same server can use the same URL. It is not
reachable from your browser — that is what the LAN `https://` address is for.

### Replacing the key

Either surface works, and both write the same place: **Replace key** on the
Status Page, or the **Configure PPQ API Key** action. The action is also where
you turn Verbose Logging on and off; leaving its key field blank keeps the key
you already saved.

## Limitations

**The proxy has no login of its own, so only expose it to people you trust.**
Anyone who can reach the address can send requests that are billed to your
PPQ.AI key, and can replace the stored key from the Status Page. On a LAN-only
address that means everyone on your network; if you enable a Tor or public
address, it means anyone with the address. Keeping it on the LAN, or on Tor with
the address kept private, is the safe default.

Backups of this service include your saved API key, and restoring a backup
restores it — keep that in mind when handling backup drives.
