const api = {
    getComponentTypes: 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types',
    clientAccessToken: 'https://ecoconductor-dev-api-discovery.azurewebsites.net/client_access_token',
    createUser: 'https://ecoconductor-dev-api-account.azurewebsites.net/users',
    loginUser: 'https://ecoconductor-dev-api-account.azurewebsites.net/user_access_token',
    authenticateUser: 'https://ecoconductor-dev-api-account.azurewebsites.net/user_access_token',
    registerProcess: 'https://ecoconductor-dev-api-notification.azurewebsites.net/processes',
    getActivityMessage: function (componentTypeId) {
        return 'https://ecoconductor-dev-api-notification.azurewebsites.net/messages'
    },
    getComponentById: function (componentTypeId) {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' + componentTypeId
    },
    getComponentConstraint: function (componentTypeId) {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' + componentTypeId + '/constraints'
    },
    getComponentComponent: function (componentTypeId) {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' + componentTypeId + '/components'
    },
    getComponent: function (payload) {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentTypeComponentId
    },
    getComponentProperty: function (payload) {
        return 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/components/' + payload.componentTypeComponentId + '/properties'
    },
    getComponentRelationships: function (payload) {
        return 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/components/' + payload.componentTypeComponentId + '/componentrelationships'
    }
  }

export default api
