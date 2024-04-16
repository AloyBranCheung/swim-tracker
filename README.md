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
2. Run `yarn migrate:data` to sync auth0 user database with your `local` (or `TST`)

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
- to test the whole app use run `yarn test:all`

  #### Unit

  - to run only unit tests run `yarn test:unit`
  - use the `--run` flag after to run once (default is `watch` mode)

  #### Integration

  - to run only integration tests run `yarn test:int`
  - to run in `watch` mode use the `-w` flag
  - note it skips the user migration with the `-t` flag (already defined in the npm script) but the test setup will add a dummy user
  - it will start a `test-db` container and run data migrations

  #### E2E

  - to run e2e tests run `yarn test:e2e`
  - with head (e.g. browsers popup) use the `-h` flag
  - to generate reports use the `-r` flag
  - note: it is running 1 at a time (not parallel) because of the way nextauth/nextjs bugs out when multiple logins happen concurrently (hitting localhost)... will probably need to setup multiple test accounts or look into other solutions like saving authentication (which may still need multiple accounts)
  - debug tests with `npx playwright test {{test file}} --project={{specific browser if interested}} --debug`
    - or `npx playwright test --ui`
    - Resources:
      - https://playwright.dev/docs/debug#stepping-through-your-tests
      - https://playwright.dev/docs/running-tests

### Running Github Actions Locally

- https://github.com/nektos/act
- Workaround for `no space left on device` is `docker volume prune --force`

### Infrastructure

- `Auth0` managed with terraform (view read me in `/terraform` for more info)
- For now when making infrastructure changes, need to manually call `terraform plan` and `terraform approve` to apply changes to `TST` (maybe automate this later)

## Learning Resources

Testing:

- [Prisma Ultimate Testing Guide](https://www.prisma.io/blog/testing-series-1-8eRB5p0Y8o)
- [Vitest Guide](https://vitest.dev/guide/)
