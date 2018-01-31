import store from '@/vuex/store';
import router from '@/router/index';
import storage from '@/scripts/storage';
import webCommonConfig from 'config&/web-common-config';

let request401 = function (data) {
    store.dispatch('SHOW_ALERT', {
        message: '会话已过期，请重新登录',
        callbacks: {
            onConfirm () {
                store.dispatch('HIDE_ALERT');
                store.dispatch('CLEAR_TOKEN');
                storage.clear();
                store.dispatch('CLEAR_MONITOR_AUTH');
                router.push('/login')
                return;
            }
        }
    });
};

let request500 = function (data) {
    let message = data && data.error && data.error.message ? data.error.message : '服务器出错，请求失败';

    if(message.includes('token ' + storage.tokenId() + ' not found')) {
        request401();
    } else {
        store.dispatch('SHOW_ALERT', {
            message,
            origin: 'error',
            errorInfo: JSON.stringify(data)
        });
    }

};

let defaultOpts = {
    method: 'GET',
    url: '',
    headers: {
        "X-OpenStack-Nova-API-Version": "2.31"
    },
    token: true,
    expireStatus: true,
    timeout: 6000,
    blob: false,
    data: null,
    loading: true,
    alert: true,
    apiVersion: true,
};

let request = function (options) {
    let opts = Object.assign({}, defaultOpts, options),
        params,
        xhr,
        promise;
        
        if(opts.loading) store.dispatch('SHOW_LOADING');

        promise = new Promise(function(resolve, reject) {
            xhr = new XMLHttpRequest();
            xhr.open(opts.method, opts.url, true);

            xhr.onload = function(response) {
                
                store.dispatch('HIDE_LOADING');

                let data = xhr.response;
                let status = xhr.status;

                try {
                    data = JSON.parse(data);
                } catch(e) {
                    console.log('response信息无法被JSON.parse转义');
                }
                
                if(status >= 200 && status < 400) {
                    resolve({data, response, xhr});
                    return;
                } else {
                    console.error(status, opts.url, data, response)
                }

                switch(status) {
                    case 403:
                        if(opts.alert && opts.expireStatus) {
                            request401(data);
                        }
                        reject({
                            status,
                            data, 
                            response,
                            defaultMsg: '会话已过期，请重新登录',
                        });
                        break;
                    case 500:
                        if(opts.alert && opts.expireStatus) {
                            request500(data);
                        }
                        reject({
                            status,
                            data, 
                            response,
                            defaultMsg: '服务器出错,数据请求失败',
                        });
                        break;
                    default:
                        if(opts.alert) {
                            store.dispatch('SHOW_ALERT', {
                                message: data && data.error && data.error.message ? data.error.message : '数据请求出错',
                            });
                        }
                        reject({
                            status,
                            data, 
                            response,
                        });
                        break;
                }
            };

            xhr.onerror = function(response) {
                store.dispatch('HIDE_LOADING');
                store.dispatch('SHOW_ALERT', {
                    message: (response && response.error) ? response.error.message : '服务器出错'
                });
                reject(response);
            };

            xhr.timeout = function() {
                store.dispatch('HIDE_LOADING');
                store.dispatch('SHOW_ALERT', {
                    message: '获取数据超时'
                });
            };

            if(opts.token === true) {
                if(storage.tokenId()) {
                    opts.headers['X-Auth-Token'] = storage.tokenId();
                } else {
                    store.dispatch('SHOW_TIP', {
                        type: 'danger',
                        message: '身份认证已过期，请重新登录',
                    });
                    router.push('/login');
                    resolve({});
                    return;
                }
            } else if(opts.token === false) {
                delete opts.headers['X-Auth-Token']
            }

            if(!opts.headers['Content-Type']) {
                opts.headers['Content-Type'] = 'application/json';
            }

            if(!opts.apiVersion) {
                delete opts.headers['X-OpenStack-Nova-API-Version'];
            }

            for(let key in opts.headers) {
                xhr.setRequestHeader(key, opts.headers[key]);
            }

            try {
                params = JSON.stringify(opts.data);
            } catch(e) {
                params = opts.data;
            }

            if(options.data) {
                xhr.send(params)
            } else {
                xhr.send();
            }
        });

        promise.xhr = xhr;
        return promise;
};

export default request;