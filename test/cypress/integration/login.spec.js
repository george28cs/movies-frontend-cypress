describe('Pruebas de login', () => {
  before(() => {
    cy.exec('npm run test:clean')
    cy.log('The database is empty')
  })
  beforeEach(() => {
    cy.fixture('user.json').as('UserData')
    cy.visit('/login')
    cy.contains('button', 'Iniciar sesión').should('be.visible')
  })

  it('Debe registrar una cuenta', () => {
    cy.get('@UserData').then(userData => {
      cy.registerUser(userData)
    })
  })

  it('Debe fallar el inicio de sesión con usuario inexistente', () => {
    cy.loginUser('fail@user.com', 'password')
    // cy.screenshot('login-user')
  })

  it('Debe iniciar sesión', () => {
    cy.get('@UserData').then(({ email, password }) => {
      cy.loginUser(email, password)
      cy.contains('h2', '¿Qué quieres ver hoy?').should('be.visible')
    })
  })

  it('Debe cerrar sesión', () => {
    cy.get('@UserData').then(({ email, password }) => {
      cy.loginUser(email, password)
      cy.get('.header--menu ul').then($el=>{
        cy.wrap($el).invoke('show')
        cy.contains('a', 'Cerrar sesión').click()
        cy.wait(2000)
        cy.url().should('match', /login/)
      })
    })
  })

  after(() => {
    cy.log('Tests finalizados')
  })
});
