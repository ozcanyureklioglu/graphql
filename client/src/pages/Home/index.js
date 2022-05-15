import React from 'react';
import { List, Avatar, Skeleton } from "antd";
import { useQuery } from '@apollo/client';
import Loading from '../../components/Loading'
import {GET_POSTS} from './queries.js'

function Home(){
    const { loading, error, data } = useQuery(GET_POSTS);

    if(loading){
      return <Loading/>
    }
    if(error){
      return <div> Error...</div>
    }
    console.log(data);
    return (
        <div>
            <List
            className="demo-loadmore-list"
            loading={false}
            itemLayout="horizontal"
            //loadMore={loadMore}
            dataSource={data.posts}
            renderItem={(item) => (
              <List.Item>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={item.user.profile_photo} />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.description}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
    )
}


export default Home;

