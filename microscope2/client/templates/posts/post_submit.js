Template.postSubmit.events({
	'submit form': function(event) {
		event.preventDefault();

		var post = {
			url: $(event.target).find('[name=url]').val(),
			title: $(event.target).find('[name=title]').val()
		};

		var errors = validatePost(post); 
		if (errors.title || errors.url) {
			// The return is used to abort the execution of the postInsert if any error are found
			return Session.set('postSubmitErrors', errors);
		}

		Meteor.call('postInsert', post, function(error, result) {
			if(error) {
				return throwError(error.reason);
			}

			if(result.postExists) {
				throwError('This link has already been posted');
			}

			Router.go('postPage', {_id: result._id});
		});
	}
});

Template.postSubmit.create = function() {
	Session.set('postSubmitErrors', {});
}

Template.postSubmit.helpers({
	errorMessage: function(field){
		return Session.get('postSubmitErrors')[field];
	},
	errorClass: function(field){
		return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
	}
});