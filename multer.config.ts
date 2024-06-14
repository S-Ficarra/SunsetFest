const multer = require('multer')

export const multerConfig = {
  storage: multer.memoryStorage(),
};