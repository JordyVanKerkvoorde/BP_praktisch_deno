// export default {
//     api: {
//         port: process.env.PORT || 3000
//     },
//     database: {
//         driver: process.env.DB_DRIVER || 'mysql',
//         username: process.env.DB_USER || 'root',
//         password: process.env.DB_PASSWORD || 'root',
//         host: process.env.DB_HOST || '127.0.0.1',
//         port: process.env.DB_PORT || 3306,
//         dbname: process.env.DB_NAME || 'bp-praktisch',
//         charset: 'utf8',
//         collate: 'utf8_general_ci',
//     },
//     log: {
//         sequelize: true
//     },
//     jwt: {
//         secret: process.env.JWT_SECRET || 'YoUsHoUlDrEaLlYsEtAvAriAbLeFoRtHiS458748413$$^45.'
//     }
// }
export default {
    api: {
        port: 3001
    },
    database: {
        driver: 'mysql',
        username: 'root',
        password: 'root',
        host: '127.0.0.1',
        port: 3306,
        dbname: 'bp-praktisch',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    },
    log: {
        sequelize: true
    },
    jwt: {
        secret: 'YoUsHoUlDrEaLlYsEtAvAriAbLeFoRtHiS458748413$$^45.'
    }
}