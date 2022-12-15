import { gql } from '@apollo/client';

export const REGISTRATION = gql`
  mutation registration($email: String!, $password: String!) {
    registration(email: $email, password: $password) {
      email
      password
    }
  }
`;
