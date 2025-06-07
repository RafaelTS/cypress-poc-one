describe('Dev Finances', () => {

  beforeEach(() => {
    cy.visit('https://devfinance-agilizei.netlify.app/')
  });


  it('Add Entrance', () => {
    cy.get('#transaction .button').click()
    cy.get('#description').type('Payment')
    cy.get('[name=amount]').type(12000)
    cy.get('[type=date]').type('2025-05-05')
    cy.get('button').contains('Salvar').click()

    cy.get('#data-table tbody tr').should('have.length', 1)

  });

  it('Add costs', () => {
    cy.get('#transaction .button').click()
    cy.get('#description').type('Rent')
    cy.get('[name=amount]').type(-2000)
    cy.get('[type=date]').type('2025-05-05')
    cy.get('button').contains('Salvar').click()

    cy.get('#data-table tbody tr').should('have.length', 1)
    
  });

  it('Remove Entrance and Costs', () => {
    const entrance = 'Payment'
    const cost = 'Rent'

    cy.get('#transaction .button').click()
    cy.get('#description').type(entrance)
    cy.get('[name=amount]').type(1000)
    cy.get('[type=date]').type('2025-05-05')
    cy.get('button').contains('Salvar').click()


    cy.get('#transaction .button').click()
    cy.get('#description').type(cost)
    cy.get('[name=amount]').type(-500)
    cy.get('[type=date]').type('2025-05-05')
    cy.get('button').contains('Salvar').click()

    cy.get('td.description')
      .contains(entrance)
      .parent()
      .find('img[onClick*=remove]')  
      .click()   

    cy.get('td.description')
      .contains(cost)
      .siblings()
      .children('img[onClick*=remove]')  
      .click()     

  });
})