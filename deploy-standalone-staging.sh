#!/bin/bash

sedi () {
    sed --version >/dev/null 2>&1 && sed -i -- "$@" || sed -i "" "$@"
}

sedi 's/"dev": "vite"/"dev": "vite --mode=staging"/g' ./apps/standalone/package.json

echo '--- Successfully changed the configuration for the staging environment (App Standalone).'
