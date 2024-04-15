#!/usr/bin/env bash

test_flag=false
watch_mode_flag=false
# flags
while getopts 'tw' OPTION; do
# The colon after an option indicates that the option requires an argument. Each
# parsed option is stored in the $OPTION variable, and an argument, if present,
# is stored in the $OPTARG variable.
  case "$OPTION" in
    t)
      echo "Test mode turned on..."
      test_flag=true
      ;;
    w)
      echo "Watch mode turned on..."
      watch_mode_flag=true
      ;;
    *)
      echo "Error flag not found"
      exit1
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