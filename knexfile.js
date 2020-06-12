const path = require('path'); 

module.exports = 
{
    // knex não suporta o ES6 o export default



    //     client: 'sqlite3',
    //     connection: 
    //     {
    //         filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
    //     },
    //     migrations: 
    //     {
    //         directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    //     },
    //     seeds: 
    //     {
    //         directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    //     },
    //     useNullAsDefault: true,


        client: 'pg',
        version: '7.4.3',
        connection: {
            host : 'ec2-54-86-170-8.compute-1.amazonaws.com',
            port: 5432,
            user : 'lqoshnvsprcddc',
            password : '99f9dacc3b83d9d82a38fce7f70ab3f26f8827b7b059c5c3c1e7d9b05cef9ae4',
            database : 'dffujdqjf7acc2',
            debug: false,
            ssl: true,
            rejectUnauthorized: false
        },
        useNullAsDefault: true,
        pool: {
          min: 2,
          max: 10
        },
        migrations: 
        {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations')
        },
        seeds: 
        {
            directory: path.resolve(__dirname, 'src', 'database', 'seeds')
        },
      
};