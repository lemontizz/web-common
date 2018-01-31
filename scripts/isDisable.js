let instanceIsDisable = function(action, item) {
    let isDisabled = false;

    switch(action) {
        case 'boot':
            isDisabled = (item.status === 'VERIFY_RESIZE' || item.status !=='SHUTOFF');
            break;
        case 'shutdown':
            isDisabled = (item.status !=='ACTIVE' && item.status !== 'ERROR');
            break;
        case 'hangup':
            isDisabled = (item.status === 'SUSPENDED' || item.status == 'ERROR' || item.status =='SHUTOFF' || item.status == 'VERIFY_RESIZE');
            break;
        case 'resume':
            isDisabled = item.status !== 'SUSPENDED';
            break;
        case 'reboot':
            isDisabled = (item.status === 'SUSPENDED' || item.status === 'ERROR' || item.status == 'VERIFY_RESIZE' || item.status !== 'ACTIVE');
            break;
        case 'forcedReboot':
            isDisabled = (item.status === 'SUSPENDED' || item.status === 'ERROR' || item.status == 'VERIFY_RESIZE');
            break;
        case 'del':
            isDisabled = item.status === 'ACTIVE';
            break;
        case 'makeImage':
            isDisabled = (item.status === 'ERROR') || (item.status !== 'SHUTOFF');
            break;
        case 'coldMigration':
            isDisabled = (item.status !== 'SHUTOFF');
            break;
        case 'hotMigration':
            isDisabled = (item.status !== 'ACTIVE');
            break;
        case 'bindFloatIp':
            isDisabled = (item.status ==='ERROR' || (item.floatingips && item.floatingips.length));
            break;
        case 'unbindFloatIp':
            isDisabled = (item.status ==='ERROR' || (!item.floatingips && !item.floatingips.length));
            break;
        case 'mountDisk':
            isDisabled = (item.status ==='ERROR');
            break;
        case 'uninstallDisk':
            isDisabled = (item.status === 'ERROR' || (item['os-extended-volumes:volumes_attached'].length===0));
            break;
        case 'updateFlavor':
            isDisabled = (!('flavorData' in item) || item.status !='SHUTOFF');
            break;
        case 'updateNetwork':
            isDisabled = (item.status !='SHUTOFF');
            break;
        case 'rateLimiting':
            isDisabled = (item.status ==='ERROR');
            break;
        case 'metadata':
            isDisabled = (item.status ==='ERROR');
            break;
        case 'rebuild':
            isDisabled = (item.status == 'ERROR');
            break;
        default:
            break;
    }
    return isDisabled;
}

export default {
    instanceIsDisable,
}

