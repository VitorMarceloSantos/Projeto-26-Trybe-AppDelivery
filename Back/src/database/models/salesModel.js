module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      sellerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'seller_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      totalPrice: {
        allowNull: false,
        type: DataTypes.DECIMAL,
        field: 'total_price',
      },
      deliveryAddress: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'delivery_address',
      },
      deliveryNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'delivery_number',
      },
      saleDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'sale_date',
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    }, {
      timestamps: false,
      tableName: 'sales',
      underscored: true,
    }
  );

  // hasOne = tem um
  // belongsTo = pertencente a
  // hasMany = tem muitos
  // belongsToMany = pertencente a muitos

  // Contrapartida da associação salesProductModel - Nâo tem necessidade
  // sale.associate = (models) => {
  //   sale.hasMany(models.SaleProduct, { // has a chave(saleId) é da tabela Sale
  //     foreignKey: 'saleId',
  //     as: 'sales', // apelido
  //   });
  // };
  
  // Associação com a tabela User
  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { // belong a chave(userId) pertece a User(1:N)
      foreignKey: 'userId',
      as: 'saleId', // apelido
    });

    Sale.belongsTo(models.User, { // belong a chave(sellerId) pertece a User(1:N)
      foreignKey: 'sellerId',
      as: 'seller', // apelido
    });
  };


  return Sale;
};