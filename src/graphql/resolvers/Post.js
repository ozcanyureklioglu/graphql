const Post={
    user: (parent, args,context) => context.db.users.find((user) => user.id === parent.user_id),
    comments: (parent, args,context) =>
    context.db.comments.filter((comment) => comment.post_id === parent.id),
  };
module.exports=Post;