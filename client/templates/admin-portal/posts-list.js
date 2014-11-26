
if (Meteor.isClient) {
    // This code only runs on the client
    Template.posts_list.helpers({
        posts: function () {
            return Posts.find({});
        },

        formatDate: function (date) {
            console.dir(date);
            var formattedDate = date.getDay() + '/' +
                date.getMonth() + '/' +
                date.getFullYear() + ' ' +
                date.getHours() + ':' +
                date.getMinutes() + ':' +
                date.getSeconds();
            return formattedDate;
        },

        concatenate: function(content, numCharacters) {
            return content.substr(0, numCharacters);
        }
    });
}