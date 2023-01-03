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

export const EDIT_USER = gql`
  mutation User($name: String!, $surname: String!, $mobileNumber: String) {
    editUser(name: $name, surname: $surname, mobileNumber: $mobileNumber) {
      name
      surname
      mobileNumber
    }
  }
`;

export const DELETE_USER = gql`
  mutation User {
    deleteUser {
      id
    }
  }
`;
