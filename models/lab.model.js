const db = require('../util/database');

module.exports = class Lab {
    constructor(id, title, description, filename) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.filename = filename;
    }

    save() {
        return db.execute(
            'INSERT INTO labs (title, description, filename) VALUES (?, ?, ?)',
            [this.title, this.description, this.filename]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM labs ORDER BY id');
    }

    static findById(id) {
        return db.execute('SELECT * FROM labs WHERE id = ?', [id]);
    }

}