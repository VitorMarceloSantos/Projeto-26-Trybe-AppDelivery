const Products = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL(4,2),
    },
    urlImage: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'url_image'
    },
  },   {
    timestamps: false, 
    tableName: 'products',
    underscored: true,
  })

  Products.associate = (models) => {
    Products.hasMany(models.SalesProducts,
          { foreignKey: 'productId', as: 'product_id' });
  }

  return Products;
}


module.exports = Products;
