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
            date
            team
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
            fullName
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
            date
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
            date
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
            date
        }
    }
`

export const GET_ADMIN_BY_EMAIL = gql`
    query MyQuery($email: String!) {
        getAdminByEmail(email: $email) {
            email
            id
            team
            image
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
            date
        }
    }
`

export const GET_TEAMEVENTS_BY_TEAM_AND_EVENT = gql`
    query MyQuery($event: String!, $team: String!) {
        getTeamEventsByTeamAndEvent(event: $event, team: $team) {
            event_id_1
            event_id_2
            event_id_3
            event_id_4
            ath1 {
                athlete
                time
                milliseconds
                fullName
                date
                event
                grade
                id
                created_at
            }
            ath2 {
                athlete
                time
                milliseconds
                fullName
                date
                event
                grade
                id
                created_at
            }
            ath3 {
                athlete
                time
                milliseconds
                fullName
                date
                event
                grade
                id
                created_at
            }
            ath4 {
                athlete
                time
                milliseconds
                fullName
                date
                event
                grade
                id
                created_at
            }
            date
            event
            id
            team
            milliseconds
            time
        }
    }
`

export const GET_TEAMEVENTS_BY_TEAM = gql`
    query MyQuery($team: String!) {
        getTeamEventsByTeam(team: $team) {
            event_id_1
            event_id_2
            event_id_3
            event_id_4
            ath1 {
                athlete
                time
                milliseconds
                fullName
                date
                event
                grade
                id
                created_at
            }
            ath2 {
                athlete
                time
                milliseconds
                fullName
                date
                event
                grade
                id
                created_at
            }
            ath3 {
                athlete
                time
                milliseconds
                fullName
                date
                event
                grade
                id
                created_at
            }
            ath4 {
                athlete
                time
                milliseconds
                fullName
                date
                event
                grade
                id
                created_at
            }
            date
            event
            id
            team
            time
        }
    }
`
export const GET_TEAMEVENTS_BY_EVENT = gql`
    query MyQuery($event: String!) {
        getTeamEventsByEvent(event: $event) {
            event_id_1
            event_id_2
            event_id_3
            event_id_4
            ath1 {
                athlete
                time
                milliseconds
                fullName
                date
                event
                grade
                id
                created_at
            }
            ath2 {
                athlete
                time
                milliseconds
                fullName
                date
                event
                grade
                id
                created_at
            }
            ath3 {
                athlete
                time
                milliseconds
                fullName
                date
                event
                grade
                id
                created_at
            }
            ath4 {
                athlete
                time
                milliseconds
                fullName
                date
                event
                grade
                id
                created_at
            }
            date
            event
            id
            team
            time
        }
    }
`
