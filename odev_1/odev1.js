const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");


const { locations, events, participants, users } = require("./data");


const typeDefs = gql`
    type Event{
        id: ID!
        title: String!
        desc: String!
        date: String!
        from: String!
        to: String!
        location_id: ID!
        user_id: ID!
        user: User
        participants: [Participant]
        location: Location
    }

    type Location{
        id: ID!
        name: String!
        desc: String!
        lat: Int!
        lng: Int!
    }
    type User{
        id:ID!
        username: String!
        email: String!
        event: Event
    }
    type Participant{
        id: ID!
        user_id: ID!
        event_id: ID
    }
    type Query{
        events: [Event]!
        locations: [Location]!
        users: [User]!
        participants: [Participant]!
        user(id: ID!): User
        event(id: ID!):Event
    }


  
`;

const resolvers = {
  Query: {
      events: ()=>events,
      locations: ()=>locations,
      users: ()=>users,
      participants: ()=>participants,
      user: (parent,args)=>{
          return users.find(user => user.id === args.id);
      },
      event:(parent,args)=>{
          return events.find(e => e.id === args.id)
      }
  },
  User:{
      event: (parent,args)=>{
          return events.find(event => event.user_id === parent.id);
      }
  },
  Event:{
      user: (parent,args)=>{
          return users.find(user => parent.user_id === user.id)
      },
      participants: (parent, args)=>{
          return participants.filter(parti => parti.event_id === parent.id)
      },
      location:(parent,args)=>{
          return locations.find(loc => loc.id === parent.location_id)
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
