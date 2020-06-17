#!/bin/bash

yarn build:webapp:prod

firebase use prod
firebase target:apply hosting webapp webapp -P prod
firebase deploy --only hosting:webapp -P prod
