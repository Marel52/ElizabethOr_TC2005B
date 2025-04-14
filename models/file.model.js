const db = require('../util/database');

module.exports = class File {
    constructor(originalName, filename, path, mimetype, size, userId) {
        this.originalName = originalName;
        this.filename = filename;
        this.path = path;
        this.mimetype = mimetype;
        this.size = size;
        this.userId = userId || null;
    }

    save() {
        return db.execute(
            'INSERT INTO files (original_name, filename, path, mimetype, size, user_id) VALUES (?, ?, ?, ?, ?, ?)',
            [this.originalName, this.filename, this.path, this.mimetype, this.size, this.userId]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM files ORDER BY upload_date DESC');
    }

    static fetchByUser(userId) {
        return db.execute('SELECT * FROM files WHERE user_id = ? ORDER BY upload_date DESC', [userId]);
    }

    static findById(fileId) {
        return db.execute('SELECT * FROM files WHERE id = ?', [fileId]);
    }

    static deleteById(fileId) {
        return db.execute('DELETE FROM files WHERE id = ?', [fileId]);
    }
}