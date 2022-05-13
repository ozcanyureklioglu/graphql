const User = {
  posts: (parent, args,context) => context.db.posts.filter((post) => post.user_id === parent.id),
  comments: (parent, args,context) =>
  context.db.comments.filter((comment) => comment.user_id === parent.id),
};
module.exports = User;
