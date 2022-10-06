// Requires model
const getMoviesModel = require('../models/getMovies.js').getMovies;

async function getMovies(req, res, next) {
    const objReturn = {
        data: null,
        error: null
    }

    let modelParams = {}

    if (req?.params?.id) {
        modelParams.id = req.params.id;
    }

    const getMoviesRes = await getMoviesModel(modelParams);

    if (getMoviesRes.err || !getMoviesRes.data?.length) {
        objReturn.error = getMoviesRes.err || 'NO RESPONSE FROM getMovies model';
        controllerReturn(objReturn, res);
        return;
    }

    objReturn.data = getMoviesRes.data;
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

exports.getMovies = getMovies;