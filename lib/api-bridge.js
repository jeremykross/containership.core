const _ = require('lodash');
const request = require('request');
const { ApiImplementation } = require('containership.plugin.v2');

class ContainershipApiBridge extends ApiImplementation {
    constructor(core, ip, port) {
        super();
        this.apiAddr = `http://${ip}:${port}`;
        this.core = core;
    }

    makeHandler(path, cb) {
        cb = cb || _.identity;

        return (err, resp) => {
            if(err) {
                cb(err);
            } else {
                cb(null, _.get(resp, path));
            }
        };

    }

    apiVERB(verb, endpoint, data, path, cb) {
        request({
            baseUrl: this.apiAddr,
            url: endpoint,
            body: data,
            method: verb,
            json: true
        }, this.makeHandler(path, cb));
    }

    apiGET(endpoint, path, cb) {
        apiVERB('GET', endpoint, null, path, cb);
    }

    apiPOST(endpoint, data, path, cb) {
        apiVERB('POST', endpoint, data, path, cb);
    }

    apiPUT(endpoint, data, path, cb) {
        apiVERB('PUT', endpoint, data, path, cb);
    }

    apiDELETE(endpoint, path, cb) {
        apiVERB('DELETE', endpoint, null, path, cb);
    }

    getClusterId(cb) {
        this.apiGET('/v1/cluster', ['body', 'id'], cb);
    }

    getApplications(cb) {
        this.apiGET('/v1/applications', 'body', cb);
    }

    createContainers(appId, containerConfig, cb) {
        this.apiPOST(`/v1/applications/${appId}/containers?count=${containerConfig.count}`, {}, 'body', cb);
    }

    createApplication(appDesc, cb) {
        this.apiPOST(`/v1/aplications/${appId}`, appDesc, 'body', cb);
    }

    updateApplication(appId, appDesc, cb) {
        this.apiPUT(`/v1/aplications/${appId}`, appDesc, 'body', cb);
    }

    deleteApplication(appId, cb) {
        this.apiDELETE(`/v1/applications/${appId}`, 'body', cb);
    }

    getHosts(cb) {
        this.apiGET('/v1/hosts', 'body', cb);
    }

    discoverPeers(cidr) {
        this.core.cluster.legiond.options.network.cidr = cidr;
        this.core.cluster.legiond.actions.discover_peers(cidr);
    }

    setDistributedKey(k, v, cb) {
        this.core.myriad.persistence.set(k, JSON.stringify(v), cb);
    }

    getDistributedKey(k, v, cb) {
        this.core.myriad.persistence.get(k, (err, v) => {
            if(err) {
                return cb(err);
            }

            try {
                v = JSON.parse(v);
            } catch(err) {}

            cb(null, v);
        });
    }

}

module.exports = ContainershipApiBridge;
