describe('Pruebas de adición/borrado de favoritos', () => {
  beforeEach(() => {
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
      cy.contains('p', Cypress.env('favoriteMovie'))
        .prev().find('>img').click();
      cy.contains('Mi lista').should('be.visible')
        .next().contains(Cypress.env('favoriteMovie'))
        .should('be.visible')
      // Eliminé Screenshots porque se guardan los videos de las pruebas
      // cy.screenshot('show-favorite-movie')
      cy.get('.header--menu ul').then($el=>{
        cy.wrap($el).invoke('show')
        cy.wrap($el).contains(userData.name).should('be.visible')
      })
    })
  })

  it('Debe eliminar favoritos', () => {
    cy.get('@UserData').then(() => {
      cy.contains('p', Cypress.env('favoriteMovie'))
        .prev().find('>img').click();
      cy.contains('Mi lista')
        .next().contains(Cypress.env('favoriteMovie'))
        .prev().find('>img').click();
      cy.contains('Mi lista').should('not.be.visible')
    })
  })
});
