const config= {
    appConfig:
    {
        host : 'http://localhost',
        port : '3001',
        ruta : 'https://web-production-eeb4.up.railway.app/'

    },
    dbConfig:
    {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dbName: process.env.DB_NAME

    }
}

module.exports = config