const api = {
    getComponentTypes: 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types', // 'https://model.eco.dev.ecoconductor.com/component_types',
    clientAccessToken: 'https://ecoconductor-dev-api-discovery.azurewebsites.net/client_access_token',
    createUser: 'https://account.eco.dev.ecoconductor.com/users',
    loginUser: 'https://account.eco.dev.ecoconductor.com/user_access_token',
    registerProcess: 'https://ecoconductor-dev-api-notification.azurewebsites.net/processes',
    getActivityMessage: function (componentTypeId) {
        return 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/' + componentTypeId + '/messages?page_size=5&page=1&recommended=false'
    },
    getComponentById: function (componentTypeId) {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' + componentTypeId
    },
    getComponentConstraint: function (componentTypeId) {
        return 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/' + componentTypeId + '/constraints'
    },
    getComponentComponent: function (componentTypeId) {
        return 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/' + componentTypeId + '/components'
    },
    getComponent: function (payload) {
        return 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/' + payload.componentTypeId + '/components/' + payload.componentTypeComponentId
    },
    getComponentProperty: function (payload) {
        return 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/components/' + payload.componentTypeComponentId + '/properties'
    },
    getComponentRelationships: function (payload) {
        return 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/components/' + payload.componentTypeComponentId + '/componentrelationships'
    }
  }

export default api
