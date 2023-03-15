const SalesProducts = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts', {
    saleId: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'sale_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'sales',
        key: 'id',
      },
    },
    productId: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'product_id', 
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'products',
        key: 'id',
      },
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },   {
    timestamps: false, 
    tableName: 'sales_products',
    underscored: true,
  }) 

  SalesProducts.associate = (models) => {
    SalesProducts.belongsTo(models.Sale,
          { foreignKey: 'saleId', as: 'sales' });
    SalesProducts.belongsTo(models.Products,
          { foreignKey: 'productId', as: 'products' });
  }
  return SalesProducts;
}

module.exports = SalesProducts;
