## Development Notes:

- Use `yarn` for package management

<details>
<summary><h3>To run in development (click to see more)</h3></summary>

1. `yarn install`
2. Setup `.env.local` per `.env.local.example`
3. `yarn generate-client`
4. `yarn docker:dev`
5. `yarn migrate:dev`
6. `yarn migrate:data`
7. Go to `http://localhost:3000/`
8. `yarn docker:dev-stop` to stop containers

</details>

### Figma:

- [Here](https://www.figma.com/file/o6hY8o9AzbYe5jtQ11tQga/Untitled?type=design&node-id=0%3A1&mode=design&t=OprzFzjgrOzk9cpn-1)

### What to do when you update the prisma schema:

1. Run `yarn migrate:dev --name '{{commit name here}}'` creates a migration file
2. Run `yarn generate-client` re-generate api client
3. Restart containers

### To add users (for now):

1. Add user in Auth0 Dashboard
2. Run `yarn migrate:data` to sync auth0 user database with your `local` (or `TST`)

### Generate ERD:

- Will automatically generate when generating prisma client
- Disable generation with env variable `DISABLE_ERD=true`

### Resetting DB:

- `yarn prisma migrate reset`
- `yarn migrate:data` (make sure `AUTH0_TMP_API_TOKEN` is defined/fresh)

<details>
<summary><h3>Testing (click to see more)</h3></summary>

- Three different environments, `unit`, `integration`, `e2e`
- Separate `.env.test` env file and `test-db` docker service
- Make sure when setting up the test env files not to target your local db/any live dbs
- make sure to install playwright `npx playwright install` (should also install the browsers)
- To test the whole app use run `yarn test:all`

#### Unit

- To run only unit tests run `yarn test:unit`
- Use the `--run` flag after to run once (default is `watch` mode)

#### Integration

- To run only integration tests run `yarn test:int`
- To run in `watch` mode use the `-w` flag
- Note it skips the user migration with the `-t` flag (already defined in the npm script) but the test setup will add a dummy user
- It will start a `test-db` container and run data migrations

#### E2E

- To run e2e tests run `yarn test:e2e`
- With head (e.g. browsers popup) use the `-h` flag
- To generate reports use the `-r` flag
- Note: it is running 1 at a time (not parallel) because of the way nextauth/nextjs bugs out when multiple logins happen concurrently (hitting localhost)... will probably need to setup multiple test accounts or look into other solutions like saving authentication (which may still need multiple accounts)
- Debug tests with `npx playwright test {{test file}} --project={{specific browser if interested}} --debug` - or `npx playwright test --ui` - Resources: - https://playwright.dev/docs/debug#stepping-through-your-tests - https://playwright.dev/docs/running-tests
</details>

### Running Github Actions Locally

- https://github.com/nektos/act
- Workaround for `no space left on device` is `docker volume prune --force`

<details>
<summary><h3>Scripts (<code>.sh</code>, click to see more)</h3></summary>

#### `migrate.sh (yarn migrate:data)`

> Migrates static data and users from auth0 user database (if enabled)

- Use `-s` flag to skip options, comma-separated no space
- The only option available right now is `users`
- To add another option see how the `users` option is done in the script

e.g. `yarn migrate:data -s users`

#### `test_integration.sh (yarn test:int)`

> Builds and runs a dummy test db in docker, runs integration tests via `vitest` and then tears it down when done

- Use the `-w` flag to enter `watch mode`

#### `test_e2e.sh (yarn test:e2e)`

> Builds and runs a test-db in docker, runs e2e tests via `playwright` and then tears down when complete

- Use the `-h` option to turn on headed mode (see the browsers open) or `yarn test:e2e:headed`

#### `test_all.sh (yarn test:all)`

> Runs all unit, integration and e2e tests, basically runs the specific test commands sequentially

#### `setup_db.sh`

> Loads envs into the shell and sets up the test database

- Useful to run separately for debugging tests

Example usage: Running the nextjs app with test envs and the test database

```
export NODE_ENV=true && yarn dev (run the nextjs app in test mode using .env.test envs)
bash ./scripts/setup_db.sh
```

#### `wait_for_it.sh`

> pauses script

- See https://github.com/vishnubob/wait-for-it

</details>

### Infrastructure

- `Auth0` managed with terraform (view read me in `/terraform` for more info)
- For now when making infrastructure changes, need to manually call `terraform plan` and `terraform approve` to apply changes to `TST` (maybe automate this later)

### Adding Data (to migrations)

1. Run `yarn migrate:create`
   - This will create a new `.ts` file located in `prisma/data-migrations` for you to add the logic to
   - Also appends the file run command to `migrate.sh`

## Learning Resources

Testing:

- [Prisma Ultimate Testing Guide](https://www.prisma.io/blog/testing-series-1-8eRB5p0Y8o)
- [Vitest Guide](https://vitest.dev/guide/)
