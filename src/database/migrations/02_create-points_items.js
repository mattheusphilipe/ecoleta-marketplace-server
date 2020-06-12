const knex = require('knex');

// Criar a tabela
exports.up = async function up(knex) {
    return knex.schema.createTable('point_collected_items', table => 
    {
        table.increments('id').primary();
        table.integer('collect_point_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('collect_points');
    
        table.integer('collected_item_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('collected_items');
    });
}

// Voltar trás (remover tabela)
exports.down = async function down(knex) {
    return knex.schema.dropTable('point_collected_items');
}