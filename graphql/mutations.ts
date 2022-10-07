import { gql } from "@apollo/client";

export const ADD_EVENT = gql`
  mutation MyMutation(
      $athlete: ID!
      $time: String!
      $event: String!
      $milliseconds: Int
      $fullName: String!
  ) {
    insertEvent(
    athlete: $athlete
    time: $time
    event: $event
    milliseconds: $milliseconds
    fullName: $fullName
    )
    {
        athlete
        time
        event
        milliseconds
        fullName
    }
  }
  
`;

export const DELETE_EVENT = gql`
  mutation MyMutation($id: ID!) {
    deleteEvent(id: $id) {
      athlete
      event
      fullName
      id
      milliseconds
      time
    }
  }
`