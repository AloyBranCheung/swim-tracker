#!/usr/bin/env bash

echo "Grabbing .env.local variables"
export $(grep -v '^#' .env.local | xargs)

echo "Grabbing Auth0 Management API token"
    
response=$(curl --request POST \
    --url $AUTH0_ISSUER_BASE_URL/oauth/token \
    --header 'content-type: application/json' \
    --data "{\"client_id\":\"$AUTH0_MANAGEMENT_API_CLIENT_ID\",\"client_secret\":\"$AUTH0_MANAGEMENT_API_CLIENT_SECRET\",\"audience\":\"https://dev-uw0vq8v32kjv4k1a.us.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}")
token=$(echo $response | jq -r '.access_token')
export AUTH0_TMP_API_TOKEN=$token
