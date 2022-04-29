const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const {authors,books}=require('./data');

const typeDefs = gql`
  type Author{
    id: ID!
    name: String!
    surname: String
    age: Int
    books:[Book!]
  }
  type Book {
    id: ID!
    title: String!
    author: Author!
    isPulished: Boolean
  }
  type Query {
    books: [Book],
    book(id: ID!):Book
    authors:[Author]
    author(id:ID!):Author
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    book: (parent, args, context, info)=>{
        return books.find(book => book.id === args.id );
        
    },
    authors:()=>authors,
    author:(parent,args)=>{
        return authors.find(author => author.id === args.id)
    }
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
