# Storacha Upload Lister

A small Node script that logs into a Storacha client and lists uploaded files using `client.capability.upload.list()`.

This repository contains a single script, `upload.js`, that will:

- create a `@storacha/client` client
- log in (the script currently prompts for or accepts the email via an environment variable)
- call `client.capability.upload.list()` and print a short summary plus the full JSON

## Prerequisites

- Node.js (14+ recommended)
- npm (or yarn)

## Install

From the project folder:

```bash
npm install @storacha/client
```

## Usage

Interactive (prompts for email):

```bash
node "c:/Users/Admin/Downloads/C. D. EXPERT/upload.js"
```

Non-interactive (use environment variable to provide email):

```bash
STORACHA_EMAIL='zaphod@beeblebrox.galaxy' node "c:/Users/Admin/Downloads/C. D. EXPERT/upload.js"
```

Notes
- The current `upload.js` reads only `STORACHA_EMAIL` or prompts for an email; if your instance requires a password, you can modify the script to provide a password or adapt to the auth flow supported by `@storacha/client`.
- If `client.capability.upload.list()` is not available, update `@storacha/client` or check the client API for the correct capability name.

## Troubleshooting

- "Login failed": check that the email is correct and that your Storacha instance supports the login method used by the client.
- "The client does not expose client.capability.upload.list()": ensure you have the right version of the client and consult its docs.

## License

You can copy and adapt this script as you need.
