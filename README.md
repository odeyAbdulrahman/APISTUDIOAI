# APISTUDIOAI website

## Local development

Requirements: Node.js 22.13 or newer and npm.

```bash
npm ci
npm run dev
```

Before opening a pull request, run:

```bash
npm run lint
npm test
```

## Development CI/CD

The workflow at `.github/workflows/deploy-dev.yml` validates pull requests into
`dev`. A push to `dev` (or a manual workflow run) also builds a production
Docker image, pushes both an immutable commit tag and `latest` to Docker Hub,
then deploys the immutable image to the development server over SSH.

Create a GitHub environment named `Development` and add these environment
secrets:

| Secret | Purpose |
| --- | --- |
| `DOCKER_USERNAME` | Docker Hub user or organization that owns the image @repository |
| `DOCKER_PASSWORD` | Docker Hub access token with push permission |
| `SSH_HOST` | Development server hostname or IP address |
| `SSH_USER` | SSH account used for deployment |
| `SSH_PRIVATE_KEY` | Private key for that SSH account |

The server must have Docker installed and the SSH user must be allowed to run
Docker without an interactive password prompt. The deployment publishes the UI
on host port `3001` by default and creates an `apistudioai-ui` container with an
`unless-stopped` restart policy. To use a different host port, define the
`UI_HOST_PORT` variable in the `Development` GitHub environment. The app still
listens on port `3000` inside the container. A failed health check rolls the
deployment back to the prior image.

If the Docker Hub repository is private, log in to Docker Hub once on the
development server before the first deployment. The image repository is:

```text
<DOCKER_USERNAME>/apistudioai-ui
```

The Nuxt runtime variables from the reference workflow are intentionally not
used: this project is a Next.js/Vinext application and currently has no
application runtime secrets.
