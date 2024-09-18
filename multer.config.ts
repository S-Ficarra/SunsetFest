
const multer = require('multer')
import { StorageEngine } from 'multer';
import path = require('path');
import { Request } from 'express';

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/');
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueName = file.originalname;
    cb(null, uniqueName);
  }
});

// Export the Multer configuration
export const multerConfig = {
  storage: storage,
};
