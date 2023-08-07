import multer from "multer";

/**muler create the memory storage for uploading the images */

const storage = multer.memoryStorage();
const singleUpload = multer({storage}).single("file");

export default singleUpload;