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
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    },
    {
      id: "2",
      title: "Özcan diğer gönderisi",
      user_id: "1",
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    },
    {
      id: "3",
      title: "Jessy'in gönderisi",
      user_id: "2",
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