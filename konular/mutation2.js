const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const {nanoid}=require('nanoid')
const { users, posts, comments } = require("./data2");

const typeDefs = gql`
  type User {
    id: ID!
    fullName: String!
    posts: [Post!]
    comments:[Comment!]
    age: Int!
  }

  

  type Post {
    id: ID!
    title: String!
    user_id: ID!
    user: User!
    comments:[Comment!]!
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
  input createUser{
    fullName: String!
    age: Int!
  }

  input updateUser{
      fullName:String!
      age: Int!
  }
  input createPost{
    title: String!
    user_id: ID!
  }
  input updatePost{
      title: String
      user_id: String
  }

  type Mutation{
    createUser(data: createUser!): Boolean!
    updateUser(id:ID!, data: updateUser): User!
    createPost(data: createPost! ): Post!
    updatePost(id: ID! , data: updatePost): Post!
}
`;

const resolvers = {
  Query: {
    // User
    users: () => users,
    user: (parent,args) => {
      const user = users.find((user) => user.id === args.id);
      if (!user) {
        return new Error("User not found");
      }
      return user;
    },

    // Post
    posts: () => posts,
    post: (parent,args) => {
      const post = posts.find((post) => post.id === args.id);
      if (!post) {
        return new Error("Post not found");
      }
      return post;
    },

    // Comment
    comments: () => comments,
    comment: (parent,args) => {
      const comment = comments.find((comment) => comment.id === args.id);
      if (!comment) {
        return new Error("Comment not found");
      }
      return comment;
    },
  },
  User:{
    posts:(parent,args)=>posts.filter((post)=>post.user_id===parent.id),
    comments:(parent,args)=>comments.filter((comment)=>comment.user_id===parent.id)
  },
  Post:{
    user:(parent,args)=>users.find((user)=>user.id===parent.user_id),
    comments:(parent,args)=>comments.filter((comment)=>comment.post_id===parent.id)
  },
  Comment:{
    user:(parent,args)=>users.find((user)=>user.id===parent.user_id),
    post:(parent,args)=>posts.find((post)=>post.id===parent.post_id)
  },
  Mutation:{
    createUser: (parent,{data})=>{
        users.push({
            id: nanoid(),
            fullName: data.fullName
        });
        return true;
    },
    createPost: (parent,{data})=>{
        const post={
            id: nanoid(),
            ...data
        }
        posts.push(post);
        return post;
    },
    updateUser:(parent,{id, data})=>{
        const user_index=users.findIndex(user => user.id === id);

        if(user_index === -1){
            throw new Error('User not found ');
        }
        users[user_index]={
            ...users[user_index],
            ...data
        }
        return users[user_index];
        
    },
    updatePost:(parent,{id,data})=>{
        const post_index=posts.findIndex(post=> post.id === id);

        if(post_index === -1){
            throw new Error('Post not found');
        }

        posts[post_index]={
            ...posts[post_index],
            ...data
        };

        return posts[post_index];


    }


}

  
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});
server.listen().then(({ url }) => console.log(`Apollo server is up at ${url}`));