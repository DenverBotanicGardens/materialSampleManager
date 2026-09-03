//dependencies
const multer = require("multer");
const path = require("path");

//send the file to a location on the server and give a unique name (timestamp-sequences-originalFilename.csv)
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    // strip any path info from the original filename so it can't escape the uploads directory
    const safeOriginalName = path.basename(file.originalname);
    console.log(safeOriginalName);
    cb(null, `${Date.now()}-materialSamples-${safeOriginalName}`);
  },
});

//only accept CSV files
const csvFilter = (req, file, cb) => {
  const allowedExtensions = /\.csv$/i;
  const allowedMimeTypes = [
    "text/csv",
    "application/vnd.ms-excel", // some browsers/OSes report CSVs with this mimetype
    "application/csv",
    "text/plain" // some browsers report CSVs as plain text
  ];

  const hasValidExtension = allowedExtensions.test(path.extname(file.originalname));
  const hasValidMimeType = allowedMimeTypes.includes(file.mimetype);

  if (hasValidExtension && hasValidMimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only .csv files are allowed"));
  }
};

//function to upload the file
var uploadFile = multer({
  storage: storage,
  fileFilter: csvFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB — plenty for a materials CSV, adjust if needed
  }
});

module.exports = uploadFile;