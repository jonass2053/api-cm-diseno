const config= {
    appConfig:
    {
        host : 'http://localhost',
        port : '3001',

    },
    dbConfig:
    {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dbName: process.env.DB_NAME

    }
}

module.exports = config