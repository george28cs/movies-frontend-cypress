describe('Pruebas de adición de selección de favoritos', () => {
  before(() => {
    cy.exec('npm run test:clean')
    cy.log('The database is empty')
    cy.fixture('user.json').as('UserData')
    cy.visit('/login')

    cy.get('@UserData').then((userData) => {
      cy.registerUser(userData)
      cy.loginUser(userData.email, userData.password)
      cy.visit('/')
      cy.wait(2000)
    })
  })

  it('Debe agregar un favorito', () => {
    cy.get('@UserData').then(userData => {
      cy.contains('p', Cypress.env('favoriteMovie')).prev().find('>img').click();
      cy.contains('Mi lista').should('be.visible')
        .next().contains(Cypress.env('favoriteMovie')).should('be.visible')
      cy.screenshot('show-favorite-movie')
      cy.get('.header--menu ul').then($el=>{
        cy.wrap($el).invoke('show')
        cy.screenshot('show-username')
        cy.wrap($el).contains(userData.name).should('be.visible')
      })
    })
  })
});
