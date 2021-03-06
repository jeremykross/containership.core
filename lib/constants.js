'use strict';

const _ = require('lodash');

let constants = {
    myriad: {
        APPLICATIONS: ['containership', 'application', '*'],
        APPLICATION_PREFIX: ['containership', 'application'],
        CLUSTER_ID: ['containership', 'cluster', 'id'],
        CONTAINERS_PREFIX: ['containership', 'containers'],
        DELIMITER: '::',
        ENOKEY: 'ENOKEY',
        VARIABLES: ['containership', 'variables', '*'],
        VARIABLES_PREFIX: ['containership', 'variables']
    },

    events: {
        CLUSTER_ID: 'containership.cluster_id',
        RECONCILE: 'containership.reconcile',
        LOAD_CONTAINER: 'containership.load_container',
        UNLOAD_CONTAINER: 'containership.unload_container',
        UPDATE_HOST: 'containership.update_host',
        DELETE_HOST: 'containership.delete_host'
    }
};

_.forEach(constants.myriad, (value, key) => {
    if(_.isArray(value))
        constants.myriad[key] = value.join(constants.myriad.DELIMITER);
});

module.exports = constants;
