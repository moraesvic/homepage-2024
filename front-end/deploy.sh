#!/usr/bin/env bash

set -ex

source ./.env.sh

yarn build

aws s3 sync --delete ./dist/ s3://$S3_BUCKET
aws cloudfront create-invalidation --distribution-id $CF_DISTRIBUTION --paths '/*'

