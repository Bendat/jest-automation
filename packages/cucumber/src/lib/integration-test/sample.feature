Feature: A sample feature

    Scenario: A Scenario
        Given a dog
        When a jaguar
        Then a jog

    Scenario Outline: An outline
        Given a <animal> with an <object>
        When a whale
        Then a jog

        Examples:
            | animal | object |
            | dog    | hammer |
            | cat    | rope   |

    
    Rule: a rule
        Background: 
            Given a dog
            
        Scenario: Rule Scenario
            When a cat