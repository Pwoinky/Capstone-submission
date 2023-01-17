/* Get a 200 status //

describe("Check a 200 status is received", () => {
  it("The status is 200", () => {
    cy.request("http://localhost:4200").should((response) => {
      expect(response.status).to.eq(200);
    });
    cy.wait(2000);
  });
});

// Add an Item to the Shopping Cart Test //

describe("Test shopping cart functionality", () => {
  it("The add item button is working", () => {
    cy.visit("http://localhost:4200/shirts");
    cy.wait(1000);
    cy.get("button")
      .first()
      .click();
    cy.wait(2000);
  });

  // Remove an Item from the Shopping Cart //

  it("The remove item button is working", () => {
    cy.visit("http://localhost:4200/shirts");
    cy.wait(1000);
    cy.get("button")
      .first()
      .click();
    cy.wait(1000);
    cy.get("nav")
      .find('[routerLink="/cart"]')
      .click();
    cy.wait(1000);
    cy.get("button.removeButton").click();
    cy.wait(2000);
  });

  // Check the Total on the shopping cart is correct //

  it("The Total should equal 31", () => {
    cy.visit("http://localhost:4200/books");
    cy.wait(1000);
    cy.get("button")
      .first()
      .click();
    cy.wait(1000);
    cy.get("nav")
      .find('[routerLink="/cart"]')
      .click();
    cy.wait(1000);
    cy.get("div.total").contains(31);
    cy.wait(2000);
  });
});

// Check 3 elements are rendering //

// Check Element 1 "Shirts" is Rendering //

describe("Check elements are rendering or have the correct text", () => {
  it("The shirt element is rendering", () => {
    cy.visit("http://localhost:4200");
    cy.wait(1000);
    cy.get("div.grid-child")
      .first()
      .should("be.visible");
    cy.wait(2000);
  });

  // The Product card is Rendering //

  it("The last product card is rendering", () => {
    cy.visit("http://localhost:4200");
    cy.wait(1000);
    cy.get("img")
      .last()
      .should("be.visible");
    cy.wait(2000);
  });

  // Check the second heading in "Admin" is Rendering //

  it("The the book list heading is rendering", () => {
    cy.visit("http://localhost:4200/Admin");
    cy.wait(1000);
    cy.get("h2.bookList").should("be.visible");
    cy.wait(2000);
  });

  // h1 contains the correct information //

  it("The h1 contains the correct text", () => {
    cy.visit("http://localhost:4200/home");
    cy.wait(1000);
    cy.get("h1").contains("Products");
    cy.wait(2000);
  });
});

// Mock DB tests //

describe("DB tests", () => {
  // Add Shirt Test //

  it("Add Shirt", () => {
    cy.visit("http://localhost:4200/Admin");
    cy.get("button.newShirtBtn").click();
    cy.get("#id")
      .should("be.visible")
      .type("418");
    cy.wait(1000);
    cy.get("#name")
      .should("be.visible")
      .type("New Mock Ultimate Creator Shirt");
    cy.wait(1000);
    cy.get("#image")
      .should("be.visible")
      .type("../../assets/images/creatorShirt.png");
    cy.wait(1000);
    cy.get("#price")
      .should("be.visible")
      .type("50");
    cy.wait(1000);
    cy.get("button")
      .should("be.visible")
      .click();
    cy.wait(2000);
  });

  // Delete Book test //

  it("Delete Shirt", () => {
    cy.visit("http://localhost:4200/Admin");
    cy.wait(1000);
    cy.get("button.deleteShirtBtn")
      .last()
      .click();
    cy.wait(2000);
  });

  // Update Book test //

  it("Update Book", () => {
    cy.visit("http://localhost:4200/Admin");
    cy.wait(1000);
    cy.get("button.updateBookBtn")
      .first()
      .click();
    cy.wait(1000);
    cy.get("#name")
      .should("be.visible")
      .clear()
      .type("Be Inspiring Book");
    cy.wait(1000);
    cy.get('button[type="submit"]')
      .should("be.visible")
      .click();
    cy.wait(2000);
  });
});

*/
