
if (Meteor.isClient) {

  Template.main.events({
    'submit .new_post': function (event) {
      // increment the counter when button is clicked
      var subject = event.target.subject.value,
          content = event.target.content.value,
          user = 'andrej';

      if (!_.isEmpty(user) && !_.isEmpty(subject) && !_.isEmpty(content)) {
        Posts.insert({
          createdBy: user,
          createdAt: new Date(),
          subject: subject,
          content: content,
          visible: false,
          editedAt: new Date()
        });
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
