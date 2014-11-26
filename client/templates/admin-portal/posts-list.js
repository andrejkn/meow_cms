
if (Meteor.isClient) {
    // This code only runs on the client
    Template.posts_list.helpers({
        posts: function () {
            return Posts.find({});
        }
    });
}