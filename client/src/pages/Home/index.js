import React from 'react';
import { List, Avatar, Skeleton } from "antd";
import { useQuery } from '@apollo/client';
import Loading from '../../components/Loading'
import {GET_POSTS} from './queries.js'
import {Link} from 'react-router-dom';
import styles from './styles.module.css';

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
                    title={<Link to={`post/${item.id}`}>{item.title}</Link>}
                    description={<Link to={`post/${item.id}`} className={styles.listItem}>{item.description}</Link>}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
    )
}


export default Home;

