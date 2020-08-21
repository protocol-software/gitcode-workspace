export const ApiEndpoint = {
  globalPrefix: 'api',
  snackCode: {
    getTags: `/snack-code/tags`,
    getContents: `/snack-code/contents`,
  },
  searchCode: {
    getSuggestQuery: `/search-code/suggest-query`,
    query: `/search-code/query`,
  },
  payPal: {
    getToken: '/oauth2/token',
    createProduct: '/catalogs/products',
    createPlan: '/billing/plans',
    createSubscription: '/billing/subscriptions',
  },
};
