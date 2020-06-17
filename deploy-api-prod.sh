#!/usr/bin/env bash

yarn build:api:prod

cp gae-api-prod.yaml ./dist/apps/api/gae.yaml
cp yarn.lock ./dist/apps/api/
cp package-gae-api.json ./dist/apps/api/package.json

cd dist/apps/api
gcloud app deploy gae.yaml --project=cat-analytica-02 --quiet
