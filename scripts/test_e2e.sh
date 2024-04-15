#!/usr/bin/env bash

# flags
headed_flag=false
while getopts 'h' OPTION; do
    case "$OPTION" in
        h)
            echo "headless mode off flag detected"
            headed_flag=true
            ;;
        *)
            echo "invalid flag"
            exit 1
            ;;
    esac
done

# Exit script early 
handle_sigint() {
    echo "Script interrupted by Ctrl+C"
    yarn docker:stop test-db
    exit 1
}

# Set the trap to call handle_sigint when SIGINT is received
trap handle_sigint SIGINT

DIR="$(cd "$(dirname "$0")" && pwd)"

# setup envs and test db
source $DIR/setup_test_db.sh -h

# run test 
if [[ $headed_flag == true ]]
then
    echo "Running playwright tests with headless mode off..."
    npx playwright test --headed
else
    echo "Running playwright tests headless mode on..."
    npx playwright test
fi

npx playwright show-report

# close db
yarn docker:stop test-db