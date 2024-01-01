const parse = (req, res, next) => {
    for (let field in req.body) {
        try {
            req.body[field] = JSON.parse(req.body[field]);
        } catch (error) {
        }
    }

    next();
}

module.exports = parse;