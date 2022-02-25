require('dotenv').config();
const express = require("express");
const app = express()

const bodyParser = require('body-parser');
const notesRoute = require('./src/notes/routes'); 
const multer = require('multer');

const port = process.env.PORT
const host = process.env.HOST

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(notesRoute);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname )
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimeType == 'image/jpg' || file.mimeType == 'image/jpeg' || file.mimeType == 'image/JPG'|| file.mimeType == 'image/png') {
    cb(null, true);
  } else {
    cb(null, false) ;
    return cb(new Error('file ekstensi tidak sesuai'))
  }

  // const condition = ['image/jpeg', 'image/png', 'image/jpeg', 'image/JPG']
  // if (condition.includes(file.mimeType)) {
  //   cb(null, true);
  // } else {
  //   cb(null, false); 
  //   cb(new RangeError('Only .png, .jpg and .jpeg format allowed!'))
  // }

}

app.use(multer({
  storage: fileStorage,
  fileFilter: fileFilter
}).single('image'));


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/uploads', (req, res) => {
  if(!req.file) {
    res.json({
      status: 'fail',
      message: 'file tidak boleh kosong'
    });
  } else {
    // const image = req.file.path;
    const image = req.file;
    res.json({
      status: 'success',
      data: image
    })
  }
});

app.listen(port, () => {
  console.log(`Example app listening on http://${host}:${port}`)
});