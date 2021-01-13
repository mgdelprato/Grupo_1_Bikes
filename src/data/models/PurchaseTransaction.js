module.exports=function(sequelize,dataTypes){
    let alias="PurchaseTransaction";
    let cols={
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        users_id_fk:{
            type:dataTypes.INTEGER,
            notNull:true
        },
        payment_method_id_fk:{
            type:dataTypes.INTEGER,
            notNull:true
        },
        transaction_date:{
            type:dataTypes.DATE,
            notNull:true
        },
        transaction_amount:{
            type:dataTypes.DECIMAL,
            notNull:true
        },
        still_alive:{
            type:dataTypes.STRING,
            notNull:true,
            defaultValue:'YES'
        }
    };
    let config={
        tableName:'PURCHASES_TRANSACTIONS',
        timestamps:true,
        underscored:true
    }

    let PurchaseTransaction = sequelize.define(alias,cols,config)

    PurchaseTransaction.associate = function(models){
        PurchaseTransaction.hasMany(models.PurchaseDetail,{
                as:"PurchasesDetails",
                foreingKey:"purchases_transaction_id_fk"
            });
        PurchaseTransaction.belongsTo(models.User,{
                as:"User",
                foreingKey:"user_id_fk"
            });
        PurchaseTransaction.hasMany(models.PaymentMethod,{
                as:"PaymentMethod",
                foreingKey:"paymentMehotd_id_fk"
            });
        }
    return PurchaseTransaction
}