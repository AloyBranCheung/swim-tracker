#!/usr/bin/env bash

# unit tests
yarn test:unit --run 

# integration tests 
yarn test:int

# e2e tests
yarn test:e2e
