
const Subscription={
    userCreated: {
        subscribe: (_, _args, context) => context.pubsub.subscribe("userCreated"),
        resolve: (payload)=> payload
    },
    userUpdated:{
        subscribe:(_,__,context)=> context.pubsub.subscribe('userUpdated'),
    },
    userDeleted:{
        subscribe:(_,__,context)=> context.pubsub.subscribe('userDeleted'),
    },
    postCreated: {
        subscribe:(_, __, context) => context.pubsub.subscribe("postCreated"),
            
    },
    postUpdated:{
        subscribe:(_,__,context)=> context.pubsub.subscribe('postUpdated'),
    },
    postDeleted:{
        subscribe:(_,__,context)=> context.pubsub.subscribe('postDeleted'),
    },
    postCount:{
        subscribe:(_,__,context)=> context.pubsub.subscribe('postCount'),
    },

  };
module.exports=Subscription;