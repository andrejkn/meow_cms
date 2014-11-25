if (Meteor.isClient) {

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      var subject = $('#subject').val(),
          content = $('#content').val();

      Session.set('subject', subject);
      Session.set('content', content);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Posts = new Mongo.Collection("posts");

  Posts.insert({
    createdBy: 'andrej',
    createdAt: new Date(),
    title: Session.get('subject'),
    content: Session.get('content')
  });
}
