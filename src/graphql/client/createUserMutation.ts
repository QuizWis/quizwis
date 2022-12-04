import { gql } from 'apollo-server-micro';

export const CreateUserMutation = gql`
  mutation CreateUser($databaseId: String!, $name: String!, $email: String!) {
    createUser(databaseId: $databaseId, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;
