const multer = require("multer");
const path = require ('path');

// ------------config de l'import des images-------------//
// const MIME_TYPES = {
//   "image/jpg": "jpg",
//   "image/jpeg": "jpg",
//   "image/png": "png",
// };

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
      callback(null, new Date().getTime()+path.extname(file.originalname));
    // const name = file.originalname.split(" ").join("_");
    // const extension = MIME_TYPES[file.mimetype];
    // callback(null, name + Date.now() + "." + extension);
  },
});

const fileFilter = (req, file, callback)=>{
    if(file.mimetype === 'image/jpeg'||file.mimetype==='image/png'||file.mimetype==='image/jpg'){
        callback(null, true);

    }else{
        callback(new Error('Unsupported files'), false)
    }
}

const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*10
    },
    fileFilter:fileFilter
})

module.exports = {upload:upload};
