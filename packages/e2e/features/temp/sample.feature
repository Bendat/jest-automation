Feature: Registering

    Background: Provide password
        Given a provided password 'password1234'

    Scenario: A user registers
        Given a provided username 'frankie2'
        When the user registers
        Then they are shown their profile

    Rule: A username cannot contain special characters
        Scenario Outline: A user cannot register with a special character
            Given a provided username '<username>'
            When the user registers
            Then they are displayed an error
                | message                                      |
                | A username cannot contain special characters |

            Examples:
                | username  |
                | frankie2; |
                | frankie2, |
                | frankie2" |