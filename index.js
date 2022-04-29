const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const author={
  id:'asdsad323',
  name:'Ahmet',
  surname:'Yıldız',
  age:34
}
const books = {
  id: "asd676asd",
  title: "The Awakening",
  author: author,
  isPublished: true,
};

const typeDefs = gql`
  type Author{
    id: ID!
    name: String!
    surname: String
    age: Int
    books:
  }
  type Book {
    id: ID!
    title: String!
    author: Author!
    isPulished: Boolean
  }
  type Query {
    book: Book
    author:Author
  }
`;

const resolvers = {
  Query: {
    book: () => books,
    author:()=>author
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
