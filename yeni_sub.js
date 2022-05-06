const { GraphQLServer, PubSub, withFilter } = require("graphql-yoga");
const { nanoid } = require("nanoid");
const { users, posts, comments } = require("./data2");

const typeDefs = `
type User {
    id: ID!
    fullName: String!
    posts: [Post!]
    comments: [Comment!]
    age: Int
}

type Post {
    id: ID!
    title: String!
    user_id: ID!
    user: User!
    comments: [Comment!]!
}
type Comment {
    id: ID!
    text: String!
    post_id: ID!
    user: User!
    post: Post!
}
type Query {
    # User
    users: [User!]!
    user(id: ID!): User!
    # Post
    posts: [Post!]!
    post(id: ID!): Post!
    # Comment
    comments: [Comment!]!
    comment(id: ID!): Comment!
}
input createUser {
    fullName: String!
    age: Int!
}

input updateUser {
    fullName: String!
    age: Int!
}
input createPost {
    title: String!
    user_id: ID!
}
input updatePost {
    title: String
    user_id: String
}
type DeleteAll {
    count: Int!
}

type Mutation {
    createUser(data: createUser!): Boolean!
    updateUser(id: ID!, data: updateUser): User!
    deleteUser(id: ID!): User!
    deleteAllUser: DeleteAll!

    createPost(data: createPost!): Post!
    updatePost(id: ID!, data: updatePost): Post!
    deletePost(id: ID!): Post!
    deleteAllPost: DeleteAll!
}
type Subscription{
    userCreated: User!
    userUpdated: User!
    userDeleted: User!

    postCreated(user_id: ID):Post!
    postDeleted:Post!
    postUpdated:Post!

    postCount: Int

}
`;

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
    createUser: (parent, { data },{pubsub}) => {
        const user={
            id: nanoid(),
            ...data
          }
      users.push(user);
      pubsub.publish('userCreated',{userCreated: user})
      return true;
    },
    createPost: (parent, { data },{pubsub}) => {
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
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("userCreated"),
    },
    userUpdated:{
        subscribe:(_,__,{pubsub})=> pubsub.asyncIterator('userUpdated'),
    },
    userDeleted:{
        subscribe:(_,__,{pubsub})=> pubsub.asyncIterator('userDeleted'),
    },
    postCreated: {
        subscribe: withFilter(
            (_, __, { pubsub }) => pubsub.asyncIterator("postCreated"),
            (payload,variables)=>{
                console.log(payload);
                console.log(variables);

                return variables.user_id ? (payload.postCreated.user_id === variables.user_id) : true;
            }
        )
    },
    postUpdated:{
        subscribe:(_,__,{pubsub})=> pubsub.asyncIterator('postUpdated'),
    },
    postDeleted:{
        subscribe:(_,__,{pubsub})=> pubsub.asyncIterator('postDeleted'),
    },
    postCount:{
        subscribe:(_,__,{pubsub})=> pubsub.asyncIterator('postCount'),
    },

  },
};

const pubsub = new PubSub();

const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
server.start(() => console.log("Server is running on localhost:4000"));

/*
count: {
    subscribe: (_, __, { pubsub }) => {
        let count = 0;
        setInterval(() => {
        count++;
        pubsub.publish("count", { count });
        }, 1000);
        return pubsub.asyncIterator("count");
    },
    },
*/
