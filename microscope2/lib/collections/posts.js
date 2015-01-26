Posts = new Mongo.Collection('posts');

Meteor.method({
	postInsert: function(postAttributes) {
		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String
		});

		var user = Meteor.user();

		// The _extend attribute allows us to extend the post object
		// defined in post_submit with the properties of the object
		// defined below
		var post = _.extend(postAttributes, {
			userId: user._id;
			author: user.username,
			submitted: new Date()
		});

		var postId = Posts.insert(post);

		return {
			_id: postId
		};
	}
});