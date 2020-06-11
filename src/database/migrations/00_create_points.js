const knex = require('knex');

// Criar a tabela
exports.up = async function up(knex) {
    return knex.schema.createTable('collect_points', table => 
    {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('telephone').notNullable();
        table.string('cellphone').notNullable();
        table.string('UF', 2).notNullable();
        table.string('city').notNullable();
        table.string('street').notNullable();
        table.string('zip_code').notNullable();
        table.integer('addressNumber').notNullable();
        table.string('neighborhood').notNullable();
        table.decimal('longitude').notNullable();
        table.decimal('latitude').notNullable();
    });
}

// Voltar trás (remover tabela)
exports.down = async function down(knex) {
    return knex.schema.dropTable('collect_points');
}