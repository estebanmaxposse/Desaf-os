const path = require('path');

const options = {
    mysql: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'myDB'
        }
    },
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: path.join(__dirname, '../database', 'chatDB.sqlite')
        },
        useNullAsDefault: true
    }
}

module.exports = { options }