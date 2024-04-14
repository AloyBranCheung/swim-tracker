## Development Notes:

- Use `yarn` for package management

### Figma:

https://www.figma.com/file/o6hY8o9AzbYe5jtQ11tQga/Untitled?type=design&node-id=0%3A1&mode=design&t=OprzFzjgrOzk9cpn-1

### To run in development:

1. `yarn install`
2. Setup `.env.local` per `.env.local.example`
3. `yarn generate-client`
4. `yarn docker:dev`
5. Go to `http://localhost:3000/`
6. `yarn migrate:dev`
7. `yarn migrate:data`
8. `yarn docker:dev-stop` to stop containers

### What to do when you update the prisma schema:

1. Run `yarn migrate:dev --name '{{commit name here}}'` creates a migration file
2. Run `yarn generate-client` re-generate api client
3. Restart containers

### To add users (for now):

1. Add user in Auth0 Dashboard
2. Get 24h `AUTH0_TMP_API_TOKEN` from `Application` > `APIs` > `Auth0 Management API` > `API Explorer` > copy the `Token`
3. Run `yarn migrate:data`

### Generate ERD:

- will automatically generate when generating prisma client
- disable generation with env variable `DISABLE_ERD=true`

### Resetting DB:

- `yarn prisma migrate reset`
- `yarn migrate:data` (make sure `AUTH0_TMP_API_TOKEN` is defined/fresh)

### Testing:

- Three different environments, `unit`, `integration`, `e2e`
- separate `.env.test` env file and `test-db` docker service
- make sure when setting up the test env files not to target your local db/any live dbs

  #### Unit

  - to run only unit tests run `yarn test:unit`
  - use the `--run` flag after to run once (default is `watch` mode)

  #### Integration

  - to run only integration tests run `yarn test:int`
  - to run in `watch` mode use the `-w` flag
  - note it skips the user migration with the `-t` flag (already defined in the npm script) but the test setup will add a dummy user
  - it will start a `test-db` container and run data migrations

  #### E2E

  - wip

## Learning Resources

Testing:

- [Prisma Ultimate Testing Guide](https://www.prisma.io/blog/testing-series-1-8eRB5p0Y8o)
- [Vitest Guide](https://vitest.dev/guide/)
