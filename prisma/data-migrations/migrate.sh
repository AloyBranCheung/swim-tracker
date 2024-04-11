# !/usr/bin/env bash

# to be run in root
yarn run generate-client
npx tsx ./prisma/data-migrations/migrate-users.ts
npx tsx ./prisma/data-migrations/migrate-programs.ts
npx tsx ./prisma/data-migrations/migrate-program-descriptions.ts
npx tsx ./prisma/data-migrations/migrate-add-intermediate.ts
npx tsx ./prisma/data-migrations/migrate-add-advanced1.ts
npx tsx ./prisma/data-migrations/migrate-add-beginner2.ts
npx tsx ./prisma/data-migrations/migrate-add-beginner3.ts