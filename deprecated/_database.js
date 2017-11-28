const mongodb = require('controllers/mongodb');
const PASSWORD = require('password');
/*Modify Password field to mlab. Deploy to Heroku.*/
const mongoDBURI = process.env.MONGODB_URI ||
      'jbernsteiniv:' + PASSWORD + '@mlab...blah';

module.exports.storeData = function(request, response) {
    mongodb.MongoClient.connect(mongoDBURI, function(error, database) {
        if (error) throw error;

        const Routes = database.collection('Routes');

        /*Schemas for database table*/
        var schema = {
            'item-name':
        };
        /*Change cursor from const to var if error occurs. let not supported.*/
        const cursor = Routes.find({});
        cursor.forEach(
            function(db, callback) {

                db.collection('Orders').insertMany {

                }
            }
        );

        Routes.find().toArray(function(error, Documents) {
            if (error) throw error;

            response.render('storeData.ejs', {result: Documents});
        });

        db.close(function (err) {
            if(err) throw err;
        });
    });
};