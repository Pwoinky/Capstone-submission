import books from "../fixtures/mockDb/books.json";

// Get a 200 status //

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
    cy.intercept("GET", "http://localhost:5200/shirts", {
      fixture: "mockDb/products.json",
    });
    cy.visit("http://localhost:4200/shirts");
    cy.wait(1000);
    cy.get("button")
      .first()
      .click();
    cy.wait(2000);
  });

  // Remove an Item from the Shopping Cart //

  it("The remove item button is working", () => {
    cy.intercept("GET", "http://localhost:5200/shirts", {
      fixture: "mockDb/products.json",
    });
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
    cy.intercept("GET", "http://localhost:5200/books", {
      fixture: "mockDb/books.json",
    });
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
    cy.intercept("GET", "http://localhost:5200/shirts", {
      fixture: "mockDb/products.json",
    });
    cy.visit("http://localhost:4200");
    cy.wait(1000);
    cy.get("div.grid-child")
      .first()
      .should("be.visible");
    cy.wait(2000);
  });

  // The Product card is Rendering //

  it("The last product card is rendering", () => {
    cy.intercept("GET", "http://localhost:5200/books", {
      fixture: "mockDb/books.json",
    }).as("getBooks-fixture");
    cy.visit("http://localhost:4200");
    cy.wait(1000);
    cy.get("img")
      .last()
      .should("be.visible");
    cy.wait(2000);
  });

  // Check the second heading in "Admin" is Rendering //

  it("The the book list heading is rendering", () => {
    cy.intercept("GET", "http://localhost:5200/shirts", {
      fixture: "mockDb/products.json",
    });
    cy.intercept("GET", "http://localhost:5200/books", {
      fixture: "mockDb/books.json",
    }).as("getBooks-fixture");
    cy.visit("http://localhost:4200/login");
    cy.wait(1000);
    cy.get("#username")
      .should("be.visible")
      .type("admin@admin.com");
    cy.get("#inputPassword")
      .should("be.visible")
      .type("admin@123");
    cy.get("#loginButton").click();
    cy.wait(1000);
    cy.get("h2.bookList").should("be.visible");
    cy.wait(2000);
  });

  // h1 contains the correct information //

  it("The h1 contains the correct text", () => {
    cy.intercept("GET", "http://localhost:5200/shirts", {
      fixture: "mockDb/products.json",
    });
    cy.visit("http://localhost:4200/home");
    cy.wait(1000);
    cy.get("h1").contains("Products");
    cy.wait(2000);
  });
});

// Mock DB tests //

describe("Mock DB tests", () => {
  // Mock Add Shirt Test //

  it("Mocked Add Shirt", () => {
    cy.intercept("GET", "http://localhost:5200/products", {
      fixture: "mockDb/products.json",
    }).as("getShirts-fixture");
    cy.intercept("GET", "http://localhost:5200/books", {
      fixture: "mockDb/books.json",
    }).as("getBooks-fixture");
    cy.visit("http://localhost:4200/login");
    cy.get("#username")
      .should("be.visible")
      .type("admin@admin.com");
    cy.get("#inputPassword")
      .should("be.visible")
      .type("admin@123");
    cy.get("#loginButton").click();
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
    cy.readFile("cypress/fixtures/mockDb/products.json").then((list) => {
      list.push({
        id: 418,
        name: "New Mock Creator Shirt",
        image: "../../assets/images/creatorShirt.png",
        price: 50,
      });
      cy.writeFile("cypress/fixtures/mockDb/products.json", list);
    });
    cy.intercept("POST", "http://localhost:5200/products", {
      fixture: "mockDb/products.json",
    }).as("newShirt-fixture");
    cy.wait(1000);
    cy.get("button")
      .should("be.visible")
      .click();
    cy.wait(2000);
  });

  // Mock Delete Book test //

  it("Mocked Delete Shirt", () => {
    cy.intercept("GET", "http://localhost:5200/products", {
      fixture: "mockDb/products.json",
    }).as("getProducts-fixture");
    cy.intercept("GET", "http://localhost:5200/books", {
      fixture: "mockDb/books.json",
    }).as("getBooks-fixture");
    cy.visit("http://localhost:4200/login");
    cy.get("#username")
      .should("be.visible")
      .type("admin@admin.com");
    cy.get("#inputPassword")
      .should("be.visible")
      .type("admin@123");
    cy.get("#loginButton").click();
    cy.wait(1000);
    cy.intercept("DELETE", "http://localhost:5200/products/**", {
      fixture: "mockDb/products.json",
    }).as("deleteBook-fixture");
    cy.get("button.deleteShirtBtn")
      .last()
      .click();
    cy.get("#shirtDelete").click({force: true});
    cy.readFile("cypress/fixtures/mockDb/products.json").then((shirt) => {
      shirt.pop();
      cy.writeFile("cypress/fixtures/mockDb/products.json", shirt);
      cy.wait(2000);
    });
  });

  // Mock Update Book test //

  it("Mocked Update Book", () => {
    cy.intercept("GET", "http://localhost:5200/products", {
      fixture: "mockDb/products.json",
    }).as("getProducts-fixture");
    cy.intercept("GET", "http://localhost:5200/books", {
      fixture: "mockDb/books.json",
    }).as("getBooks-fixture");
    cy.visit("http://localhost:4200/login");
    cy.get("#username")
      .should("be.visible")
      .type("admin@admin.com");
    cy.get("#inputPassword")
      .should("be.visible")
      .type("admin@123");
    cy.get("#loginButton").click();
    cy.intercept("GET", "http://localhost:5200/books/**", {
      body: books[0],
    });
    cy.wait(1000);
    cy.get("button.updateBookBtn")
      .first()
      .click();
    cy.wait(1000);
    cy.get("#name")
      .should("be.visible")
      .clear()
      .type("Mock Be Curious Book");
    cy.readFile("cypress/fixtures/mockDb/books.json").then((data) => {
      data[0].name = "Mock Be Curious Book";
      cy.writeFile("cypress/fixtures/mockDb/books.json", JSON.stringify(data));
    });
    cy.intercept(
      "PUT",
      "http://localhost:5200/books/**",
      {
        body: books[0],
      }
    ).as("newBook-fixture");
    cy.wait(1000);
    cy.get('button[type="submit"]')
      .should("be.visible")
      .click();
    cy.wait(2000);
  });
});

// // Real Time DB tests //

// // Update a book //
// describe("update a book title", () => {
//   it("the update button is working", () => {
//     cy.visit("http://localhost:4200/Admin");
//     cy.get("button.updateBookBtn")
//       .first()
//       .click();
//     cy.get("#name")
//       .should("be.visible")
//       .clear()
//       .type("Test Shirt");
//     cy.get('button[type="submit"]')
//       .should("be.visible")
//       .click();
//   });
// });

// // Delete the test shirt //
// describe("delete the test shirt", () => {
//   it("the test shirt has been deleted and is working", () => {
//     cy.visit("http://localhost:4200/Admin");
//     cy.get("button.deleteShirtBtn")
//       .last()
//       .click();
//   });
// });
