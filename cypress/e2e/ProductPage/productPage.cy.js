import { productPageActions } from "./productPageActions";

describe('Verify wheather the Product page is loading fibe',()=>{


    beforeEach(()=>{
        cy.visit("/");
        cy.viewport(1440,900)
        cy.get('img[alt="close icon"]').should('be.visible').click();
    });

    it("Verify the Searched Product Page is loaded Successfully with the Expected Result",()=>{


        productPageActions.searchProduct("Persona Wanderer - Men Black Running Shoes");

        productPageActions.selectFirstProduct();
        productPageActions.verifyProductDetails();
        cy.wait(2000);
        productPageActions.addToCart();
        
        productPageActions.goToCart();
        productPageActions.verifyProductInCart('Persona Wanderer - Men Black Running Shoes');
        productPageActions.checkOut();
        cy.screenshot("Cart Page");

        productPageActions.moveToWishlist();
        cy.screenshot("Wishlist Action");
    });

});