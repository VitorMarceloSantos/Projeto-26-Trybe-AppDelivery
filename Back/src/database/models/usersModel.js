module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
  'User',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    tableName: "users",
    timestamps: false,
    underscored: true,
  },
);

// hasOne = tem um
// belongsTo = pertencente a
// hasMany = tem muitos
// belongsToMany = pertencente a muitos

User.associate = (models) => {
  User.hasMany(models.Sale, { // has a chave(userId) é da tabela User
    foreignKey: 'userId', // faz referencia a chave
    as: 'saleId', // apelido
  });
};

User.associate = (models) => {
  User.hasMany(models.Sale, { // has a chave(sellerId) é da tabela User
    foreignKey: 'sellerId', // faz referencia a chave
    as: 'sellerId', // apelido
  });
};

  return User;
};