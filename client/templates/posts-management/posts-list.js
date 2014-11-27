
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
            //console.dir(date);
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