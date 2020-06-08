const knex = require('knex');

// Criar a tabela
exports.up = async function up(knex) {
    return knex.schema.createTable('collected_items', table => 
    {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    });
}

// Voltar trás (remover tabela)
exports.down = async function down(knex) {
    return knex.schema.dropTable('collected_items');
}