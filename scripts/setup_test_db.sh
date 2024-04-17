#!/usr/bin/env bash

# Reset OPTIND to ensure getopts starts from the beginning
OPTIND=1

# set envs and setup test db 
migrate_users=false
while getopts "hw" OPTION; do
    case "$OPTION" in
        h)
            echo "migrate auth0 users option detected"
            migrate_users=true
            ;;
        w)  echo "setup_test_db.sh received -w flag from another script..."
            echo "doing nothing..."
            ;;
        *)
            echo "invalid flag"
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


# export envs within context of scripts
export $(grep -v '^#' .env.test | xargs)
echo "Database connection: $DATABASE_URL"

# # startup test-db 
yarn docker:only test-db 

# wait for db ready
echo '🟡 - Waiting for database to be ready...'
$DIR/wait_for_it.sh "${DATABASE_URL}" -- echo '🟢 - Database ready!'

# add tables + migrate data
yarn prisma migrate dev 

echo "migrate_users=$migrate_users"
if [[ $migrate_users == true ]]
then 
    echo "Grabbing Auth0 Management API token"
    
    response=$(curl --request POST \
     --url $AUTH0_ISSUER_BASE_URL/oauth/token \
     --header 'content-type: application/json' \
     --data "{\"client_id\":\"$AUTH0_MANAGEMENT_API_CLIENT_ID\",\"client_secret\":\"$AUTH0_MANAGEMENT_API_CLIENT_SECRET\",\"audience\":\"https://dev-uw0vq8v32kjv4k1a.us.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}")
    token=$(echo $response | jq -r '.access_token')
    export AUTH0_TMP_API_TOKEN=$token

    yarn migrate:data
else
    yarn migrate:data -s users
fi
