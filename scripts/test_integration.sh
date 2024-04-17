#!/usr/bin/env bash

# flags
watch_mode_flag=false
while getopts 'w' OPTION; do
# The colon after an option indicates that the option requires an argument. Each
# parsed option is stored in the $OPTION variable, and an argument, if present,
# is stored in the $OPTARG variable.
  case "$OPTION" in
    w)
      echo "Watch mode turned on..."
      watch_mode_flag=true
      ;;
    *)
      echo "Error flag not found"
      exit 1
      ;;
  esac
done

# Exit script
handle_sigint() {
    echo "Script interrupted by Ctrl+C"
    yarn docker:stop test-db
    exit 1
}

# Set the trap to call handle_sigint when SIGINT is received
trap handle_sigint SIGINT

# get current dir e.g. executed in root but get {{root}}/scripts
DIR="$(cd "$(dirname "$0")" && pwd)"

# set envs and setup test db
source $DIR/setup_test_db.sh

# run tests
if [[ $watch_mode_flag == true ]]
then
  vitest -c vitest.config.integration.ts
else
  vitest -c vitest.config.integration.ts --run
fi

# stop db
yarn docker:stop test-db