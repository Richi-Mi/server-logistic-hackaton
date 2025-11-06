import { t } from 'elysia';

export namespace ProductoModel {
    
    // Esquema para crear un nuevo producto y su primer SKU
    export const createBody = t.Object({
        // Datos del Producto (Modelo)
        nombreModelo: t.String(),
        descripcion: t.Optional(t.String()),
        marca: t.String(),
        categoria: t.String(),

        // Datos del primer SKU (Variante)
        codigoBarras: t.String(),
        talla: t.String(),
        color: t.String(),
        precioVenta: t.Number()
    });
    
    export type CreateBody = typeof createBody.static;

    // Esquema para los query params de búsqueda
    export const searchQuery = t.Object({
        nombreModelo: t.Optional(t.String()),
        marca: t.Optional(t.String()),
        categoria: t.Optional(t.String()),
    });

    export type SearchQuery = typeof searchQuery.static;

    export const updateInventoryBody = t.Array(t.Object({
        productId: t.Number(),
        skuId: t.Number(),
        inventory: t.Number()
    }));

    export type UpdateInventoryBody = typeof updateInventoryBody.static;
}