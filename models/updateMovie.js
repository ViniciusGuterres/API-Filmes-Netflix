// requires
const { Client } = require('pg');

const {
    user,
    host,
    database,
    password,
    port
} = require('../settings.js');

exports.updateMovie = (paramsObject) => {
    const {
        name,
        is_on_nextflix,
        imdb_score,
        director,
        genre,
        id
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
        console.log('models/updateMovie - error:', err);
        db.end();

        result.err = err;

        return result;
    };

    const executeQuery = () => {
        let setName = '';
        let setIsOnNextflix = '';
        let setImdbScore = '';
        let setDirector = '';
        let setGenre = '';

        if (name) {
            let shouldPutComma = false;

            if (
                is_on_nextflix ||
                imdb_score ||
                director ||
                genre
            ) {
                shouldPutComma = true;
            }

            setName = ` name = '${name}' ${shouldPutComma ? ',' : ''}`;
        }

        if (is_on_nextflix) {
            let shouldPutComma = false;

            if (
                imdb_score ||
                director ||
                genre
            ) {
                shouldPutComma = true;
            }

            setIsOnNextflix = ` is_on_nextflix = '${is_on_nextflix}' ${shouldPutComma ? ',' : ''}`;
        }

        if (imdb_score) {
            let shouldPutComma = false;

            if (director || genre) {
                shouldPutComma = true;
            }

            setImdbScore = ` imdb_score = ${imdb_score} ${shouldPutComma ? ',' : ''}`;
        }

        if (director) {
            let shouldPutComma = false;

            if (genre) {
                shouldPutComma = true;
            }

            setDirector = ` director = '${director}' ${shouldPutComma ? ',' : ''}`;
        }

        if (genre) {
            setGenre = ` genre = '${genre}' `;
        }

        const query = `
        UPDATE
            Movies_vg 
        SET 
            ${setName}
            ${setIsOnNextflix}
            ${setImdbScore}
            ${setDirector}
            ${setGenre}
        WHERE 
            id = ${id}
        RETURNING id;
        `;

        const succesful = (data) => {
            db.end();

            result.data = data.rows;
            console.log("🚀 ~ file: updateMovie.js ~ line 65 ~ succesful ~ result", result)
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