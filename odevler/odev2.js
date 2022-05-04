const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");


const { locations, events, participants, users } = require("./data");
const {nanoid}=require('nanoid');


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
        id: Int!
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
        id: Int!
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
    input createuser{
        username: String!
        email: String!
    }
    input createevent{
        title: String!
        desc: String!
        date: String!
        from: String!
        to: String!
        location_id: ID!
        user_id: ID!
    }
    input createLocation{
        name: String!
        desc: String!
        lat: Int!
        lng: Int!
    }
    input createParticipant{
        user_id: ID!
        event_id: ID!
    }
    input updateUser{
        username: String!
        email: String!
    }
    input updateEvent{
        title: String!
        desc: String!
        date: String!
        from: String!
        to: String!
        location_id: ID!
        user_id: ID!
    }
    input updateLocation{
        name: String!
        desc: String!
        lat: Int!
        lng: Int!
    }
    input updateParticipant{
        user_id: ID!
        event_id: ID!
    }
    type DeleteAll{
        count: Int!
    }
    type Mutation{
        addUser(data:createuser): Boolean!
        updateUser(id:ID! ,data:updateUser):User!
        deleteUser(id:ID!):User!
        deleteAllUser:DeleteAll!

        addEvent(data:createevent): Boolean!
        updateEvent(id:ID! ,data:updateEvent): Event!
        deleteEvent(id:ID!):Event!
        deleteAllEvent:DeleteAll!

        addLocation(data:createLocation): Location!
        updateLocation(id:Int!, data:updateLocation):Location!
        deleteLocation(id:Int!):Location!
        deleteAllLocation:DeleteAll!

        addParticipant(data:createParticipant): Participant!
        updateParticipant(id:Int!, data:updateParticipant): Participant!
        deleteParticipant(id:Int!):Participant!
        deleteAllParticipant:DeleteAll!
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
  },
  Mutation:{
      addUser:(parent,{data})=>{
        users.push({
            id: nanoid(),
            ...data
        });
        return true;
      },
      addEvent:(parent,{data})=>{
          events.push({
              id:nanoid(),
              ...data
          });
          return true;
      },
      addLocation:(parent,{data})=>{
        const location={
            id:nanoid(),
            ...data
        }  
        locations.push(location);
          return location;
      },
      addParticipant:(parent,{data})=>{
          const parti={
              id:nanoid(),
              ...data
          }
          participants.push(parti);
          return parti;
      },
      updateUser:(parent,{id,data})=>{
          const user_index=users.findIndex(user => user.id === id);
          if(user_index === -1){
              throw new Error("User not found");
          }

          users[user_index]={
              ...users[user_index],
              ...data
          }
          return users[user_index];
      },
      updateEvent:(parent,{id,data})=>{
        const event_index=events.findIndex(e => e.id === id);
        if(event_index === -1){
            throw new Error("Event not found");
        }

        events[event_index]={
            ...events[event_index],
            ...data
        }
        return events[event_index];
      },
      updateLocation:(parent,{id,data})=>{
        const loc_index=locations.findIndex(e => e.id === id);
        if(loc_index === -1){
            throw new Error("Location not found");
        }

        locations[loc_index]={
            ...locations[loc_index],
            ...data
        }
        return locations[loc_index];
      },
      updateParticipant:(parent,{id,data})=>{
        const parti_index=participants.findIndex(e => e.id === id);
        if(parti_index === -1){
            throw new Error("Participant not found");
        }

        participants[parti_index]={
            ...participants[parti_index],
            ...data
        }
        return participants[parti_index];
      },
      deleteUser:(parent,{id})=>{
          const user_index=users.findIndex(user=>user.id === id);
          const user=users[user_index]
          if(user_index === -1){
              throw new Error("User not found");
          }

          users.splice(user_index,1);
          return user;

      },
      deleteEvent:(parent,{id})=>{
        const event_index=events.findIndex(e=>e.id === id);
        const event=events[event_index]
        if(event_index === -1){
            throw new Error("Event not found");
        }

        events.splice(event_index,1);
        return event;
      },
      deleteLocation:(parent,{id})=>{
        const location_index=locations.findIndex(e=>e.id === id);
        const location=locations[location_index]
        if(location_index === -1){
            throw new Error("Location not found");
        }

        locations.splice(location_index,1);
        return location;
      },
      deleteParticipant:(parent,{id})=>{
        const parti_index=participants.findIndex(e=>e.id === id);
        const parti=participants[parti_index]
        if(parti_index === -1){
            throw new Error("Participant not found");
        }

        participants.splice(parti_index,1);
        return parti;
      },
      deleteAllUser:(parent)=>{
        const length=users.length;
        users.splice(0,length);
        return {
            count:length
        };

      },
      deleteAllEvent:(parent)=>{
        const length=events.length;
        events.splice(0,length);
        return {
            count:length
        };
      },
      deleteAllLocation:(parent)=>{
        const length=locations.length;
        locations.splice(0,length);
        return {
            count:length
        };
      },
      deleteAllParticipant:(parent)=>{
        const length=participants.length;
        participants.splice(0,length);
        return {
            count:length
        };
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
