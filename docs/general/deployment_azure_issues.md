# Azure Deployment Issues

## Blank Page on Deployment

1. App Service Configuration Issue

   - The app service running on an old version of node & npm. This market hound application requires us to be on `npm >= 5` and `node >= 8`.
   - You can check this by running the console on the app service in Azure and typing `node --v` and `npm --v`. To fix this update the environment variable to specify the desired version of node.
   - Add/Change: `WEBSITE_NODE_DEFAULT_VERSION = 10.14.1`

2. Bad API Configuration
   - You probably have not configured the api connection information. Look in the `config` folders in the api and make sure each field has a value. If not setup correctly, an empty string is as good as undefined and can cause issues.
     - A lot of our internal APIs use a `baseUrl.jsx` file. Make sure there is a final `||` gate that returns a value like `''`
     - Ex: `export default process.env.PRODUCTS_API || ClientsAPI.url || '';`
