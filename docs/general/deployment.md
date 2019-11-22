# Deployment

## Azure

As Azure/DevOps is pretty lacking in documentation that includes everything someone would need, I've included the
deployment information as well as issues we ran into. If you run into further issues, or there is something that needs
expanded on/changes please update this. I have also added a section including the resources we used to get our
deployments working.

**Resources**:
[IISNode](https://github.com/tjanczuk/iisnode)
[Deploying Azure Web App](https://docs.microsoft.com/en-usazure/devops/pipelines/targets/webapp?view=azure-devopstabs=yaml)  
[Node.JS in Azure](https://docs.microsoft.com/en-us/azureapp-service/app-service-web-get-started-nodejs)  
[Deploying with Containers](https://docs.microsoft.com/en-usazure/devops/pipelines/apps/cd/deploy-docker-webappview=azure-devops)  
[Deploying Example App](https://medium.com/@to_pedeploying-create-react-app-on-microsoft-azure-c0f6686a4321)  
[Hosting Example App on Azure](https://medium.com/@stridhost-create-react-app-on-azure-986bc40d5bf2)  
[Common Issues](deployment_azure_issues.md)

### Standard App Service

#### Azure Portal

1. Create a Resource Group in azure for you application
2. Create the various DB resources inside the group (Sql Server/SQL Database/Storage Account/ Virtual Network/ Key Valut/etc.)

#### DevOps

##### Build

The the DevOps Repository, create a build of the App. This should include the following steps in the pipeline. Refer to the details section to get more information.

1. `npm install`
2. `npm run build` (Custom npm command)
3. Archive folder
   - Archive the build folder. This does not exist in the repo, but is created on the `npm run build` step.
4. Copy Files
   - Simply copy the files from the build into the staging directory.
5. Publish Artifact

##### Release

You should be able to create a release off of a build. Otherwise you can manually create a release. Whichever you prefer.

1. Make sure you have the artifact you want to use selected in the Artifacts section.
2. Create a new job under the Stages Section.
3. In this job section, you should be able to create steps, you will create the flowing steps.
   1. Create or Update Resource Group
      1. Select Your subscription
      2. Action: Create or Update resource group
      3. Resource Group: Select your resource group
      4. Location: Select your location
      5. Template Location: URL of the file
      6. Template Link: We use microsofts example one (the below)
         - Example: <https://raw.githubusercontent.com/Microsoft/devops-project-samples/54dcc6c37677d06c719d26207ce6b62620ffda45/armtemplates/windows-webapp/template.json>
      7. Override template parameters: Replace the webAppName parameter and hostPlanName with yours...as well as anything else relavant to you...
         - Example: -webAppName MarketHound20 -hostingPlanName MarketHound20-plan -appInsightsLocation "East US" -sku "S1 Standard"
      8. Deployment mode: Incremental
   2. Add a "Azure App Service Deploy" step
      1. Display Name: _Your name_
      2. Connection Type: Azure Resource Manager
      3. Azure Subscription: Yours
      4. App Service Type: Web App on Windows
      5. App Service Name: YourAppServiceInAzure
      6. Section: File Transforms & Variable Substitution Options
      7. Generate web.config paramaters for ... Node.js ... apps
         - "-Handler iisnode -NodeStartFile server.js -appType node"
      8. Application and Configuration Seetings
         1. App Settings: -WEBSITE_NODE_DEFAULT_VERSION 10.14.1
4. Save Changes
5. Release
