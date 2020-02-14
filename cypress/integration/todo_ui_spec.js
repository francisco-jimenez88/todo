

// Här skriver vi våra UI tester

// mocha syntax
describe('UI test for Todo app', ()=> { // valfri testrubrik som beskriver att detta är en samling av test för din app/sida

    it('Should ', ()=> {

        cy.visit('http://localhost:3000/')

        cy.get('input').type("Go, go, go, go go, go, go, shawty").should('have.value',"Go, go, go, go go, go, go, shawty")
        cy.get('button').click()

        cy.get('input').type("It's your birthday").should('have.value',"It's your birthday")
        cy.get('button').click()

        cy.get('input').type("We gon' party like it's yo birthday").should('have.value',"We gon' party like it's yo birthday")
        cy.get('button').click()

        cy.get('input').type("We gon' sip Bacardi like it's your birthday").should('have.value',"We gon' sip Bacardi like it's your birthday")
        cy.get('button').click()

        cy.get('input').type("And you know we don't give a f*ck").should('have.value',"And you know we don't give a f*ck")
        cy.get('button').click()

        cy.get('input').type("It's not your birthday!").should('have.value',"It's not your birthday!")
        cy.get('button').click()

        cy.get('a.remove').each(()=> {
            cy.get('a.remove').first().click()
        })
        cy.url().should('include', '/')

        // Kontrollera att vi hamnar på rätt sökväg tex /todo/delete
    })
})



