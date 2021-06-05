import { ApolloError, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { SIGNUP_USER } from '../graphql/mutations/user';
import { GET_CURRENT_USER } from '../graphql/queries/user';
import { AuthUser, User } from '../graphql/types/user';
import { AuthForm } from './AuthForm';

export const SignupForm = ({

}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();

  const [signupUserFn] = useMutation<
    { signupUserFn: User },
    { user: AuthUser }
  >(SIGNUP_USER);

  const onSubmit = async (user: AuthUser) => {
    try {
      await signupUserFn({
        variables: { user },
        refetchQueries: [{
          query: GET_CURRENT_USER,
        }],
        awaitRefetchQueries: true,
      });
      history.push('/songs');
    } catch (e) {
      const errs: string[] = (e as ApolloError)?.graphQLErrors.map(error => error.message) || [];
      setErrors(errs);
    }
  }

  return (
    <div>
      <h3>Signup</h3>
      <AuthForm errors={errors} onSubmit={(user: AuthUser) => onSubmit(user)} />
    </div>
  );
}