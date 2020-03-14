
exports.up = function (knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.text('username', 128)
            .unique()
            .notNullable()
        tbl.text('role', 128)
            .notNullable();
        tbl.text('password', 255)
            .unique()
            .notNullable();

        tbl.timestamp('created_at').defaultTo(knex.fn.now());
        tbl.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function (knex) {

    return knex.schema.dropTable('users')
};
