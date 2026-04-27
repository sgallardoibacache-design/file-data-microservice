require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const upload = multer({ dest: 'uploads/' });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.any(), function (req, res) {
  const file = req.files && req.files[0];

  if (!file) {
    return res.status(400).json({
      error: 'No file uploaded'
    });
  }

  return res.status(200).json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});