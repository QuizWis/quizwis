import { gql } from 'apollo-server-micro';

/**
 * ユーザー作成を定義したGraphQLクエリ
 */
const CreateUserMutation = gql`
  mutation CreateUser($databaseId: String!, $name: String!, $email: String!) {
    createUser(databaseId: $databaseId, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export default CreateUserMutation;
