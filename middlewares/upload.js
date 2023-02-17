//dependencies
const multer = require("multer");

//send the file to a location on the server and give a unique name (timestamp-sequences-originalFilename.csv)
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-sequences-${file.originalname}`);
  },
});

//function to upload the file
//var uploadFile = multer({ storage: storage, fileFilter: csvFilter });
var uploadFile = multer({ storage: storage});

module.exports = uploadFile;