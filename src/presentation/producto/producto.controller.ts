// En: ProductoController.ts
import { InventarioTienda, Producto, SKU, Tienda, UbicacionInventario } from '../../data/model';
import { PostgresDataSource } from '../../data/PostgresDataSource';

import { FindOptionsWhere, Like } from 'typeorm';
import { ProductoModel } from './producto.model';

export class ProductoController {

    constructor(
        private productoRepository = PostgresDataSource.getRepository(Producto),
        private skuRepository = PostgresDataSource.getRepository(SKU)
    ) { }

    /**
     * Crea un nuevo Producto y su primer SKU asociado
     * Usamos una transacción para asegurar la integridad de los datos.
     */
    public createProducto = async (data: ProductoModel.CreateBody) => {
        // 1. Crear la entidad Producto
        const nuevoProducto = new Producto();
        nuevoProducto.nombreModelo = data.nombreModelo;
        nuevoProducto.descripcion = data.descripcion || '';
        nuevoProducto.marca = data.marca;
        nuevoProducto.categoria = data.categoria;

        // Guardar el producto usando el manager de la transacción
        const productoGuardado = await this.productoRepository.save(nuevoProducto);

        // 2. Crear la entidad SKU
        const nuevoSKU = new SKU();
        nuevoSKU.codigoBarras = data.codigoBarras;
        nuevoSKU.talla = data.talla;
        nuevoSKU.color = data.color;
        nuevoSKU.precioVenta = data.precioVenta;

        // 3. ¡La relación clave!
        nuevoSKU.producto = productoGuardado;

        // Guardar el SKU usando el manager de la transacción
        await this.skuRepository.save(nuevoSKU);

        // Retornamos el producto con su SKU (opcional, pero útil)
        return {
            ...productoGuardado,
            skus: [nuevoSKU] // Devolvemos el producto como si ya tuviera el SKU
        };
    }

    /**
     * Busca productos basado en query params opcionales
     */
    public searchProductos = async (query: ProductoModel.SearchQuery) => {

        // Construimos la cláusula 'where' dinámicamente
        const whereClause: FindOptionsWhere<Producto> = {};

        if (query.nombreModelo) {
            // Usamos 'Like' para búsqueda parcial (case-sensitive)
            // Para case-insensitive, usa ILike (solo en Postgres)
            whereClause.nombreModelo = Like(`%${query.nombreModelo}%`);
        }
        if (query.marca) {
            whereClause.marca = query.marca;
        }
        if (query.categoria) {
            whereClause.categoria = query.categoria;
        }

        // Buscamos los productos y traemos sus SKUs relacionados
        const productos = await this.productoRepository.find({
            where: whereClause,
            relations: {
                skus: true, // Carga la relación 'skus' definida en tu entidad Producto
            }
        });        

        return productos;
    }
    public updateInventory = async (data: ProductoModel.UpdateInventoryBody) => {
        const updatedSKUs = [];
        
        for (const item of data) {
            const sku = await this.skuRepository.findOneBy({ id: item.skuId });
            if (sku) {
                const inventarioTiendas = new InventarioTienda();
                inventarioTiendas.sku = sku;
                inventarioTiendas.stock = item.inventory;
                inventarioTiendas.ubicacion = UbicacionInventario.BODEGA; // Ejemplo de ubicación

                const tienda = await PostgresDataSource.getRepository(Tienda).findOneBy({ id: 19 });

                if(tienda) {
                    inventarioTiendas.tienda = tienda;
                } else {
                    throw new Error(`Tienda con ID ${item.productId} no encontrada.`);
                }

                sku.inventarioTiendas = [inventarioTiendas];
                const updatedSKU = await this.skuRepository.save(sku);
                updatedSKUs.push(updatedSKU);
            }
        }
        return updatedSKUs;
    }
}