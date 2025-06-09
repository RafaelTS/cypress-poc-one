import { format, prepareLocalStorage } from '../support/utils'

describe('Dev Finances', () => {

  beforeEach(() => {
    cy.visit('https://devfinance-agilizei.netlify.app/',{        
        onBeforeLoad: (win) => 
            prepareLocalStorage(win)
    }) 
  });

  it('Add Entrance', () => {
    cy.get('#transaction .button').click()
    cy.get('#description').type('Payment')
    cy.get('[name=amount]').type(12000)
    cy.get('[type=date]').type('2025-05-05')
    cy.get('button').contains('Salvar').click()

    cy.get('#data-table tbody tr').should('have.length', 3)

  });

  it('Add Costs', () => {
    cy.get('#transaction .button').click()
    cy.get('#description').type('Rent')
    cy.get('[name=amount]').type(-2000)
    cy.get('[type=date]').type('2025-05-05')
    cy.get('button').contains('Salvar').click()

    cy.get('#data-table tbody tr').should('have.length', 3)

  });

  it('Remove Entrance and Costs', () => {
    
    cy.get('td.description')
      .contains("Payment")
      .parent()
      .find('img[onClick*=remove]')
      .click()

    cy.get('td.description')
      .contains("Cost")
      .siblings()
      .children('img[onClick*=remove]')
      .click()

  });

  it('Validate Balance with Several Transactions', () => {
    let incomes = 0
    let expenses = 0

    cy.get('#data-table tbody tr')
      .each(($el, index, $list) => {
        
        cy.get($el).find('td.income, td.expense').invoke('text').then(text => {

          cy.log(text)
          cy.log(format(text))
          if (text.includes('-')) {
            expenses = expenses + format(text)
          } else {
            incomes = incomes + format(text)
          }

        })
      })


    cy.get('#totalDisplay').invoke('text').then(text => {
      let formattedTotalDisplay = format(text)
      let expectedTotal = incomes + expenses

      expect(formattedTotalDisplay).to.eq(expectedTotal)
    })

  });
});