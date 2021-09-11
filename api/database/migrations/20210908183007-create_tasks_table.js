const { schema, id, text, integer, foreign, timestamps, timestamp } = require('@formidablejs/schema-builder');

exports.up = (db) => {
	return db.createTable('tasks', schema([
		id(),
		foreign('user_id').references('id').on('users').onDelete('cascade'),
		text('description'),
		timestamp('completed_at').nullable(),
		timestamps(),
	]));
};

exports.down = (db) => db.dropTable('tasks');

let dbm, type, seed;

exports.setup = (options, seedLink) => {
	dbm = options.dbmigrate;
	type = dbm.dataType;
	seed = seedLink;
};

exports._meta = {
	version: 1
};
