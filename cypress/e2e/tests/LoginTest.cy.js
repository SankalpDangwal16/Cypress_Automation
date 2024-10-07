describe('Swag Labs Login Test', () => {
    it('Should login successfully with valid credentials', () => {
        // Clear cookies and local storage to avoid any stale data
        cy.clearCookies();
        cy.clearLocalStorage();
        
        // Visit the Swag Labs login page
        cy.visit('https://www.saucedemo.com/');
        
        // Take a screenshot of the login page
        cy.screenshot('Login_Page');
        
        // Use '#user-name' for the username input field
        cy.get('#user-name').should('be.visible').type('standard_user');
        
        // Use '#password' for the password input field
        cy.get('#password').should('be.visible').type('secret_sauce');
        
        // Use '#login-button' for the login button
        cy.get('#login-button').click();
        
        // Validate that login was successful by checking the URL
        cy.url().should('include', '/inventory.html');
        
        // Validate that the inventory list is visible
        cy.get('.inventory_list').should('be.visible');
        
        // Take a screenshot of the homepage after successful login
        cy.screenshot('Home_Page_After_Login');
    });
  });
  