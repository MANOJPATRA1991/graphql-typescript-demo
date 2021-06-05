import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './App.css';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { GET_CURRENT_USER } from './graphql/queries/user';
import { User } from './graphql/types/user';

export const App = () => {
  const [isAuthenticated, setAuthentication] = useState<boolean>(false);
  const { loading, error, data, refetch } = useQuery<User>(GET_CURRENT_USER);

  useEffect(() => {
    if (!loading && error) {
      setAuthentication(false);
    }

    if (!loading && data) {
      setAuthentication(true);
    }
  }, [error, data]);

  const refetchUser = async () => {
    try {
      await refetch();
      setAuthentication(true);
    } catch (e) {
      setAuthentication(false);
    }
  };

  return (
    !loading ? <div className="container">
      <Header isAuthenticated={isAuthenticated} refetchUser={refetchUser} />
      <Main isAuthenticated={isAuthenticated} />
    </div> : null
  );
};