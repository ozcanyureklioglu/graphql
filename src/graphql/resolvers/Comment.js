const Comment={
    user: (parent, __,context) => context.db.users.find((user) => user.id === parent.user_id),
    post: (parent, __,context) => context.db.posts.find((post) => post.id === parent.post_id),
  };
  module.exports=Comment;