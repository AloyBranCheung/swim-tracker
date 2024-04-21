# !/usr/bin/env bash

# DON'T MESS WITH THE ORDER OF THE STATIC DATA MIGRATIONS 

# flags
migrations_to_skip=[]
while getopts 's:' OPTION; do
    case "$OPTION" in
        s)
            IFS=',' read -ra tmp <<< "$OPTARG"
            migrations_to_skip=("${tmp[@]}")
            echo "Skipping migrations: $OPTARG"
            ;;
        *)
            echo "Invalid flag"
            exit 1
            ;;
    esac
done

# to be run in root
yarn run generate-client

echo "Begin migrations..."

# data migrations must be in order
if [[ ${migrations_to_skip[@]} =~ "users" ]]
then
    echo "Skipping user migration..."
else
    
    npx tsx ./prisma/data-migrations/migrate-users.ts
fi

npx tsx ./prisma/data-migrations/migrate-programs.ts
npx tsx ./prisma/data-migrations/migrate-program-descriptions.ts
npx tsx ./prisma/data-migrations/migrate-add-intermediate.ts
npx tsx ./prisma/data-migrations/migrate-add-advanced1.ts
npx tsx ./prisma/data-migrations/migrate-add-beginner2.ts
npx tsx ./prisma/data-migrations/migrate-add-beginner3.ts
npx tsx ./prisma/data-migrations/migrate-add-urls.ts
npx tsx ./prisma/data-migrations/migrate-add-20240421075539_beginner4.ts

npx tsx ./prisma/data-migrations/migrate-add-20240421084434_beginner5.ts

npx tsx ./prisma/data-migrations/migrate-add-20240421084912_beginner6.ts

npx tsx ./prisma/data-migrations/migrate-add-20240421090242_intermediate2.ts

npx tsx ./prisma/data-migrations/migrate-add-20240421090700_intermediate3.ts

npx tsx ./prisma/data-migrations/migrate-add-20240421091201_intermediate4.ts

npx tsx ./prisma/data-migrations/migrate-add-20240421091509_intermediate5.ts
