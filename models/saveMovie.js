// requires
const { Client } = require('pg');

const {
    user,
    host,
    database,
    password,
    port
} = require('../settings.js');

exports.saveMovie = (paramsObject) => {
    const {
        name,
        is_on_nextflix,
        imdb_score,
        director,
        genre
    } = paramsObject;

    const db = new Client({
        user,
        host,
        database,
        password,
        port
    });

    const result = {
        err: null,
        data: null
    };

    const error = (err) => {
        console.log('models/saveMovie - error:', err);
        db.end();

        result.err = err;

        return result;
    };

    const executeQuery = () => {
        const query = `
            INSERT INTO Movies_VG (name, is_on_nextflix, imdb_score, director, genre)
            VALUES ('${name}', '${is_on_nextflix}', ${imdb_score || null}, '${director}', '${genre}') RETURNING id;
        `;

        const succesful = (data) => {
            db.end();

            result.data = data.rows;
            return result;
        };

        return db.query(query)
            .then(succesful)
            .catch(error)
    };

    return db.connect()
        .then(executeQuery)
        .catch(error)
}