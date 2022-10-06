// requires
const { Client } = require('pg');

const {
    user,
    host,
    database,
    password,
    port
} = require('../settings.js');

exports.getMovies = (paramsObject) => {
    const { id } = paramsObject;

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
        console.log('models/getMovies - error:', err);
        db.end();

        result.err = err;

        return result;
    };

    const executeQuery = () => {
        let getJustOneUserClause = '';

        if (id) {
            getJustOneUserClause = ` WHERE id = ${id}`;
        }

        const query = `
            SELECT 
                * 
            FROM 
                Movies_VG
            ${getJustOneUserClause}
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