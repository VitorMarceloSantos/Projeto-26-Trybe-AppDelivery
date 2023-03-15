const { Sale, SalesProducts } = require('../../database/models');

const createSaleTransaction = async (sale) => {
  try {
    const createdSale = await Sale.create({ userId: sale.userId, 
      sellerId: sale.sellerId,
      totalPrice: sale.totalPrice,
      deliveryAddress: sale.deliveryAddress,
      deliveryNumber: sale.deliveryNumber,
      saleDate: sale.saleDate,
      status: 'Pendente',
    });

    await Promise.all(sale.productsInCart.map((product) =>
      SalesProducts.create({ saleId: createdSale.id,
        productId: product.id,
        quantity: product.quantity,
      })));
  return createdSale;
      } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createSaleTransaction };