let getInstanceStatus = function(status) {
    switch(status) {
        case 'SHUTOFF' :
            return '已关机';
	case 'INSERVICE' :
            return '已连接';
	case 'ACTIVE' :
            return '运行中';
        case 'BUILDING' :
            return '构建中';
        case 'DELETED' :
            return '删除中';
	case 'SUSPENDED':
            return '挂起';
        case 'ERROR':
            return '错误';
	case 'BUILD':
            return '创建中'
        case 'HARD_REBOOT':
            return '重启中';
        case 'MIGRATING':
            return '迁移中';
        case 'PAUSED':
            return '暂停';
        case 'REBOOT':
            return '重启中';
        case 'REBUILD':
            return '重构中';
        case 'RESCUE':
            return '救援中';
        case 'RESIZED':
            return '救援中';
        case 'UNKNOWN':
            return '未知'
        case 'VERIFY_RESIZE':
            return '确认扩容';
        case 'RESIZE':
            return '扩容中'
        case 'LIVELY':
            return '活跃';
        case 'FREE':
            return '闲置';
        case 'REBUILD':
            return '重构中';
        default:
            return status;
    }
}

let getFontColor = function(status){
    switch(status){
        case 'INSERVICE':
            return '#45c6f8'
        case 'ACTIVE':
            return 'rgba(76,132,255,0.8)'
        case 'SHUTOFF':
            return 'rgb(209,215,222)'
        case 'SUSPENDED':
            return 'rgba(252,156,56,0.9)'
        case 'ERROR':
            return 'rgba(246,87,81,0.9)'
        case 'LIVELY':
            return 'rgb(38,192,160)'
        case 'FREE':
            return 'rgba(247,198,33,0.8)'
        default:
            break;
    }
}

let getAvartarColor = function(result) {
    if(!result)return;
    let list = [],
        reg = new RegExp("[\\u4E00-\\u9FFF]+","g"),
        temp = result,
        str = '',
        num = 0;

    for(let i = 0;i < 25;i++) {
        list.push(String.fromCharCode((65+i)))
    }

    if(reg.test(result.substr(0,1))) {
        let temp_ = result.substr(0,1);
        for(var i = 0; i < temp_.length; i++){
            str+="\\u"+parseInt(temp_[i].charCodeAt(0),10).toString(16);
        }

        temp = str.split('');

        temp.forEach((item,index)=>{
            if(list.includes(item.toUpperCase())){
                for(let i = 0;i < list.length; i++){
                    if(item.toUpperCase() === list[i]){
                        num += i;
                    }
                }
            }else{
                if(!isNaN(parseInt(item))) {
                    num = num + parseInt(item)
                }
            }

        })
    }else {
        list.forEach((item,index) => {
            if(item == temp.substring(0,1).toUpperCase()){
                num = index;
            }
        })
    }

    let status = (num+6)%7;
    let state = '';
    switch(status){
        case 1:
            state = 'rgb(222,238,251)'
            break;
        case 2:
            state = 'rgba(141,222,204,0.3)'
            break;
        case 3:
            state = 'rgb(254,249,231)'
            break;
        case 4:
            state = 'rgb(253,238,233)'
            break;
        case 5:
            state = 'rgb(231,246,231)'
            break;
        default:
            state = 'rgb(249,236,252)'
            break;
    }
    return state;
}

let getAvartarFontColor = function(result) {
    if(!result)return;

    let list = [],
        reg = new RegExp("[\\u4E00-\\u9FFF]+","g"),
        temp = result,
        str = '',
        num = 0;

    for(let i = 0;i < 25;i++) {
        list.push(String.fromCharCode((65+i)))
    }

    if(reg.test(result.substr(0,1))) {
        let temp_ = result.substr(0,1);
        for(var i = 0; i < temp_.length; i++){
            str+="\\u"+parseInt(temp_[i].charCodeAt(0),10).toString(16);
        }

        temp = str.split('');

        temp.forEach((item,index)=>{
            if(list.includes(item.toUpperCase())){
                for(let i = 0;i < list.length; i++){
                    if(item.toUpperCase() === list[i]){
                        num += i;
                    }
                }
            }else{
                if(!isNaN(parseInt(item))) {
                    num = num + parseInt(item)
                }
            }

        })
    }else {
        list.forEach((item,index) => {
            if(item == temp.substring(0,1).toUpperCase()){
                num = index;
            }
        })
    }

    
    let status = (num+6)%7;
    let state = '';
    switch(status){
        case 1:
            state = '#1c8fed'
            break;
        case 2:
            state = '#16a085'
            break;
        case 3:
            state = '#d7a200'
            break;
        case 4:
            state = '#e86534'
            break;
        case 5:
            state = '#599139'
            break;
        default:
            state = '#aa4db7'
            break;
    }
    return state;
}

let getAvartar = function(item) {
    let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    if(reg.test(item.substr(0,1))) {
        return item.substr(0,1);
    }else {
        return item.substr(0,2).toLocaleUpperCase();
    }
}

let getInstanceOperationCN = function(operation) {
    let result = '';

    switch(operation) {
        case 'boot':
            result = '开机';
            break;
        case 'shutdown':
            result = '关机';
            break;
        case 'hangup':
            result = '挂起';
            break;
        case 'resume':
            result = '恢复';
            break;
        case 'reboot':
            result = '软重启';
            break;
        case 'forcedReboot':
            result = '硬重启';
            break;
        case 'del':
            result = '删除';
            break;
        case 'verifyResize':
            result = '确认扩容';
            break;
        case 'coldMigration':
            result = '冷迁移';
            break;
        case 'novnc':
            result = '前往控制台';
            break;
        case 'reset':
            result = '重置';
            break;
        case 'quitRescue':
            result = '退出救援模式';
            break;
        case 'rescue':
            result = '进入救援模式';
            break;
        default:
            break;
    }

    return result;
};

let getStorageStatus = function(operation) {
    let result = '';

    switch(operation){
        case 'deleting':
            result = '删除中';
            break;
        case 'extending':
            result = '扩容中';
            break;
        case 'attaching':
            result = '挂载中';
            break;
        case 'detaching':
            result = '卸载中';
            break;
        case 'creating':
            result = '创建中';
            break;
        case 'error':
            result = '错误';
            break;
        case 'available':
            result = '未分配';
            break;
        default:
            result = '已分配';
            break;
    }

    return result;
};

let getStorageBackStatus = function(operation){
    let result = '';

    switch(operation){
        case 'deleting':
            result = '删除中';
            break;
        case 'backing-up':
            result = '回滚中';
            break;
        case 'deleted':
            result = '被删除';
            break;
        case 'unmanaging':
            result = '不可知错误';
            break;
        case 'restoring':
            result = '不可知错误';
            break;
        case 'error_deleting':
            result = '不可知错误';
            break;
        case 'creating':
            result = '创建中'
            break;
        case 'error':
            result = '错误';
            break;
        default:
            result = '可用';
            break;
    }

    return result;
}

let ismaintenance = function(server) {
    return server.metadata.ismaintenance === 'yes'
}

export default {
    getStorageStatus,
    getStorageBackStatus,
    getInstanceStatus,
    getFontColor,
    getAvartarColor,
    getAvartarFontColor,
    getAvartar,
    getInstanceOperationCN,
    ismaintenance
}