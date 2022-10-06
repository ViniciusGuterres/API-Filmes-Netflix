// Requires model
const deleteMovieModel = require('../models/deleteMovie.js').deleteMovie;

async function deleteMovie(req, res, next) {
    const objReturn = {
        data: null,
        error: null
    }

    if (!req.params) {
        console.log("controllers/deleteMovie - missing req.params");
        objReturn.error = "missing req.params";
        controllerReturn(objReturn, res);
        return;
    }

    const { id } = req.params;

    if (!id) {
        console.log("controllers/deleteMovie - missing req.id");
        objReturn.error = "missing req.id";
        controllerReturn(objReturn, res);
        return;
    }

    const deleteMovieRes = await deleteMovieModel({ id });

    if (deleteMovieRes.err || !deleteMovieRes.data?.length) {
        objReturn.error = deleteMovieRes.err || 'NO RESPONSE FROM deleteMovie model';
        controllerReturn(objReturn, res);
        return;
    }

    objReturn.data = deleteMovieRes.data;
    controllerReturn(objReturn, res);
};

function controllerReturn(objReturn, res) {
    const { error, data } = objReturn;

    if (error || !data.length) {
        res.status(406).send(objReturn);
        return;
    }

    res.status(201).send(objReturn);
}

exports.deleteMovie = deleteMovie;