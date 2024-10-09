var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'sao_db'
    }
});

knex.raw("SELECT 1").then(() => {
    console.log("Database connected");
}).catch((e) => {
    console.log("Database Not connected");
    console.error(e);
});

module.exports.knex = knex;

// Close the database connection when your application shuts down
process.on('SIGINT', () => {
    knex.destroy().then(() => {
        console.log('Database connection closed');
        process.exit();
    });
});
module.exports.knex = knex;