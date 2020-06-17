#!/bin/bash

yarn build:webapp:prod

firebase use prod
firebase target:apply hosting gitcode-prod gitcode-prod -P prod
firebase deploy --only hosting:gitcode-prod -P prod
