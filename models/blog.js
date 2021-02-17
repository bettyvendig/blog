const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  blogSchema = new Schema({
	title: {
		type:String,
		required:true
	},
	snippet: {
		type:String,
		required:true
	},
	body: {
		type:String,
		required:true
	}
},{timestamps:true});
/* Blog is the name of the collection..it will pluralize it */
/* and it will also lower case it so Blog means a collection of blogs */

const Blog = mongoose.model('Blog',blogSchema);
module.exports = Blog;
