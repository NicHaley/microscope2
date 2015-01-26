Template.postSubmit.events({
	'submit form': function(event) {
		event.preventDefault();

		var post = {
			url: $(event.target).find('[name=url]').val(),
			title: $(event.target).find('[name=title]').val()
		};

		Meteor.call('postInsert', post, function(error, result) {
			if(error) {
				return alert(error.reason)
			}
			
			Router.go('postPage', post);
		});
	}
});