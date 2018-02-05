var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');

mongoose.connect('mongodb://kdreagle:dewitt@ds149603.mlab.com:49603/reagle-gallery', {useMongoClient: true});

var gallerySchema = new mongoose.Schema({
  path: String,
  description: String
});

var Gallery = mongoose.model('Gallery', gallerySchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var upload = multer({ dest: 'public/assets/images'});

module.exports = function(app){

  app.get('/', function(req, res){
    Gallery.find({}, function(err, data){
      if (err) throw err;
      res.render('gallery', {pics: data});
    });
  });

  app.get('/gallery', function(req, res){
    Gallery.find({}, function(err, data){
      if (err) throw err;
      res.render('gallery', {pics: data});
    });
  });

  app.get('/image',function(req,res){
    Gallery.findOne({_id: req.query.id}).then(function(result){
      res.render('image', result);
    });
  });

  app.post('/gallery', upload.single('image'), function(req, res, next){
    fs.rename(req.file.path, 'public/assets/images/'+req.file.originalname, function(err) {
      if (err) {
        console.log(err);
        res.send(500);
      } else {
        var newPic = Gallery({path: req.file.originalname, description: req.body.description}).save(function(err, data){
          if (err) throw err;
          res.json(data);
        });
      }
    });

  });


  app.post('/image', urlencodedParser, function(req, res){
    Gallery.findOneAndUpdate({_id: req.query.id},{"description": req.body.description}).then(function(result){
      if (err) throw err;
      res.render('image', result);
    });
  });


};
