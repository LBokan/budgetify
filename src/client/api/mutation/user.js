import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation signUp(
    $name: String!
    $surname: String!
    $mobileNumber: String
    $email: String!
    $password: String!
  ) {
    signUp(
      name: $name
      surname: $surname
      mobileNumber: $mobileNumber
      email: $email
      password: $password
    ) {
      name
      surname
      mobileNumber
      email
      password
    }
  }
`;
