const db = require('../util/database');
const bcrypt = require('bcrypt');

module.exports = class User {

    constructor(name, password) {
        this.name = name;
        this.password = password;
    }

    
    async save() {
        try {
            
            const hashedPassword = await bcrypt.hash(this.password, 12);
            
            return await db.execute(
                'INSERT INTO users (name, password) VALUES (?, ?)',
                [this.name, hashedPassword]
            );
        } catch (error) {
            throw error;
        }
    }

    static findByName(name) {
        return db.execute('SELECT * FROM users WHERE name = ?', [name]);
    }

    static findById(userId) {
        return db.execute('SELECT * FROM users WHERE id = ?', [userId]);
    }


    static async verifyPassword(password, hashedPassword) {
        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch (error) {
            throw error;
        }
    }
}