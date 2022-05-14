import React from 'react';
import { List, Avatar, Skeleton } from "antd";
const data = [
    {
      gender: "male",
      name: { title: "Mr", first: "پرهام", last: "سلطانی نژاد" },
      email: "prhm.sltnynjd@example.com",
      picture: {
        large: "https://randomuser.me/api/portraits/men/1.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/1.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/1.jpg",
      },
      nat: "IR",
    },
    {
      gender: "female",
      name: { title: "Mr", first: "Buket", last: "Yalçın" },
      email: "prhm.sltnynjd@example.com",
      picture: {
        large: "https://randomuser.me/api/portraits/women/1.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/1.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/1.jpg",
      },
      nat: "IR",
    },
  ];
function Home(){
    return (
        <div>
            <List
            className="demo-loadmore-list"
            loading={false}
            itemLayout="horizontal"
            //loadMore={loadMore}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture.large} />}
                    title={<a href="https://ant.design">{item.name.first}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
    )
}


export default Home;

