import dotenv from 'dotenv'
dotenv.config()

const config = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/example',
    ACCESS_TOKEN: process.env.ACCESS_TOKEN || 'qwibu87ewbot4t8oebgw4',
    REFRESH_TOKEN: process.env.REFRESH_TOKEN || '3g8ip32t794tbgou4gt80',
    MAX_AGE_ACCESS_TOKEN: process.env.MAX_AGE_ACCESS_TOKEN || '15m',
    MAX_AGE_REFRESH_TOKEN: process.env.MAX_AGE_REFRESH_TOKEN || '1d',
    CLOUD_NAME: process.env.CLOUD_NAME || 'dr00ghniy',
    API_KEY: process.env.API_KEY || '138873996657346',
    API_SECRET: process.env.API_SECRET || 'L1yxlaDxo0WGMSO_6O0sQWXBlBk'
}

export default config