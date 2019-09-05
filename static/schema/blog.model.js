const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BlogSchema = new Schema ({
    title:{type:String},
    image:{type:String},
    content:{type:String},
    author:{type:String},
    tags: {type:String},
    category: {type:Array},
    albums : {type: Array},
    date: { type: String }
});
const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;