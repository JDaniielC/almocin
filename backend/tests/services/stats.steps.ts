import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import UserService from '../../src/services/register.service';
import UserRepository from '../../src/repositories/user.repository';
import OrderRepository from "../repositories/order.repository";
import CategoryService from '../../src/services/category.service';
import CategoryRepository from '../../src/repositories/category.repository';
import MenuRepository from '../../src/repositories/menu.repository';
import MenuService from '../../src/services/menu.service';
import { mockBaseRepository } from '../utils/mock';
import StatsService from '../../src/services/stats.service';
import StatsController from '../../src/controllers/stats.controller';
import { StatsFilter } from '../../src/types/stats';
import app from '../app'; // Adjust the path as necessary

const feature = loadFeature('path/to/stats.feature'); // Adjust the path as necessary

defineFeature(feature, (scenario) => {

  let response: request.Response;
  let stats = StatsService();

  beforeAll(async () => {
    // Mock the repositories' behavior
    jest.spyOn(require('../repositories/menu.repository'), 'getItems').mockResolvedValue(new Array(stats.totalItems).fill({}));
    jest.spyOn(require('../repositories/order.repository'), 'getOrders').mockResolvedValue(new Array(stats.totalOrders).fill({
      totalPrice: stats.totalRevenue / stats.totalOrders,
      createdAt: new Date()
    }));
    jest.spyOn(require('../repositories/user.repository'), 'getUsers').mockResolvedValue(new Array(stats.totalUsers).fill({}));
  });

  scenario('requisitar todas as estatísticas', ({ given, when, then }) => {
    given('há um objeto em "Estatistica":', (docString) => {
      // The object in docString is used for verification
    });

    when('o usuário faz uma requisição "GET" para o endpoint "/stats" com o código "all"', async () => {
      response = await request(app).get('/stats/all');
    });

    then('o status code da rquisição deve ser "200"', () => {
      expect(response.status).toBe(200);
    });

    then('a resposta deve conter as seguintes informações:', (table) => {
      const expected = table.rowsHash();
      expect(response.body.data).toMatchObject({
        totalUsers: Number(expected.totalUsers),
        totalItems: Number(expected.totalItems),
        totalRevenue: Number(expected.totalRevenue),
        currentMonthRevenue: Number(expected.monthRevenue),
        totalOrders: Number(expected.totalOrders),
        monthOrders: Number(expected.monthOrders),
        averageTicket: Number(expected.averageTicket),
        currentMonthAverageTicket: Number(expected.currentMonthAverageTicket)
      });
    });
  });

  scenario('requisitar as estatísticas de arrecadação', ({ given, when, then }) => {
    given('há um objeto em "Estatistica":', (docString) => {
      // The object in docString is used for verification
    });

    when('o usuário faz uma requisição "GET" para o endpoint "/stats" com o código "money"', async () => {
      response = await request(app).get('/stats/money');
    });

    then('o status code da rquisição deve ser "200"', () => {
      expect(response.status).toBe(200);
    });

    then('a resposta deve conter as seguintes informações:', (table) => {
      const expected = table.rowsHash();
      expect(response.body.data).toMatchObject({
        totalRevenue: Number(expected.totalRevenue),
        currentMonthRevenue: Number(expected.monthRevenue),
        averageTicket: Number(expected.averageTicket),
        currentMonthAverageTicket: Number(expected.currentMonthAverageTicket)
      });
    });
  });

  scenario('requisitar as estatísticas de mensais', ({ given, when, then }) => {
    given('há um objeto em "Estatistica":', (docString) => {
      // The object in docString is used for verification
    });

    when('o usuário faz uma requisição "GET" para o endpoint "/stats" com o código "mon"', async () => {
      response = await request(app).get('/stats/mon');
    });

    then('o status code da rquisição deve ser "200"', () => {
      expect(response.status).toBe(200);
    });

    then('a resposta deve conter as seguintes informações:', (table) => {
      const expected = table.rowsHash();
      expect(response.body.data).toMatchObject({
        currentMonthRevenue: Number(expected.monthRevenue),
        monthOrders: Number(expected.monthOrders),
        currentMonthAverageTicket: Number(expected.currentMonthAverageTicket)
      });
    });
  });

});
