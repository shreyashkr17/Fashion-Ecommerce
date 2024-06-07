const DatabaseConfig = {
    sequelizeConfig: {
        database: 'ecommerce',
        username: 'postgres',
        password: 'ecommerce',
        host: 'localhost',
        port: '5432',
        dialect: 'postgres' 
    }
};

const ImageConfig = {
    imageKitConfig: {
        publicKey: 'public_pD9FZlY8XqkD2l+tl+G8fxB2KuY=',
        privateKey: 'private_Gx4fmXo7RUtF0b21cbx1aimTeJg=',
        urlEndpoint: 'https://ik.imagekit.io/dfgmy6xar/'
    }
};

module.exports = { DatabaseConfig, ImageConfig };