import { gql } from 'apollo-server-micro';

export const GetUserQuery = gql`
  query GetUser($databaseId: String!) {
    user(databaseId: $databaseId) {
      id
      name
      email
    }
  }
`;
