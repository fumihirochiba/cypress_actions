
declare namespace Cypress {
    interface Chainable<Subject> {
        getCardByText(text: string): Chainable<Subject>
        openReservationPlan(planName: string): Chainable<Subject>
        fill(text: string): Chainable<Subject>
    }
}