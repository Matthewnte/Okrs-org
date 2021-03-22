const Exception = require('../helpers/exception');
const ApiFeatures = require('../helpers/apiFeatures');

const FactoryService = {
  getAll: async (Model, incomingQuery) => {
    // let filter = {};
    // if (resoureceId) filter = { event: resoureceId };

    // Execute query
    const features = new ApiFeatures(Model.find(), incomingQuery)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    // Send response
    return doc;
  },

  deleteOne: async (Model, resourceId) => {
    const doc = await Model.findByIdAndDelete(resourceId);

    if (!doc) throw new Exception('No document found with that ID', 404);

    return doc;
  },

  updateOne: async (Model, resourceId, data) => {
    const doc = await Model.findByIdAndUpdate(resourceId, data, {
      new: true,
      runValidators: true,
    });

    if (!doc) throw new Exception('No document found with that ID', 404);

    return doc;
  },

  createOne: async (Model, data) => {
    const doc = await Model.create(data);
    return doc;
  },

  getOne: async (Model, resourceId, populateOptions) => {
    let query = Model.findById(resourceId);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    if (!doc) throw new Exception('No document found with that ID', 404);

    return doc;
  },

  findMatch: async (Model, incomingQuery, incomingParam) => {
    let query = {};
    const reqQuery = { ...incomingQuery };

    const removedParams = ['sort', 'page', 'limit'];

    removedParams.forEach((param) => delete reqQuery[param]);

    const { term } = reqQuery;

    if (!term) throw new Exception('Please provide a search term', 400);

    query = Model.find({
      $and: [
        {
          $or: [
            { name: { $regex: term, $options: 'i' } },
            { platform: { $regex: term, $options: 'i' } },
            { category: { $regex: term, $options: 'i' } },
            { tags: { $regex: term, $options: 'i' } },
          ],
        },
      ],
    });
    const doc = await query;

    if (!doc) throw new Exception(`No document found for ${incomingParam}`, 404);

    return doc;
  },
};

module.exports = FactoryService;
