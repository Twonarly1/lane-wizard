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
