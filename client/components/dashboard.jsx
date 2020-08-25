import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

export const Dashboard = () => (
  <Query
    query={gql`
      {
        me {
          id
          name
          email
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
        <>
          <h1>You are:</h1>
          <ul>
            <li>id: {data.me.id}</li>
            <li>name: {data.me.name}</li>
            <li>email: {data.me.email}</li>
          </ul>
        </>
      );
    }}
  </Query>
);
