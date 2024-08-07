import { CartManager } from "../controllers/cartManager.js";
import { ProductManager } from "../controllers/productManager.js";

async function runTestProducts() {const productManager = new ProductManager();
    try {
        const productManager = new ProductManager();
        await productManager.init();
        console.log("\n-----------Here begin the tests for the productManager module.----------");
        console.log("\nTesting addProduct method:");
        console.log("\nAdding the first product.:");
        productManager.addProduct("Arroz", "Marolio", 200, "sin imagen", "abc123", 25);
        console.log("\nAdding the second product.:");
        productManager.addProduct("Fideos", "Marolio", 200, "sin imagen", "abc124", 25);
        console.log("\nAdding the third product.:");
        productManager.addProduct("Aceite", "Marolio", 200, "sin imagen", "abc125", 50);
        console.log("\nAdding a product with duplicate code. ");
        productManager.addProduct("Azucar", "Marolio", 200, "sin imagen", "abc125", 10);
        console.log("\nAdding a product with empty fields.");
        productManager.addProduct("Aceite", "", 200, "sin imagen", "abc126", 50);

        console.log("\nTesting getProducts method:");
        const productsList = productManager.getProducts();
        console.log("Products:", productsList);

        console.log("\nTesting getProductById method:");
        const productId = 2;
        const productById = productManager.getProductById(productId);
        console.log(`Product with ID ${productId}:`, productById);
        return;

    } catch (error) {
        console.error("Error running tests:", error);
        return;
    }
}
async function runTestsCarts() {const cartManager = new ProductManager();
    try {
        const cartManager = new CartManager();
        await cartManager.init();
        console.log("\n-----------Here begin the tests for the carttManager module.----------");
        console.log("\nTesting addCart method:");
        console.log("\nAdding the first cart.:");
        cartManager.addCart();
        return;

    } catch (error) {
        console.error("Error running tests:", error);
        return;
    }
}
runTestProducts()
runTestsCarts()
