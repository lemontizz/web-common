import storage from './storage.js';
import store from '../../vuex/store';

let instanceIsShow = function(action, item) {
    let isShow = false,
        isSuperAdmin = storage.isSuperAdmin(),
        privilege = store.auth.privilege;

    switch(action) {
        case 'add':
            isShow = (isSuperAdmin || privilege['virtualMachine-add']);
            break;
        case 'boot':
            isShow = (isSuperAdmin || privilege['virtualMachine-start']);
            break;
        case 'shutdown':
            isShow = (isSuperAdmin || privilege['virtualMachine-shutdown']);
            break;
        case 'hangup':
            isShow = (isSuperAdmin || privilege['virtualMachine-hangup']);
            break;
        case 'resume':
            isShow = (isSuperAdmin || privilege['virtualMachine-restore']);
            break;
        case 'reboot':
            isShow = (isSuperAdmin || privilege['virtualMachine-reboot']);
            break;
        case 'forcedReboot':
            isShow = (isSuperAdmin || privilege['virtualMachine-hard-reboot']);
            break;
        case 'del':
            isShow = (isSuperAdmin || privilege['virtualMachine-delete']);
            break;
        case 'makeImage':
            isShow = (isSuperAdmin || privilege['virtualMachine-make-image']);
            break;
        case 'coldMigration':
            isShow = (isSuperAdmin || privilege['virtualMachine-cold-migrate']);
            break;
        case 'hotMigration':
            isShow = (isSuperAdmin || privilege['virtualMachine-hot-migrate']);
            break;
        case 'bindFloatIp':
            isShow = (isSuperAdmin || privilege['virtualMachine-floatingIp-binding']);
            break;
        case 'unbindFloatIp':
            isShow = (isSuperAdmin || privilege['virtualMachine-floatingIp-Unbundling']);
            break;
        case 'mountDisk':
            isShow = (isSuperAdmin || privilege['virtualMachine-mount']);
            break;
        case 'uninstallDisk':
            isShow = (isSuperAdmin || privilege['virtualMachine-uninstall']);
            break;
        case 'updateFlavor':
            isShow = (isSuperAdmin || privilege['virtualMachine-flavor']);
            break;
        case 'updateNetwork':
            isShow = (isSuperAdmin || privilege['virtualMachine-network']);
            break;
        case 'rateLimiting':
            isShow = (isSuperAdmin || privilege['virtualMachine-speed-limit']);
            break;
        case 'metadata':
            isShow = (isSuperAdmin || privilege['virtualMachine-metadata']);
            break;
        case 'rebuild':
            isShow = (isSuperAdmin || privilege['virtualMachine-rebuild']);
            break;
        case 'verifyResize':
            isShow = item.status !='VERIFY_RESIZE';
            break;
        default:
            break;
    }
    return isShow;
}

export default {
    instanceIsShow,
}
