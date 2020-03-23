
exports.up = function (knex) {
    return knex.schema.createTable('posts', tbl => {
        tbl.increments();
        tbl.text('text', 255)
            .notNullable()
        
        tbl.text('meaningE', 255);
        tbl.text('meaningV', 255);
        tbl.text('exampleE', 255);
        tbl.text('exampleV', 255);
        tbl.text('sourceUrl', 255);


        tbl.integer('userid')
            .unsigned()
            .index()
            .references('id')
            .inTable('users')
            .notNullable();

        tbl.timestamp('created_at').defaultTo(knex.fn.now());
        tbl.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function (knex) {

    return knex.schema.dropTable('posts')
};
