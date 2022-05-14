const Query= {
    // User
    users: (_, _args, context) => context.db.users,
    user: (_, args,context) => {
      const user = context.db.users.find((user) => user.id === args.id);
      if (!user) {
        return new Error("User not found");
      }
      return user;
    },

    // Post
    posts: (_,__,context) => context.db.posts,
    post: (_, args,context) => {
      const post = context.db.posts.find((post) => post.id === args.id);
      if (!post) {
        return new Error("Post not found");
      }
      return post;
    },

    // Comment
    comments: (_,__,context) => context.db.comments,
    comment: (_, args,context) => {
      const comment = context.db.comments.find((comment) => comment.id === args.id);
      if (!comment) {
        return new Error("Comment not found");
      }
      return comment;
    },
  };

  module.exports =Query;