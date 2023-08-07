import DataURIParser from "datauri/parser"
const path = require("path");
const getDatAUri = (file) => {
    const parser = new DataURIParser();
    const extName = path.extname(file?.originalname).toString();
    return parser.format(extName, file?.buffer);
}

export default getDatAUri;