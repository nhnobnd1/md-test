#!/bin/bash

sedi () {
    sed --version >/dev/null 2>&1 && sed -i -- "$@" || sed -i "" "$@"
}

sedi 's/"dev": "vite"/"dev": "vite --mode=development"/g' ./apps/standalone/package.json

echo '--- Successfully changed the configuration for the development environment (App Standalone).'
