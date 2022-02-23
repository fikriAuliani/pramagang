/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {               //untuk membuat relasi
    pgm.createTable('notes', {
        id: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        name: {
            type: 'TEXT',
            notNull: true,
        }
    });
};  

exports.down = pgm => {             //drop database
    pgm.dropTable('users');
};  
