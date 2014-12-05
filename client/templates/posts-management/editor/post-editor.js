
if (Meteor.isClient) {
	Meteor.startup(function () {
		Session.set('editorMode', 'text');
		Session.set('postContentHtml', '');
		Session.set('postContentText', '');
	});

	Template.post_editor.helpers({
		isActive: function (editorMode) {
			return Session.get('editorMode') === editorMode;
		},

		htmlPostContent: function () {
			return Session.get('postContentHtml');
		},

		textPostContent: function () {
			return Session.get('postContentText');
		}
	});

	Template.post_editor.events({

		'click #save_post': function () {

			// increment the counter when button is clicked
			var contentSelector = $('#post_text_content_holder'),
				subjectSelector = $('#post_subject_holder'),
                subject = subjectSelector.val(),
				content = contentSelector.html(),
				user = 'andrej',
				editId = Session.get('id-of-post-to-be-edited');

			if (!_.isEmpty(user) && !_.isEmpty(content)) {

				// if in EDIT mode
				if (editId) {
						Posts.update({
						_id: editId
					}, {
						$set: {
							content: content,
							subject: subject,
							editedAt: new Date()
						}
					});

					Session.set('id-of-post-to-be-edited', undefined);
					$('#post_row_' + Session.get('index-of-post-to-be-edited')).removeClass('success');
					subjectSelector.val('');
					contentSelector.html('');
					Session.set('index-of-post-to-be-edited', undefined);

				} else {
					Posts.insert({
						createdBy: user,
						createdAt: new Date(),
						subject: subject,
						content: content,
						visible: false,
						editedAt: null
					});
				}
			}
		},

		'click #text_mode' : function () {
			Session.set('editorMode', 'text');
			Session.set('postContentText', $('#post_html_content_holder').val());
			$('#post_text_content_holder').html(Session.get('postContentText'));
		},

		'click #html_mode' : function () {
			Session.set('editorMode', 'html');
			Session.set('postContentHtml', $('#post_text_content_holder').html());
		},

		'keypress #post_subject_holder': function () {
			Session.set('isReadyToRoll', $('#post_subject_holder').val());
		}

	});
}
