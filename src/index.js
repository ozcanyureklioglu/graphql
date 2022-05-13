const  { createServer, createPubSub } = require ('@graphql-yoga/node')
const { nanoid } = require("nanoid");
const db = require("./data2");
const pubsub = createPubSub()
const types=require('./graphql/types');
const resolvers=require('./graphql/resolvers');



/*
const resolvers = {
  Query: {
    // User
    users: () => users,
    user: (parent, args) => {
      const user = users.find((user) => user.id === args.id);
      if (!user) {
        return new Error("User not found");
      }
      return user;
    },

    // Post
    posts: () => posts,
    post: (parent, args) => {
      const post = posts.find((post) => post.id === args.id);
      if (!post) {
        return new Error("Post not found");
      }
      return post;
    },

    // Comment
    comments: () => comments,
    comment: (parent, args) => {
      const comment = comments.find((comment) => comment.id === args.id);
      if (!comment) {
        return new Error("Comment not found");
      }
      return comment;
    },
  },
  User: {
    posts: (parent, args) => posts.filter((post) => post.user_id === parent.id),
    comments: (parent, args) =>
      comments.filter((comment) => comment.user_id === parent.id),
  },
  Post: {
    user: (parent, args) => users.find((user) => user.id === parent.user_id),
    comments: (parent, args) =>
      comments.filter((comment) => comment.post_id === parent.id),
  },
  Comment: {
    user: (parent, args) => users.find((user) => user.id === parent.user_id),
    post: (parent, args) => posts.find((post) => post.id === parent.post_id),
  },
  Mutation: {
    createUser: (parent, { data }) => {
        const user={
            id: nanoid(),
            ...data
          }
      users.push(user);
      pubsub.publish('userCreated',{user})
      return true;
    },
    createPost: (_, {data}) => {
      const post = {
        id: nanoid(),
        ...data,
      };
      posts.push(post);
      pubsub.publish('postCreated',{postCreated: post});
      pubsub.publish('postCount',{postCount: posts.length});
      return post;
    },
    updateUser: (parent, { id, data },{pubsub}) => {
      const user_index = users.findIndex((user) => user.id === id);

      if (user_index === -1) {
        throw new Error("User not found ");
      }
      users[user_index] = {
        ...users[user_index],
        ...data,
      };
      pubsub.publish('userUpdated',{userUpdated: users[user_index]});
      return users[user_index];
      

    },
    updatePost: (parent, { id, data },{pubsub}) => {
      const post_index = posts.findIndex((post) => post.id === id);

      if (post_index === -1) {
        throw new Error("Post not found");
      }

      posts[post_index] = {
        ...posts[post_index],
        ...data,
      };
      pubsub.publish('postUpdated',{postUpdated: posts[post_index]});
      return posts[post_index];
    },
    deleteUser: (parent, { id },{pubsub}) => {
      const user_index = users.findIndex((user) => user.id === id);
      if (user_index === -1) {
        throw new Error("User not found");
      }
      const deleted_user = users[user_index];
      users.splice(user_index, 1);
      pubsub.publish('userDeleted',{userDeleted: deleted_user});
      return deleted_user;
    },
    deletePost: (parent, { id },{pubsub}) => {
      const post_index = posts.findIndex((post) => post.id === id);

      if (post_index === -1) {
        throw new Error("Post not found");
      }
      const deleted_post = posts[post_index];
      posts.splice(post_index, 1);
      pubsub.publish('postDeleted',{postDeleted: deleted_post});
      return deleted_post;
    },
    deleteAllUser: (parent, args) => {
      const length = users.length;
      users.splice(0, length);

      return {
        count: length,
      };
    },
    deleteAllPost: (parent, args) => {
      const length = users.length;
      posts.splice(0, length);

      return {
        count: length,
      };
    },
  },
  Subscription: {
    userCreated: {
      subscribe: () => pubsub.subscribe("userCreated"),
      resolve: (payload)=> console.log(payload)
    },
    userUpdated:{
        subscribe:()=> pubsub.subscribe('userUpdated'),
    },
    userDeleted:{
        subscribe:()=> pubsub.subscribe('userDeleted'),
    },
    postCreated: {
        subscribe: ( ) => pubsub.subscribe("postCreated"),
        resolve: (payload)=> console.log(payload)
           
    },
    postUpdated:{
        subscribe:()=> pubsub.subscribe('postUpdated'),
    },
    postDeleted:{
        subscribe:()=> pubsub.subscribe('postDeleted'),
    },
    postCount:{
        subscribe:()=> pubsub.subscribe('postCount'),
    },

  },
};
*/



// Provide your schema
const server = createServer({
  schema: {
    typeDefs: types,
    resolvers,
  },
  context:{
    pubsub,
    db
  }
})

server.start()