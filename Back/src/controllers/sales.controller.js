const status = require('http-status');
const salesService = require('../services/sales.service');

const createSale = async (req, res) => {
   try { 
    const sales = await salesService
        .createSale(req.body);
return res.status(status.CREATED).json({ saleId: sales.id });
   } catch (e) {
        console.log('Erro Create', e);
       return res.status(status.BAD_REQUEST).json({ message: e });
   }
};

const findSaleById = async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.findSaleById(id);
    try { 
        if (!sale.length) {
            return res.status(status.BAD_REQUEST).json({ message: 'esse pedido não existe' });
        }
        return res.status(status.OK).json(sale[0].dataValues);
   } catch (e) {
    return res.status(status.BAD_REQUEST).json({ message: e.message });
   }
};

const findAll = async (req, res) => {
    const { id } = req.params;
    try {
        const sale = await salesService.findAll(id);
        return res.status(status.OK).json(sale);
    } catch (e) {
        return res.status(status.BAD_REQUEST).json({ message: 'Não disponivel' });
    }
};

const findAllSellerOrders = async (req, res) => {
    const sales = await salesService.findAllSellerOrders(req.params.sellerId);
    if (!sales.length) {
      return res.status(status.NOT_FOUND).json({ message: 'Seller has no sales' });
  }
    return res.status(status.OK).json(sales);
};
  
const findOneSellerOrder = async (req, res) => {
    const { sellerId, saleId } = req.params;
    const order = await salesService.findOneSellerOrder(sellerId, saleId);
    if (!order.length) {
        return res.status(status.NOT_FOUND).json({ message: 'No sales found' });
    } return res.status(status.OK).json(order[0]);
};

const sellerUpdateSaleStatus = async (req, res) => {
  const { saleId } = req.params;
  const newStatus = (req.params.newStatus).split('-').join(' ');
    const order = await salesService.sellerUpdateSaleStatus({ saleId, newStatus });
    const statusCondition = newStatus === 'Preparando' || newStatus === 'Em Trânsito';
    if (!statusCondition) {
        return res
            .status(status.BAD_REQUEST)
            .json({ message: 'Status deve ser \'Preparando\', \'Em-Trânsito\' ou \'Entregue\'' });
    }
  return res.status(status.OK).json({ newStatus, order });
};

const buyerUpdateSaleStatus = async (req, res) => {
    const { saleId, newStatus } = req.params;
      const order = await salesService.buyerUpdateSaleStatus({ saleId, newStatus });
      const statusCondition = newStatus === 'Entregue';
      if (!statusCondition) {
          return res
              .status(status.BAD_REQUEST)
              .json({ message: 'Status deve ser \'Preparando\', \'Em-Trânsito\' ou \'Entregue\'' });
      }
    return res.status(status.OK).json({ newStatus, order });
  };

module.exports = {
    createSale,
    findSaleById,
    findAll,
    findAllSellerOrders,
    findOneSellerOrder,
    sellerUpdateSaleStatus,
    buyerUpdateSaleStatus,
};