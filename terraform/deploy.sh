#!/usr/bin/env bash

set -ex

bash ./pre-apply.sh
terraform apply
