const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const {nanoid} = require('nanoid');

const {authors,books}=require('./data');

const typeDefs = gql`
  type Author{
    id: ID!
    name: String!
    surname: String
    age: Int
    books(filter: String):[Book!]
  }
  type Book {
    id: ID!
    title: String!
    author: Author!
    author_id: String
    isPulished: Boolean
  }
  type Query {
    books: [Book],
    book(id: ID!):Book
    authors:[Author]
    author(id:ID!):Author
  }
  type Mutation{
      createBook(title: String!): Boolean!
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
  Book:{
      author: (parent,args)=>{
          return authors.find(author => author.id === parent.author_id);
      }
  },
  Author:{
      books:(parent,args)=>{
          
          let filtered=books.filter((book) =>book.author_id === parent.id);
          if(args.filter){
              filtered=books.filter((book) => book.title.startsWith(args.filter));
          }
        return filtered
      }
      
  },
  Mutation:{
      createBook: (parent,args)=>{
          books.push({id: nanoid(),title:args.title});
          return true;
      }
  }

};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
