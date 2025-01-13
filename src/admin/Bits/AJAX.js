import { baseUrl } from "../setting";
import { objectRemoveNull } from "../utils";

const request = function(method, route, data = {}) {
    const url = `${baseUrl.RABBIT_SERVICE}/${route}`;

    // const headers = {'X-WP-Nonce': window.wpPluginWithVueTailwind.rest.nonce};
    const headers = {
        'X-WP-Nonce': 'wpApiSettings.nonce',
        'Content-Type': 'application/json'
    };    

    if (['PUT', 'PATCH', 'DELETE','GET'].indexOf(method.toUpperCase()) === -1) {
        headers['X-HTTP-Method-Override'] = method;
        method = 'POST';
    }

    const payload = typeof data === 'object' ? Object.keys(data).length > 0 ?  JSON.stringify(objectRemoveNull(data)) : undefined : data

    return window.jQuery.ajax({
        url: url,
        type: method,
        data: payload,
        headers: headers
    });
}

export default {
    get(route, data = {}) {
        return request('GET', route, data);
    },
    post(route, data = {}) {
        return request('POST', route, data);
    },
    delete(route, data = {}) {
        return request('DELETE', route, data);
    },
    put(route, data = {}) {
        return request('PUT', route, data);
    },
    patch(route, data = {}) {
        return request('PATCH', route, data);
    }
};

jQuery(document).ajaxSuccess((event, xhr, settings) => {
    const nonce = xhr.getResponseHeader('X-WP-Nonce');
    if (nonce) {
        // window.wpPluginWithVueTailwind.rest.nonce = nonce;
    }
});
