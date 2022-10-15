import { gql } from "@apollo/client"

export const GET_EVENT_USING_ATHLETE = gql`
    query MyQuery($id: ID!) {
        getEventUsingAthlete(id: $id) {
            athlete
            event
            id
            time
            milliseconds
            fullName
            grade
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

export const GET_ATHLETES_BY_TEAM = gql`
    query MyQuery($team: String!) {
        getAthleteByTeam(team: $team) {
            firstName
            fullName
            grade
            id
            lastName
            team
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
        }
    }
`

export const GET_EVENTS_BY_EVENT = gql`
    query MyQuery($event: String) {
        getEventsByEvent(event: $event) {
            athlete
            event
            id
            milliseconds
            time
            fullName
            team
            grade
        }
    }
`

export const GET_ATHLETE = gql`
    query MyQuery($fullName: String!) {
        getAthlete(fullName: $fullName) {
            firstName
            lastName
            id
            grade
            fullName
        }
    }
`

export const GET_EVENT_BY_ATHLETE = gql`
    query MyQuery($fullName: String!) {
        getEventByAthlete(fullName: $fullName) {
            event
            athlete
            fullName
            id
            milliseconds
            time
            team
            grade
        }
    }
`

export const GET_EVENTS_BY_TEAM = gql`
    query MyQuery($team: String!, $first: Int, $after: Int) {
        getEventByTeam(team: $team, first: $first, after: $after) {
            athlete
            event
            id
            fullName
            milliseconds
            team
            time
            grade
        }
    }
`

export const GET_ADMIN_BY_EMAIL = gql`
    query MyQuery($email: String!) {
        getAdminByEmail(email: $email) {
            email
            id
            team
        }
    }
`
export const GET_EVENTS_BY_TEAM_AND_EVENT = gql`
    query MyQuery($event: String!, $team: String!) {
        getEventsByTeamAndEvent(event: $event, team: $team) {
            athlete
            event
            fullName
            grade
            id
            milliseconds
            team
            time
        }
    }
`
