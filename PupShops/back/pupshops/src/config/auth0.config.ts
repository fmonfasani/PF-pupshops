import {config as dotenvconfig} from 'dotenv'

dotenvconfig({path:'.env.development'})

export const config = {
    authRequired: false,
    auth0Logout: true,
    secret:process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_API_AUDIENCE,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_DOMAIN
  };

