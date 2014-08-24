var mongoose = require ('mongoose');

mongoose.connect('mongodb://user1:1234@ds037607.mongolab.com:37607/teuxdeuxpartdeux');

module.exports = mongoose;