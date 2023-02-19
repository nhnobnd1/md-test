#!/bin/bash

sedi () {
    sed --version >/dev/null 2>&1 && sed -i -- "$@" || sed -i "" "$@"
}

sedi 's/"dev": "vite"/"dev": "vite --mode=staging"/g' ./apps/standalone/package.json

echo '--- Change vite build to staging env. Done!'
