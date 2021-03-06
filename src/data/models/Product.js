module.exports=function(sequelize,dataTypes){
    let alias="Product";
    let cols={
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        category:{
            type:dataTypes.STRING,
            notNull:true
        },
        title:{
            type:dataTypes.STRING,
            notNull:true
        },
        brand:{
            type:dataTypes.STRING,
            notNull:true,
        },
        model:{
            type:dataTypes.STRING,
            notNull:true,
        },
        detail:{
            type:dataTypes.STRING,
        },
        price:{
            type:dataTypes.DECIMAL,
            notNull:true,
            defaultValue:0
        },
        quantity:{
            type:dataTypes.INTEGER,
            notNull:true,
            defaultValue:0
        },
        offert:{
            type:dataTypes.STRING,
            //defaultValue:'NO'
        },
        has_price:{
            type:dataTypes.STRING,
            defaultValue:'YES'
        },
        discount:{
            type:dataTypes.DECIMAL,
            defaultValue:0
        },
        still_alive:{
            type:dataTypes.STRING,
            notNull:true,
            defaultValue:'YES'
        },
        img_ppal:{
            type:dataTypes.STRING,
            notNull: true            
        }
    };
    let config={
        tableName:'products',
        timestamps:true,
        underscored:true
    }

    let Product = sequelize.define(alias,cols,config)

    Product.associate = function(models){
        Product.hasMany(models.ProductImage,{
                as:"ProductsImages",
                foreingKey:"product_id"
            });
       
        }
    return Product
}