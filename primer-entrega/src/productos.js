const fs = require('fs');

class ProductManager {
    static id = 0;

    constructor(ruta) {
        this.ruta = ruta;
        this.products = [];
    }


    getProductId() {
        return ProductManager.id + 1;
    }


    getProductById(id) {
        this.readFile();
        const productoEncontrado = this.products.find(producto => producto.id === id);

        if (productoEncontrado) {
            return productoEncontrado
        } else {
            return ['No existe producto']
        }
    }


    addStatus = (state) => {
        if(state != true){
            state = true;
        }
        return state;
    }


    getProducts = (limit) => {
        this.readFile();

        if (limit) {
            const products = [];

            for (let i = 0; i < limit; i++) {
                products.push(this.products[i]);
            }
            return products;
        }
        return this.products
    }



    deleteProduct = (id) => {
        this.readFile();
        const product = this.products.findIndex(producto => producto.id === id);

        if (product !== -1) {
            this.products.splice(product, 1);
            
            fs.writeFileSync(this.ruta, JSON.stringify(this.products));
            console.log('Producto eliminado', product);

        } else {
            console.log('Error, el producto no existe', id);
        }
    }


    createFile = () => {
        const cadenaArchivo = JSON.stringify(this.products);
        fs.writeFileSync(this.ruta, cadenaArchivo);
        console.log('Archivo creado');
    }


    fillFile = (arrayProducts) => {
        //this.products.push(obj);
        console.log('EEEEE', arrayProducts);
        const cadenaArchivo = JSON.stringify(arrayProducts);
        fs.writeFileSync(this.ruta, cadenaArchivo);
        console.log('Archivo actualizado');
    }


    readFile = () => {
        const usuarios = fs.readFileSync(this.ruta, 'utf-8');
        this.products = JSON.parse(usuarios);
    }


    addProduct = (product) => {
        const fileProducts = fs.readFileSync(this.ruta, 'utf-8');
        const obj = JSON.parse(fileProducts);

        //console.log('PEPEEE',obj);

        if (obj.length === 0) {
            const productNew = {
                id: ProductManager.id = this.getProductId(),
                title: product.title,
                description: product.description,
                price: product.price,
                code: product.code,
                stock: product.stock,
                status: this.addStatus(product.status)
            }
            obj.push(productNew);
            this.fillFile(obj);
            console.log('SE GUARDO PRODUCTO NUEVO EN ARCHIVO VACIO', productNew);
            return;
        }

        const prod = obj.filter((_product) => _product.code === product.code);

        if (prod && prod.length > 0) {
            console.log('ERROR-CODIGO REPETIDO');
            return;
        }

        const productNew = {
            id: ProductManager.id = this.getProductId(),
            title: product.title,
            description: product.description,
            price: product.price,
            code: product.code,
            stock: product.stock,
            status: this.addStatus(product.status)
        }
        obj.push(productNew);
        this.fillFile(obj);
        console.log('SE GUARDO PRODUCTO NUEVO', productNew);
    }


    updateProduct = (product, id) => {
        const fileProducts = fs.readFileSync(this.ruta, 'utf-8');
        const obj = JSON.parse(fileProducts);
        const producPosition = obj.findIndex(_product => _product.id === id);
        
        obj[producPosition].title = product.title;
        obj[producPosition].description = product.description;
        obj[producPosition].price = product.price;
        obj[producPosition].code = product.code;
        obj[producPosition].stock = product.stock;

        
        fs.writeFileSync(this.ruta, JSON.stringify(obj));
        console.log('Update realizado');
    }

}


module.exports = ProductManager;

const manager = new ProductManager('./productos.json');
const products = [
    {
        title: 'Computadora',
        description: 'interactivos',
        price: 300,
        code: '2222',
        stock: 20,
    },
    {
        title: 'Televisor',
        description: 'interactivos',
        price: 300,
        code: '1111',
        stock: 20,
    },
    {
        title: 'Heladera',
        description: 'interactivos',
        price: 300,
        code: '4444',
        stock: 20,
    },
    {
        title: 'Mesa',
        description: 'interactivos',
        price: 300,
        code: '3333',
        stock: 20,
    },
    {
        title: 'Silla',
        description: 'interactivos',
        price: 300,
        code: '5555',
        stock: 20,
    },
    {
        title: 'Aire acondicionado',
        description: 'interactivos',
        price: 300,
        code: '6666',
        stock: 20,
    },
    {
        title: 'Estufa',
        description: 'interactivos',
        price: 300,
        code: '7777',
        stock: 20,
    },
    {
        title: 'Ventilador',
        description: 'interactivos',
        price: 300,
        code: '8888',
        stock: 20,
    },
    {
        title: 'Monitor',
        description: 'interactivos',
        price: 300,
        code: '9999',
        stock: 20,
    },
    {
        title: 'Puerta',
        description: 'interactivos',
        price: 300,
        code: '1000',
        stock: 20,
    }
];

manager.createFile();

products.forEach(product => {
    manager.addProduct(product);
})


