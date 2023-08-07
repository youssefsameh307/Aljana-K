// utils/bodyParserMiddleware.js

import bodyParser from 'body-parser';

const jsonBodyParser = bodyParser.json({ limit: '10mb' });

export default function bodyParserMiddleware(req, res, next) {
  jsonBodyParser(req, res, (error) => {
    if (error) {
      next(error);
    } else {
      next();
    }
  });
}
