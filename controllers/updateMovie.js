// Requires model
const updateMovieModel = require('../models/updateMovie.js').updateMovie;

async function putMovie(req, res, next) {
    const objReturn = {
        data: null,
        error: null
    }

    if (!req.body) {
        console.log("controllers/updateMovie - missing req.body");
        objReturn.error = "missing req.body";
        controllerReturn(objReturn, res);
        return;
    }

    if (!req.params?.id) {
        console.log("controllers/updateMovie - missing req.params.id");
        objReturn.error = "missing req.params.id";
        controllerReturn(objReturn, res);
        return;
    }

    const {
        name,
        is_on_nextflix,
        imdb_score,
        director,
        genre
    } = req.body;

    if (name && (typeof name != 'string')) {
        console.log("controllers/updateMovie - missing req.name or wrong format");
        objReturn.error = "missing req.name or wrong format";
        controllerReturn(objReturn, res);
        return;
    }

    if (is_on_nextflix && (typeof is_on_nextflix != 'boolean')) {
        console.log("controllers/updateMovie - missing req.is_on_nextflix or wrong format");
        objReturn.error = "missing req.is_on_nextflix or wrong format";
        controllerReturn(objReturn, res);
        return;
    }

    if (imdb_score && (typeof imdb_score != 'number')) {
        console.log("controllers/updateMovie - missing req.imdb_score or wrong format");
        objReturn.error = "missing req.imdb_score or wrong format";
        controllerReturn(objReturn, res);
        return;
    }

    if (director && (typeof director != 'string')) {
        console.log("controllers/updateMovie - missing req.director or wrong format");
        objReturn.error = "missing req.director or wrong format";
        controllerReturn(objReturn, res);
        return;
    }

    if (genre && (typeof genre != 'string')) {
        console.log("controllers/updateMovie - missing req.genre or wrong format");
        objReturn.error = "missing req.genre or wrong format";
        controllerReturn(objReturn, res);
        return;
    }

    const updateParams = {
        id: req.params.id,
        name,
        is_on_nextflix,
        imdb_score,
        director,
        genre
    };

    const updateMovieRes = await updateMovieModel(updateParams);

    if (updateMovieRes.err || !updateMovieRes.data?.length) {
        objReturn.error = updateMovieRes.err || 'NO RESPONSE FROM updateMovie model';
        controllerReturn(objReturn, res);
        return;
    }

    objReturn.data = updateMovieRes.data;
    controllerReturn(objReturn, res);
};

function controllerReturn(objReturn, res) {
    const { error, data } = objReturn;

    if (error || !data) {
        res.status(406).send(objReturn);
        return;
    }

    res.status(201).send(objReturn);
}

exports.putMovie = putMovie;