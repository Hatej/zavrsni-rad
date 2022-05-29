import multer from "multer";
import { nanoid } from "nanoid"; 

const post_storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './resources/images/')
  },
  filename: function(req, file, cb) {
    cb(null, nanoid() + "." + file.originalname.split('.').pop());
  }
})

const pfp_storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './resources/profile_pictures/')
    },
    filename: function(req, file, cb) {
      cb(null, nanoid() + "." + file.originalname.split('.').pop());
    }
})

const background_storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './resources/background_pictures/')
    },
    filename: function(req, file, cb) {
      cb(null, nanoid() + "." + file.originalname.split('.').pop());
    }
}) 

export const post_upload = multer({ storage: post_storage });
export const pfp_upload = multer({ storage: pfp_storage });
export const background_upload = multer({ storage: background_storage });