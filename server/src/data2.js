const users = [
    {
      id: "1",
      fullName: "Özcan Yüreklioğlu",
      age: 26,
      profile_photo:"https://randomuser.me/api/portraits/men/21.jpg"
    },
    {
      id: "2",
      fullName: "Jessy Morica",
      ag:35,
      profile_photo: "https://randomuser.me/api/portraits/women/66.jpg"
    },
  ];
  
  const posts = [
    {
      id: "1",
      title: "Özcan gönderisi",
      user_id: "1",
      cover:"https://images.unsplash.com/photo-1652860480192-29f496ca1fa3?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1105",
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    },
    {
      id: "2",
      title: "Özcan diğer gönderisi",
      user_id: "1",
      cover:"https://images.unsplash.com/photo-1652595057288-d280aa149dec?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    },
    {
      id: "3",
      title: "Jessy'in gönderisi",
      user_id: "2",
      cover: "https://images.unsplash.com/photo-1652870026686-cfe9332b2c5d?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687",
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    },
  ];
  
  const comments = [
    {
      id: "1",
      text: "Lorem ipsum",
      post_id: "1",
      user_id: "1",
    },
    {
      id: "2",
      text: "Lorem ipsum doler",
      post_id: "1",
      user_id: "2",
    },
    {
      id: "3",
      text: "foo bar",
      post_id: "2",
      user_id: "2",
    },
    {
      id: "4",
      text: "foo bar baz",
      post_id: "3",
      user_id: "1",
    },
  ];
  
  module.exports = {
    users,
    posts,
    comments,
  };