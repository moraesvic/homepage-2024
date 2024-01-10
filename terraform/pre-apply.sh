#!/usr/bin/env bash

set -ex

cd ../lambda-at-edge
yarn install
yarn build

cd -
cd ../front-end
yarn install
yarn build
