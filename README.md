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
7. `yarn docker:dev-stop` to stop containers

### What to do when you update the prisma schema:

1. Run `yarn migrate:dev {commit name here}` creates a migration file
2. Run `yarn generate-client` re-generate api client
3. Restart containers

### To add users (for now):

1. Add in Auth0 Dashboard
2. Run `yarn migrate:data`

### Generate ERD:

- will automatically generate when generating prisma client
- disable with env variable `DISABLE_ERD=true`

### Resetting DB:

- `yarn prisma migrate reset`
- `yarn migrate:data`

### Testing:

- Three different environments, `unit`, `integration`, `e2e`
- separate `.env.test` env file and `test-db` docker service
- make sure when setting up the test env files not to target your local db/any live dbs

## Learning Resources

Testing:

- https://www.prisma.io/blog/testing-series-1-8eRB5p0Y8o
