const authors=[{
    id:'1',
    name:'Ahmet',
    surname:'Yıldız',
    age:34,
    
},
{
    id:'2',
    name:'Mehmet',
    surname:'Yıldız',
    age:34,
    
    }];

const books = [{
    id: "1",
    title: "The Awakening",
    author_id:'1', 
    isPublished: true,
},
{
    id: "2",
    title: "Puslu Kıtalar Atlası",
    author_id: '1',
    isPublished: true,
    }];


module.exports={
    authors,
    books
};

