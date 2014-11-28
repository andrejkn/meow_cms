
if (Meteor.isClient) {

  Meteor.startup(function () {
    Session.set('editorMode', 'text');
  });

  Template.post_editor.helpers({
    isActive: function (editorMode) {
      return Session.get('editorMode') === editorMode;
    }
  });

  Template.post_editor.events({
    'click #save_post': function () {

      // increment the counter when button is clicked
      var subject = $('#post_subject_holder').val(),
          content = $('#post_content_holder').html(),
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
    },

    'click #text_mode' : function () {
      Session.set('editorMode', 'text');
    },

    'click #html_mode' : function () {
      Session.set('editorMode', 'html');
    }

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
