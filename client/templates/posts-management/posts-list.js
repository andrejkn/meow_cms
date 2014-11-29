
if (Meteor.isClient) {

	// This code only runs on the client
	Template.posts_list.helpers({
		posts: function () {
			var count = 1,
				posts = Posts.find();

			return posts.map(function (post, index, cursor) {
				post.index = count;
				count += 1;
				return post;
			});
		},

		formatDate: function (date) {
			if (_.isNull(date) || _.isUndefined(date)) {
				return '...';
			}

			var formattedDate = date.getDay() + '/' +
				date.getMonth() + '/' +
				date.getFullYear() + ' ' +
				date.getHours() + ':' +
				date.getMinutes() + ':' +
				date.getSeconds();
			return formattedDate;
		},

		concatenate: function(content, numCharacters) {
			return content.substr(0, numCharacters) + '...';
		}
	});

	Template.posts_list.events({
		'click .post_content_list': function () {
			var selectedContent = '#post_content_tooltip_' + this.index;
			$(selectedContent).show();

			$('.post_content_list, .post_content_tooltip_remove').click( function() {
				$('.meow_hidden').hide();
			});

		},

		'click .remove_post': function () {
			Posts.remove(this._id);
		},

		'click .edit_post': function () {
			Session.set('id-of-post-to-be-edited', this._id);

			// load the post that will be edited in the editor
			var subjectSelector = $('#post_subject_holder'),
				contentSelector = $('#post_content_holder');

			subjectSelector.val(this.subject);
			contentSelector.html(this.content);
		}
	});
}