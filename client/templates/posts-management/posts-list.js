
if (Meteor.isClient) {

	// Helper functions
	Template.posts_list.helpers({
		posts: function () {
			var count = 1,
				posts = Posts.find();

			return posts.map(function (post) {
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

	// Events
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
			var previouslySelectedToEditId = Session.get('id-of-post-to-be-edited'),
				previouslySelectedToEditIndex = Session.get('index-of-post-to-be-edited'),
				selectedToEditId = this._id,
				selectedToEditIndex = this.index,
				subjectSelector = $('#post_subject_holder'),
				contentSelector = $('#post_text_content_holder');

			if (!_.isUndefined(previouslySelectedToEditIndex)) {
				$('#post_row_' + previouslySelectedToEditIndex).removeClass('info');
			}

			subjectSelector.val('');
			contentSelector.html('');

			if ( selectedToEditId === previouslySelectedToEditId ) {
				Session.set('id-of-post-to-be-edited', undefined);
				Session.set('index-of-post-to-be-edited', undefined);
			} else {
				Session.set('id-of-post-to-be-edited', selectedToEditId);
				Session.set('index-of-post-to-be-edited', selectedToEditIndex);

				$('#post_row_' + selectedToEditIndex).addClass('info');
				// load the post that will be edited in the editor
				subjectSelector.val(this.subject);
				contentSelector.html(this.content);
			}
		}
	});
}