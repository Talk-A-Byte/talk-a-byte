import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation Register($payload: RegisterInput) {
    register(payload: $payload) {
      _id
      name
      email
      password
    }
  }
`;

export const GET_SCANS = gql`
  query Query {
    getScans {
      _id
      fileName
      file
      UserId
      createdAt
    }
  }
`;

export const ADD_SCAN = gql`
  mutation AddScan($file: String) {
    addScan(file: $file) {
      acknowledged
      insertedId
    }
  }
`;
