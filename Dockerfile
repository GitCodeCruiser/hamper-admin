# syntax=docker/dockerfile:1.7
# Hogani Jets admin panel (Next.js) - port 14596
# Mirrors the live image layout (hoganijets-production-new-admin@sha256:f00e6f83...):
#   Node 22.23.3 bookworm-slim, /app, full node_modules + .next + public + next.config.*,
#   CMD next start -p 14596.
#
# Build-time settings: next.config.ts bakes process.env values into the build, so they are
# provided as a BuildKit SECRET file (id=buildenv), mounted as .env.production only while
# `next build` runs. It is never written to an image layer or the build history.
#   docker build --secret id=buildenv,src=./admin.build.env -t <image> .

############################
# Build stage
############################
FROM node:22.23.3-bookworm-slim AS builder
WORKDIR /app
ENV HUSKY=0 \
    NEXT_TELEMETRY_DISABLED=1

# This repo uses yarn classic (yarn.lock)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 600000

COPY . .
# Same as `yarn build` (next build).
RUN --mount=type=secret,id=buildenv,target=/app/.env.production,required=true \
    NODE_ENV=production npx next build && \
    rm -rf .next/cache

############################
# Runtime stage
############################
FROM node:22.23.3-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production \
    PORT=14596 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1

RUN groupadd --system --gid 1001 nextjs && \
    useradd --system --uid 1001 --gid nextjs nextjs

COPY --from=builder --chown=nextjs:nextjs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nextjs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nextjs /app/.next ./.next
COPY --from=builder --chown=nextjs:nextjs /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/next.config.* ./

USER nextjs
EXPOSE 14596
CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "14596"]
