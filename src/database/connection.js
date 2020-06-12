const knex = require('knex');
const path = require('path');

const connection = knex(
    {
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
    }
);


// const connection = knex(
//     {
//         client: 'sqlite3',
//         connection: 
//         {
//             filename: path.resolve(__dirname, 'database.sqlite'), // __dirname var globalsempre retona o caminho do arquivo que esta executanto ele
//         },
//         useNullAsDefault: true,
//     }
// );

// Criar entidades da aplicação

// Entidade collect_points: pontos de colete
// Item coletados collected_items: pilhas, eletronicos
// pum item podem ser coletados de váris pontos então e uma relação many-to-many (n-n) (poin itens)
// point_items:  enteidade para relacionar os pontos de cotas com os itens que ele coleta 
 // collect_point_id  e item_collected_id

 // Migration do knex é o historico do banco de dados

module.exports = connection;
