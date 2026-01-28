import { productPageLocators } from "./productPageLocators";

export const productPageActions = {

    // Search for the product
    searchProduct(productName) {
        cy.get(productPageLocators.searchInput)
            .click()
            .type(productName)
            .type('{enter}');
    },

    // Select the first product from the search results
    selectFirstProduct() {
        cy.get(productPageLocators.productImage, { timeout: 15000 })
            .filter(':visible')
            .first()
            .parents('a')
            .invoke('removeAttr', 'target')
            .click({ force: true });
    },

    // Verify product details on the product page
    verifyProductDetails() {
        cy.get(productPageLocators.productName)
            .should('be.visible')
            .and('contain', 'Persona Wanderer - Men Black Running Shoes');

        cy.contains('₹').should('be.visible');
        cy.get(productPageLocators.productImage)
            .filter(':visible')
            .first()
            .should(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0);
            });

        cy.get(productPageLocators.productSize)
            .should('be.visible')
            .click({ force: true });

        cy.get(productPageLocators.productSize)
            .should('have.class', 'Size_active__Hc8FA');
    },

    // Add product to the cart
    addToCart() {
        cy.contains("Add to Bag").click({ force: true });
        cy.get(productPageLocators.cartButton)
            .should('be.visible')
            .and('contain', 'Added In Your Cart');
    },

    // Go to the cart page
    goToCart() {
        cy.get(productPageLocators.viewCartBtn)
            .contains('VIEW CART')
            .click({ force: true });

        cy.url().should('include', '/checkout');
    },

    // Verify the product in the cart page
    verifyProductInCart(productName) {
        cy.origin('https://checkout.abfrl.in', { args: { productName, productPageLocators } }, ({ productName, productPageLocators }) => {
            // Verify product name
            cy.get(productPageLocators.productDescription)
                .should('be.visible')
                .and('contain.text', productName);

            // Verify product size
            cy.get(productPageLocators.sizeDropdown) // You might need to adjust the selector based on your actual HTML structure
                .should('be.visible')
                .and('contain.text', '10'); // Replace with dynamic size if needed

            // Verify quantity
            cy.contains('Quantity')
                .parent()
                .find('.CustomDropdown_selectedText__LXhIh')
                .should('contain.text', '1'); // Adjust this value based on actual selection

            // Verify GST benefit text
            cy.contains('Inclusive of GST benefit') // Check if GST benefit message is visible
                .should('be.visible');

            // Verify payable amount text
            cy.contains('Payable Amount') // Verify the text for payable amount
                .should('be.visible');
        });
    },

    // Check out button validation
    checkOut() {
        cy.get(productPageLocators.checkoutButton)
            .should('be.visible')
            .and('contain.text', 'Checkout (1)');
    },

    // Move product to wishlist
    moveToWishlist() {
        cy.get(productPageLocators.moveToWishlistButton)
            .should('be.visible')
            .and('contain.text', 'Move to wishlist')
            .click();
    }
};
