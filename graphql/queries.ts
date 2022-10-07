import {gql} from '@apollo/client'

export const GET_EVENT_USING_ATHLETE = gql`
 query MyQuery($id: ID!) {
    getEventUsingAthlete(id: $id) {
    athlete
    event
    id
    time
    milliseconds
    fullName
    checked
    }
  }
  `


export const GET_ATHLETES = gql`
  query MyQuery {
    getAthleteList {
      firstName
      id
      lastName
      grade
    }
  }
`

export const GET_EVENTS = gql`
query MyQuery {
    getEventList {
      time
      milliseconds
      id
      event
      athlete
      fullName
      checked
    }
}`

export const GET_EVENTS_BY_EVENT = gql`
  query MyQuery($event: String) {
    getEventsByEvent(event: $event) {
      athlete
      event
      id
      milliseconds
      time
      fullName
    }
  }
`;

export const GET_ATHLETE = gql`
  query MyQuery($id: ID!) {
    getAthlete(id: $id) {
      firstName
      lastName
      id
      grade
    }
  }
`