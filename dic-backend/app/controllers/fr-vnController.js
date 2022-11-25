const apiError = require("../apiError");
const FraWordService = require("../services/fr-vnService");
const MongoDB = require("../utils/mongodbUtils");

// Create and save a new Word
exports.create = async (req, res, next) => {
    if (!req.body?.Français) {
        return next(new apiError(400, "Word can not be empty"));
    }
    try {
        const wordService = new FraWordService(MongoDB.client);
        const document = await wordService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new apiError(500, " An error occurred while creating the Word")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const wordService = new FraWordService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await wordService.findByName(name);
        } else {
            documents = await wordService.find({});
        }
    } catch (error) {
        return next(
            new apiError(500, "An error occurred while retrieving Words")
        );
    }
    return res.send(documents);
};


exports.findOne = async (req, res, next) => {
    try {
        const wordService = new FraWordService(MongoDB.client);
        const document = await wordService.findById(req.params.id);
        if (!document) {
            return next(
                new apiError(404, "Word not found")
            );
        }
        return res.send(document);
    } catch (error) {
        return next(
            new apiError(500, `Error retrieving word with id = ${req.params.id}`)
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(
            new apiError(400, "Date to update can not be empty")
        );
    }
    try {
        const wordService = new FraWordService(MongoDB.client);
        const document = await wordService.update(req.params.id, req.body);
        if (!document) {
            return next(
                new apiError(404, "Word not found")
            );
        }
        return res.send({ message: "Word was updated successfully" });
    } catch (error) {
        return next(
            new apiError(500, `Error updating word with id = ${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const wordService = new FraWordService(MongoDB.client);
        const document = await wordService.delete(req.params.id);
        if (!document) {
            return next(
                new apiError(404, "Word not found")
            );
        }
        return res.send({ message: "Word was deleted successfully" });
    } catch (error) {
        return next(
            new apiError(500, `Could not deleted with id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const wordService = new FraWordService(MongoDB.client);
        const deleteCount = await wordService.deleteAll();
        return res.send({
            message: `${deleteCount} Words were deleted successfully`,
        });
    } catch (error) {
        return next(
            new apiError(500, "An error occurred while remove all Words")
        );
    }
};
