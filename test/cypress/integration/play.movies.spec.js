describe('Pruebas de login', () => {
  before(() => {
    cy.exec('npm run test:clean')
    cy.log('The database is empty')
    cy.fixture('user.json').as('UserData')
    cy.visit('/login')

    cy.get('@UserData').then((userData) => {
      cy.registerUser(userData)
      cy.loginUser(userData.email, userData.password)
      cy.wait(2000)
    })
  })

  it('Debe reproducir un video', () => {
    cy.get('@UserData').then(() => {
      cy.contains('p', Cypress.env('favoriteMovie')).prev().find('a').click()
      cy.wait(3000)
      cy.get('video').should('be.visible')
    })
  })
})
