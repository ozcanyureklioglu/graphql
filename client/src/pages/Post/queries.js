import { gql } from '@apollo/client';
export const GET_POST_BY_ID = gql`
query getPost($id: ID!){
    post(id: $id){
      id
      title
      description
      cover
    }
  }
`;




