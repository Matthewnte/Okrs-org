/* eslint-disable no-return-assign */
/* eslint-disable eqeqeq */
const Company = require('../database/models/company');
const FactoryService = require('./factory');

const CompanyService = {
  createCompany: async (data) => {
    const company = await FactoryService.createOne(Company, data);
    return company;
  },

  getAllCompanies: async (query) => {
    const companies = await FactoryService.getAll(Company, query);
    return companies;
  },

  getOneCompany: async (companyId) => {
    const company = await FactoryService.getOne(Company, companyId);
    return company;
  },

  updateCompany: async (companyId, data) => {
    const company = await FactoryService.updateOne(Company, companyId, data);
    return company;
  },

  deleteCompany: async (companyId) => {
    await FactoryService.deleteOne(Company, companyId);
    return null;
  },
};

module.exports = CompanyService;
