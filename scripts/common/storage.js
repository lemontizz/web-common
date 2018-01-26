
let token = function() {
    let token = window.localStorage.EVM_TOKEN;

    if(!token || token === 'null') {
        console.log('无token信息');
        return null;
    }
    
    try {
        return JSON.parse(token);
    } catch(e) {
        return null;
    }
}

let tokenId = function () {
    let tokenId = window.localStorage.EVM_TOKEN_ID;

    if(!tokenId || tokenId === 'null') {
        console.log('无tokenID');
        return null;
    }

    return tokenId;
}

let license = function () {
    let license = window.localStorage.EVM_LICENSE_INFO;

    if(!license || license === 'null') {
        return null;
    }

    try {
        return JSON.parse(license);
    } catch(e) {
        return null;
    }
}

let isSuperAdmin = function () {
    let tokenInfo = token();

    if(tokenInfo) {
        return tokenInfo.user.name === 'admin';
    } else {
        return false;
    }
}

let auth = function () {
    let auth = window.localStorage.EVM_USER_DETAIL;

    if(auth && auth !== 'null') {
        try {
            return JSON.parse(auth);
        } catch(e) {
            return null;
        }
    } else {
        return null;
    }
}

let selectedProject = function() {
    let project = window.localStorage.EVM_SELECTED_PROJECT;

    if(!project || project === 'null') {
        return null;
    }

    try {
        return JSON.parse(project);
    } catch(e) {
        return null;
    }
}

export default {
    token,
    tokenId,
    license,
    auth,
    isSuperAdmin,
    selectedProject,
};