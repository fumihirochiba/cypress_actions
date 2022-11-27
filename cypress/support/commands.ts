/// <reference types="cypress" />
/// <reference types="cypress-get-by-label" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import 'cypress-get-by-label/commands'

// 'div.card-body'を"getCardByText"として定義
Cypress.Commands.add("getCardByText", (text) => {
    const selector = 'div.card-body'
    cy.contains(selector, text)
});

// 新しいウィンドウで開かないようように、"このプランで予約”を定義
Cypress.Commands.add("openReservationPlan", (planName) => {
    const buttonText = "このプランで予約"
    cy
    .getCardByText(planName)
    .contains(buttonText)
    .invoke("removeAttr", "target")
    .click()
});

// 値を一度削除してから入力するfillメソッドを定義
Cypress.Commands.add("fill", {prevSubject:'element'}, (subject, text) => {
    if (subject) {
        cy.wrap(subject).clear()
        cy.wrap(subject).type(text)
    }
});