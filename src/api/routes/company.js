const CompanyController = require('../controllers/company');
const { isAuthenticated } = require('../middleware/auth');

/**
 * @name companyRoute
 * @param {Object} companyRoutes Express Router Object
 * @returns {Null} Null
 */
const companyRoute = (companyRoutes) => {
  companyRoutes
    .route('/companies')
    .get(isAuthenticated, CompanyController.getAllCompanys)
    .post(isAuthenticated, CompanyController.createCompany);
  companyRoutes
    .route('/companies/:companyId')
    .get(isAuthenticated, CompanyController.getOneCompany)
    .patch(isAuthenticated, CompanyController.updateCompany)
    .delete(isAuthenticated, CompanyController.deleteCompany);
};

module.exports = companyRoute;
