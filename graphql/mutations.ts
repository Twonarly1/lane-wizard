import { gql } from "@apollo/client"

export const ADD_EVENT = gql`
    mutation MyMutation(
        $athlete: ID!
        $time: String!
        $event: String!
        $milliseconds: Int
        $fullName: String!
        $grade: Int!
        $date: String!
        $team: String!
    ) {
        insertEvent(
            athlete: $athlete
            time: $time
            event: $event
            milliseconds: $milliseconds
            fullName: $fullName
            grade: $grade
            date: $date
            team: $team
        ) {
            athlete
            time
            event
            milliseconds
            fullName
            grade
            date
            team
        }
    }
`

export const ADD_TEAM_EVENT = gql`
    mutation MyMutation(
        $event_id_1: ID!
        $event_id_2: ID!
        $event_id_3: ID!
        $event_id_4: ID!
        $date: String!
        $team: String!
        $event: String!
        $time: String!
        $milliseconds: Int!
    ) {
        insertTeamEvent(
            event_id_1: $event_id_1
            event_id_2: $event_id_2
            event_id_3: $event_id_3
            event_id_4: $event_id_4
            date: $date
            team: $team
            event: $event
            time: $time
            milliseconds: $milliseconds
        ) {
            event_id_1
            event_id_2
            event_id_3
            event_id_4
            date
            team
            event
            time
            milliseconds
        }
    }
`

export const DELETE_EVENT = gql`
    mutation MyMutation($id: ID!) {
        deleteEvent(id: $id) {
            athlete
            time
            event
            milliseconds
            fullName
            grade
            date
            team
        }
    }
`
export const DELETE_TEAM_EVENT = gql`
    mutation MyMutation($id: ID!) {
        deleteTeamEvent(id: $id) {
            date
            event
            event_id_1
            event_id_2
            event_id_3
            event_id_4
            id
            milliseconds
            team
            time
            ath1 {
                athlete
                created_at
                date
                event
                fullName
                grade
                id
                milliseconds
                team
                time
            }
            ath2 {
                athlete
                created_at
                date
                event
                fullName
                grade
                id
                milliseconds
                team
                time
            }
            ath3 {
                athlete
                created_at
                date
                event
                fullName
                grade
                id
                milliseconds
                team
                time
            }
            ath4 {
                athlete
                created_at
                date
                event
                fullName
                grade
                id
                milliseconds
                team
                time
            }
        }
    }
`

export const ADD_FEEDBACK = gql`
    mutation MyMutation($admin: Boolean!, $email: String!, $feedback: String!, $name: String!) {
        insertFeedback(admin: $admin, email: $email, feedback: $feedback, name: $name) {
            admin
            email
            feedback
            id
            name
        }
    }
`
