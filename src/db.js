const { Pool } = require('pg');

const pool = new Pool({
    user: 'eduardoleal',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'taskdb'
});

module.exports = pool;