import { gql } from '@apollo/client';

export const REGISTRATION = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      email
      password
    }
  }
`;
