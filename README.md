Development Notes:

- Use `yarn` for package management

To run in development:

1. `yarn install`
2. Setup `.env.local` per `.env.local.example`
3. `yarn generate-client`
4. `yarn docker:dev`
5. Go to `http://localhost:3000/`
6. `yarn migrate:dev`
6. `yarn docker:dev-stop` to stop containers

What to do when you update the prisma schema:
1. Run `yarn migrate:dev {commit name here}` creates a migration file 
2. Run `yarn generate-client` re-generate api client
3. Restart containers

To add users (for now):
1. Add in Auth0 Dashboard
2. Run `yarn migrate:data`
