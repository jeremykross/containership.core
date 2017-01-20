const { HostImplementation } = require('containership.plugin.v2');
const ContainershipApiBridge = require('./api-bridge');

class ContainershipHost extends HostImplementation {
    constructor(core) {
        super(core.options.mode, core.options['api-interface'], core.options['api-port']);
        this.core = core;
    }

    getApi() {
        return new ContainershipApiBridge(this.core, this.leaderIP, this.apiPort);
    }

    getClusterId() {
        return this.core.cluster_id || this.core.options.cluster_id;
    }

}

module.exports = ContainershipHost;
