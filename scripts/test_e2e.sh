#!/usr/bin/env bash

# flags
headed_flag=false
with_reports=false
while getopts 'hr' OPTION; do
    case "$OPTION" in
        h)
            echo "headless mode off flag detected"
            headed_flag=true
            ;;
        r)  echo "show reports on"
            with_reports=true
            ;;
        *)
            echo "invalid flag"
            exit 1
            ;;
    esac
done

echo -e "settings:\n headed_flag=$headed_flag\n with_reports=$with_reports\n"

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

if [[ $with_reports == true ]]
then
    echo "Showing reports..."
    npx playwright show-report
fi

# close db
yarn docker:stop test-db