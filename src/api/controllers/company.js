const catchAsyncError = require('../../helpers/catchAsyncError');
const CompanyService = require('../../services/company');

const CompanyController = {
  createCompany: catchAsyncError(async (request, response) => {
    const newCompany = await CompanyService.createCompany(request.body);

    return response.status(201).json({
      status: 'successful',
      data: { company: newCompany },
    });
  }),

  getAllCompanys: catchAsyncError(async (request, response) => {
    const { query } = request;

    const companies = await CompanyService.getAllCompanies(query);

    return response.status(200).json({
      status: 'success',
      result: companies.length,
      data: { companies },
    });
  }),

  getOneCompany: catchAsyncError(async (request, response) => {
    const { companyId } = request.params;

    const company = await CompanyService.getOneCompany(companyId);

    return response.status(200).json({
      status: 'success',
      data: { company },
    });
  }),

  updateCompany: catchAsyncError(async (request, response) => {
    const { companyId } = request.params;

    const company = await CompanyService.updateCompany(companyId, request.body);

    return response.status(200).json({
      status: 'success',
      data: { company },
    });
  }),

  deleteCompany: catchAsyncError(async (request, response) => {
    const { companyId } = request.params;

    await CompanyService.deleteCompany(companyId);

    return response.status(204).json({
      status: 'success',
      data: null,
    });
  }),
};

module.exports = CompanyController;
