import { gql } from 'apollo-server-micro';

export const GetUserCountQuery = gql`
  query GetUser($databaseId: String!) {
    user(databaseId: $databaseId) {
      id
      name
      email
    }
  }
`;
