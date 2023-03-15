const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { Products, SalesProducts } = require('../database/models');
const { products, allSkol } = require('./mocks/products.mock');
const app = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota /leaderboard', () => {
  const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJuYW1lIjoiRGVsaXZlcnkgQXBwIEFkbWluIiwiZW1haWwiOiJhZG1AZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6ImFkbWluaXN0cmF0b3IifSwiaWF0IjoxNjc4NDgyOTU2LCJleHAiOjE2Nzg1NjkzNTZ9.L3Th_ggHIACtB840nmv07iQ9k3y2XlT5RXQGTtsfqmY'

  it('Testa se a rota /products não retorna nada sem o token', async () => {
    sinon.stub(Products, 'findAll').resolves(products);
    const request = await chai
      .request(app)
      .get('/products')

    expect(request).to.have.status(401);
    expect(request.body.message).to.be.deep.equal('Token not found')

    sinon.restore();
  });

  it('Testa se a rota /products retorna todos os produtos', async () => {
    sinon.stub(Products, 'findAll').resolves(products);
    const request = await chai
      .request(app)
      .get('/products')
      .set('Authorization', tokenMock)

    expect(request).to.have.status(200);
    expect(request.body).to.be.deep.equal(products)

    sinon.restore();
  });

  it('Testa se a rota /products/search/:name retorna apenas os produtos esperados', async () => {
    sinon.stub(Products, 'findAll').resolves(allSkol);
    const request = await chai
      .request(app)
      .get('/products/search/skol')
      .set('Authorization', tokenMock)

    expect(request).to.have.status(200);
    expect(request.body).to.be.deep.equal(allSkol)

    sinon.restore();
  });

  it('Testa se a rota /products/search/:name retorna "Product not found" quando não encontra nada', async () => {
    sinon.stub(Products, 'findAll').resolves();
    const request = await chai
      .request(app)
      .get('/products/search/aaaa')
      .set('Authorization', tokenMock)

    expect(request).to.have.status(404);
    expect(request.body).to.be.equal('Product not found')

    sinon.restore();
  });

  it('Testa se a rota /products/search/:name retorna "Product not found" quando não encontra nada', async () => {
    sinon.stub(SalesProducts, 'findAll').resolves([]);
    const request = await chai
      .request(app)
      .get('/products/sales/1')
      .set('Authorization', tokenMock)

    expect(request).to.have.status(200);
    expect(request.body).to.be.an('Array')

    sinon.restore();
  });
});