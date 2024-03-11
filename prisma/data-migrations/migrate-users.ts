/** 
migrate users from auth0-db to own db (since it will only be the 4 of us) if
more users will be joining will need some kind of lifecycle to add users to our
own user table with an auth0id column for now will need to manually trigger this
script 
*/
require('dotenv').config({ path: '.env.local' });
const axios = require('axios');
const { PrismaClient } = require('@prisma/client')
const logger = require('pino')();

const prisma = new PrismaClient();

const options = {
    method: 'GET',
    url: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`,
    params: { search_engine: 'v3' },
    headers: { authorization: `Bearer ${process.env.AUTH0_TMP_API_TOKEN}` }
};

const main = async () => {
    try {
        logger.info('Querying Auth0 User DB...')
        const res = await axios.request(options)
        const users = res.data.map((usr: Record<string, string>) => ({ name: usr.name, email: usr.email, auth0Id: usr.user_id }))
        logger.info('Adding Users to DB...')
        await prisma.user.createMany({
            data: users,
            skipDuplicates: true
        })
        logger.info('Done!')
    } catch (error) {
        logger.error('Something went wrong! Log below: \n')
        logger.error(error);
    }
}
main()
