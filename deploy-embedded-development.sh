#!/bin/bash

sedi () {
    sed --version >/dev/null 2>&1 && sed -i -- "$@" || sed -i "" "$@"
}

sedi 's/"build": "vite build"/"build": "vite build --mode development"/g' ./apps/shopify/web/frontend/package.json

echo '--- Successfully changed the configuration for the development environment (App Embedded).'
