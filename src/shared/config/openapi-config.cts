/** @type {import('@rtk-query/codegen-openapi').ConfigFile} */
const config = {
	schemaFile: 'https://archives-api.tatweer-dev.com/swagger/v1/swagger.json',
	apiFile: '../lib/features/apiSlice.ts',
	apiImport: 'tatweerApi',
	outputFile: '../api/archiveApi.ts',
	exportName: 'archiveApi',
	hooks: {queries: true, lazyQueries: true, mutations: true},
 };
 
 module.exports = config;
 