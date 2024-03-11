Development Notes:

- Use `yarn` for package management

To run in development:

1. `yarn install`
2. Setup `.env.local` per `.env.local.example`
3. `yarn docker:dev`
4. Go to `http://localhost:3000/`
5. `yarn docker:dev-stop` to stop containers

What to do when you update the prisma schema:
1. Run `yarn migrate:dev {commit name here}` creates a migration file 
2. Run `yarn generate-client` re-generate api client
3. Restart containers

TODO:

- [ ] Setup Supabase
- [ ] Setup Deployed/TST environment
