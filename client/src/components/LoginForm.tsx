import React, { useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { LOGIN_USER } from '../graphql/mutations/user';
import { AuthUser, User } from '../graphql/types/user';
import { AuthForm } from './AuthForm';
import { GET_CURRENT_USER } from '../graphql/queries/user';

export const LoginForm = () => {

  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();

  const [loginUserFn] = useMutation<
    { loginUserFn: User },
    { user: AuthUser }
  >(LOGIN_USER);

  const onSubmit = async (user: AuthUser) => {
    try {
      await loginUserFn({
        variables: { user },
        // Query reruns => update all components associated with it
        refetchQueries: [{
          query: GET_CURRENT_USER,
        }],
        // true => refetched queries are completed before the mutation is considered done
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
      <h3>Login</h3>
      <AuthForm errors={errors} onSubmit={(user: AuthUser) => onSubmit(user)} />
    </div>
  );
};