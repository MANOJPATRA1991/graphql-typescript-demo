import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($user: AuthUser!) {
    login(user: $user) {
      id
      email
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation SignupUser($user: AuthUser!) {
    signup(user: $user) {
      id
      email
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation {
    logout {
      id
      email
    }
  }
`;