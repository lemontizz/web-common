let cloneObj = function(obj) {
    let str, 
        newobj = obj.constructor === Array ? [] : {};

    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj);
        newobj = JSON.parse(str); 
    } else {
        for(let i in obj){
            newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i]; 
        }
    }
    return newobj;
};
/*
    全选切换：
        _data: vm的所有data数据
        isCheckAll: 列表中全选的v-model指
        list：列表的数据
        checked：列表中非全选的checkbox的v-model值
*/
let toggleCheckAll = function(_data, isCheckAll, list, checked = 'checked') {
    if(!isCheckAll) {
        let arr = [];
        for(let i = 0; i < list.length; i++) {
            arr.push(i);
        }
        _data[checked] = arr;
    } else {
        _data[checked] = [];
    }
};

let changeCheckItem = function(_data, list, checked) {
    if(checked.length === list.length) {
        _data.isCheckAll = true;
    } else {
        _data.isCheckAll = false;
    }
};

let getUrlParams = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    
    
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

let buildUnit = function(val) {
    let value = Number(val);

    if(isNaN(value)) {
        console.error('不是number值')
        return 0;
    }

    if(value < 1024) {
        return value + 'MB';
    } else {
        return value / 1024 + 'GB';
    }
};

let buildUrl = function(url, searchParams) {
    let split = url.indexOf('?') > -1 ? '&' : '?',
        search = [];

    for(let key in searchParams) {
        search.push(key + '=' + searchParams[key]);
    }

    return url + (search.length ? split : '') + search.join('&');
};

let filter = function(list, searchKeys, search) {
    /*
        @param list - Array : search list
        @param searchKeys - Array : The list of keys to search for
        @param search - String : search string
        example:
            list:
                [{
                    name: 'test-instance',
                    imageData: {
                        name: 'test-image'
                    }
                }, {
                    name: 'test-instance2',
                    imageData: {
                        name: 'test-image2'
                    }
                }]
            searchKeys:
                ['name', 'imageData.name']
            search: 
                'test'
    */

    if(!list.length) return [];

    if(!Array.isArray(list)) {
        console.warn('the list is not an array!');
        return [];
    }

    let filterList = [];

    for(let i = 0; i < list.length; i++) {
        let obj = {};
        for(let j = 0; j < searchKeys.length; j++) {
            let inclusePoint = searchKeys[j].includes('.'),
                value = inclusePoint ? this.getObjDeepVal(list[i], searchKeys[j]) : list[i][searchKeys[j]];

            obj[searchKeys[j]] = value;
        }

        let isInclude = false;
        for(let key in search) {
            let value = obj[key],
                valueString = value;

            if(key === 'searchText') {
                valueString = JSON.stringify(obj);
                if(search[key].length) {
                    for(let val in obj) {
                        try {
                            if(obj[val] &&obj[val].includes(search[key])) {
                                isInclude = true;
                            }
                        } catch(e) {
                            console.log('search error', val, obj);
                        }
                    } 
                } else {
                    isInclude = true;
                }
            } else {
                if(typeof value === 'object' && !Array.isArray(value)) {
                    valueString = JSON.stringify(value);
                }

                if(search[key] && search[key].length) {
                    isInclude = valueString ? valueString.includes(search[key]) : false;
                } else {
                    isInclude = true;
                }
            }
            if(!isInclude) break;
        }

        if(isInclude) {
            filterList.push(list[i]);
        }
    }
    return filterList;
};

let getObjDeepVal = function(obj, key) {
    let keys = key.split('.');

    if(!obj[keys[0]]) {
        return '';
    }

    if(keys.length > 1) {
        let pointIndex = key.indexOf('.')
        return getObjDeepVal(obj[keys[0]], key.substring(pointIndex + 1));
    } else if(keys.length === 1) {
        return obj[keys[0]] || '';
    } else {
        return '';
    }
};

let sort = function(originList, key, type, sortBy) {
    /*
        @param originList - Array : sort the original list data
        @param key - String : sort by 'key'
        @param type - String : value type  -- ('string', 'number')
        @param sortBy - String : sort up / sort down -- ('up', 'down')
    */

    let data = Array.from(originList),
        list = [],
        inclusePoint = key.includes('.'),
        currentSt,
        nextSt;

    list = data.sort(function(current, next) {
        if(inclusePoint) {
            currentSt = String(getObjDeepVal(current, key));
            nextSt = String(getObjDeepVal(next, key));
            return currentSt.localeCompare(nextSt)
        } else {
            currentSt = String(current[key]);
            nextSt = String(next[key]);
            return currentSt.localeCompare(nextSt);
        }
    }); 

    return sortBy == 'up' ? list : list.reverse();
};

export default {
    cloneObj,
    toggleCheckAll,
    changeCheckItem,
    getUrlParams,
    buildUnit,
    buildUrl,
    filter,
    getObjDeepVal,
    sort,
}