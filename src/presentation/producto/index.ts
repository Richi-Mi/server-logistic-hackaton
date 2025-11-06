// En: productoRoutes.ts
import { Elysia } from 'elysia';
import { ProductoController } from './producto.controller';
import { ProductoModel } from './producto.model';

export const productoRoutes = new Elysia({ prefix: "/producto" })
    .decorate('productoController', new ProductoController())

    /**
     * Ruta POST para crear un nuevo producto
     */
    .post("/", async ({ status, body, productoController }) => {
        
        try {
            const nuevoProducto = await productoController.createProducto(body);
            return status(201, nuevoProducto); // 201 Created
        } catch (error: any) {
            // Manejo de error básico (ej. SKU o código de barras duplicado)
            if (error.code === '23505') { // Código de violación de constraint 'unique'
                return status(409, { message: "Error: El producto o código de barras ya existe." });
            }
            console.error(error);
            return status(500, { message: "Error interno del servidor" });
        }
    }, {
        body: ProductoModel.createBody
    })

    /**
     * Ruta GET para buscar productos con query params
     */
    .get("/", async ({ query, productoController }) => {
        
        const productos = await productoController.searchProductos(query);
        return productos; // Retorna 200 OK por defecto

    }, {
        query: ProductoModel.searchQuery
    })
    .put("/updateInventory", async ({ body, productoController, status }) => {
        try {
            const updatedProduct = await productoController.updateInventory(body);
            return status(200, updatedProduct);
        } catch (error) {
            console.error(error);
            return status(500, { message: "Error interno del servidor" });
        }
    }, {
        body: ProductoModel.updateInventoryBody
    })

// No olvides exportar e importar 'productoRoutes' en tu 'index.ts' principal
// y usarlo con .use(productoRoutes)