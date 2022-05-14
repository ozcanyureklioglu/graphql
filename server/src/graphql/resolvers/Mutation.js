const { nanoid } = require("nanoid");
const Mutation={
    createUser: (_,{data}, context) => {
        const user={
            id: nanoid(),
            ...data
          }
      context.db.users.push(user);
      context.pubsub.publish('userCreated',{userCreated: user})
      return true;
    },
    createPost: (_, { data },context) => {
      const post = {
        id: nanoid(),
        ...data,
      };
      context.db.posts.push(post);
      context.pubsub.publish('postCreated',{postCreated: post});
      context.pubsub.publish('postCount',{postCount: context.db.posts.length});
      return post;
    },
    updateUser: (_, { id, data },context) => {
      const user_index = context.db.users.findIndex((user) => user.id === id);

      if (user_index === -1) {
        throw new Error("User not found ");
      }
      context.db.users[user_index] = {
        ...context.db.users[user_index],
        ...data,
      };
      context.pubsub.publish('userUpdated',{userUpdated: users[user_index]});
      return context.db.users[user_index];
      

    },
    updatePost: (parent, { id, data },context) => {
      const post_index = context.db.posts.findIndex((post) => post.id === id);

      if (post_index === -1) {
        throw new Error("Post not found");
      }

      context.db.posts[post_index] = {
        ...context.db.posts[post_index],
        ...data,
      };
      context.pubsub.publish('postUpdated',{postUpdated: context.db.posts[post_index]});
      return context.db.posts[post_index];
    },
    deleteUser: (parent, { id },context) => {
      const user_index = context.db.users.findIndex((user) => user.id === id);
      if (user_index === -1) {
        throw new Error("User not found");
      }
      const deleted_user = context.db.users[user_index];
      context.db.users.splice(user_index, 1);
      context.pubsub.publish('userDeleted',{userDeleted: deleted_user});
      return deleted_user;
    },
    deletePost: (parent, { id },context) => {
      const post_index = context.db.posts.findIndex((post) => post.id === id);

      if (post_index === -1) {
        throw new Error("Post not found");
      }
      const deleted_post = context.db.posts[post_index];
      context.db.posts.splice(post_index, 1);
      context.pubsub.publish('postDeleted',{postDeleted: deleted_post});
      return deleted_post;
    },
    deleteAllUser: (parent, args,context) => {
      const length = context.db.users.length;
      context.db.users.splice(0, length);

      return {
        count: length,
      };
    },
    deleteAllPost: (parent, args,context) => {
      const length = context.db.users.length;
      context.db.posts.splice(0, length);

      return {
        count: length,
      };
    },
  };
module.exports=Mutation;