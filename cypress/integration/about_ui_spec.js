
describe('About page', ()=> {
    it('Should load about page', ()=>{

        cy.visit('http://localhost:3000')

        cy.contains('About').click()

        cy.url().should('include', '/about')

        cy.contains('This todo app was created by Franco')
    })
})