// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('registerUser', ({ name, email, password }) => {
  cy.contains('Regístrate').click();
  cy.visit('/register');
  cy.get('[type="text"]').type(name);
  cy.get('[type="email"]').type(email);
  cy.get('[type="password"]').type(password);
  cy.contains('Registrarme').click();
  cy.wait(3000);
  cy.url().should('match', /login/)
})

Cypress.Commands.add('loginUser', (email, password) => {
  cy.get('[type="text"]').type(email);
  cy.get('[type="password"]').type(password);
  cy.contains('Iniciar sesión').click();
  cy.wait(3000);
})
