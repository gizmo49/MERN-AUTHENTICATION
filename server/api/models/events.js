const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const eventSchema = new Schema({
    userid: { type: String, unique: false, required: true },
    title: { type: String, unique: false, required: true },
    date: { type: String, unique: false, required: true },
	venue: { type: String, unique: false, required: true },
    time: { type: String, unique: false, required: true },
    about: { type: String, unique: false, required: true },

},
{
  timestamps: true
})

eventSchema.pre('save', function(next) {
    this.created_at = Date.now();
    this.updated_at = Date.now();
    next();
  });
const Events = mongoose.model('Events', eventSchema)
module.exports = Events