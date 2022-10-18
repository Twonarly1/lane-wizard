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
