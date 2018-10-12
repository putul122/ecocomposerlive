const api = {
    getComponentTypes: 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types',
    clientAccessToken: 'https://ecoconductor-dev-api-discovery.azurewebsites.net/client_access_token',
    createUser: 'https://ecoconductor-dev-api-account.azurewebsites.net/users',
    loginUser: 'https://ecoconductor-dev-api-account.azurewebsites.net/user_access_token',
    authenticateUser: 'https://ecoconductor-dev-api-account.azurewebsites.net/user_access_token',
    registerProcess: 'https://ecoconductor-dev-api-notification.azurewebsites.net/processes',
    getActivityMessage: function () {
        return 'https://ecoconductor-dev-api-notification.azurewebsites.net/messages'
    },
    getComponentById: function (componentTypeId) {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' + componentTypeId
    },
    getComponentTypeConstraints: function (componentTypeId) {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' + componentTypeId + '/constraints'
    },
    getComponentTypeComponents: function (componentTypeId) {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' + componentTypeId + '/components'
    },
    getComponent: function (payload) {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentTypeComponentId
    },
    getComponentProperty: function (payload) {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentTypeComponentId + '/component_properties'
    },
    getComponentRelationships: function (payload) {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentTypeComponentId + '/component_relationships'
    },
    addComponent: function (payload) {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/components'
    },
    getComponentConstraints: function (payload) {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentTypeComponentId + '/constraints'
    },
    updateComponentRelationships: function (payload) {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentId + '/component_relationships'
    },
    updateComponentProperties: function (payload) {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentId + '/component_properties'
    },
    updateComponent: function (payload) {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentId
    },
    deleteComponent: function (componentTypeId) {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + componentTypeId
    },
    viewComponentRelationship: function (payload) {
        if (payload.relationshipType === 'Parent') {
            return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentId + '/component_relationships/' + payload.relationshipId + '?parent=true'
        } else if (payload.relationshipType === 'Child') {
            return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentId + '/component_relationships/' + payload.relationshipId + '?child=true'
        } else {
            return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentId + '/component_relationships/' + payload.relationshipId
        }
    },
    deleteRelationship: function (payload) {
        return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentId + '/component_relationships/' + payload.relationshipId
    },
    getDiscussions: 'https://ecoconductor-dev-api-notification.azurewebsites.net/discussions',
    getDiscussionMessages: function (id) {
        return 'https://ecoconductor-dev-api-notification.azurewebsites.net/discussions/' + id + '/messages'
    },
    getAccountArtefacts: 'https://account-eco-dev.ecoconductor.com/artefacts',
    getModelArtefacts: 'https://model-eco-dev.ecoconductor.com/artefacts',
    updateNotificationViewStatus: 'https://notification-eco-dev.ecoconductor.com/notification_view_status'
  }

export default api
