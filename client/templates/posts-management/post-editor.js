
if (Meteor.isClient) {

  Template.post_editor.events({
    'click #save_post': function () {

      // increment the counter when button is clicked
      var subject = $('#post_subject_holder').val(),
          content = $('#post_content_holder').val(),
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
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
