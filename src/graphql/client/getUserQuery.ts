import { gql } from 'apollo-server-micro';

/**
 * ユーザーの基本情報を取得するためのGraphQLクエリ
 */
const GetUserQuery = gql`
  query GetUser($databaseId: String!) {
    user(databaseId: $databaseId) {
      id
      name
      email
    }
  }
`;

export default GetUserQuery;
