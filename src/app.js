import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.router.js"
import exphbs from "express-handlebars";
import { Server } from "socket.io";

import { ProductManager } from "./controllers/productManager.js";
const manager = new ProductManager();

const app = express();
const PORT = 3030;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

const io = new Server(httpServer);

io.on("connection", async (socket) => {
    console.log("A client has connected");

    socket.emit("products", await manager.getProducts());
    socket.on("deleteProduct", async (id) => {
        await manager.deleteProduct(id);
        socket.emit("products", await manager.getProducts());
    })

    socket.on("addProduct", async ({ title, description, price, thumbnail, code, stock }) => {
        await manager.addProduct(title, description, price, thumbnail, code, stock);
        socket.emit("products", await manager.getProducts());
    })
})
