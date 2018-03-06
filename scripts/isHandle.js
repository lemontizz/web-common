let instanceIsHandle = function(action,status) {
	let isHandle = false,
		instanceStatusOption = [];

	switch(action) {
		case 'attachInterface':
			instanceStatusOption = ['ACTIVE','PAUSED','SHUTOFF'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'detachInterface':
			instanceStatusOption = ['ACTIVE','PAUSED','SHUTOFF'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'backup':
			instanceStatusOption = ['ACTIVE','PAUSED','SHUTOFF','SUSPENDED'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'attachVolume':
			instanceStatusOption = ['ACTIVE','PAUSED','SHUTOFF','RESIZED','SOFT_DELETED','SHELVED','SHELVED_OFFLOADED','LIVELY','FREE'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'detachVolume':
			instanceStatusOption = ['ACTIVE','PAUSED','SHUTOFF','RESIZED','SOFT_DELETED','SHELVED','SHELVED_OFFLOADED','LIVELY','FREE'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'confirmResize':
			instanceStatusOption = ['RESIZED'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'deleteInstanceMetadata':
			instanceStatusOption = ['ACTIVE','PAUSED','SUSPENDED','SHUTOFF'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'evacuate':
			instanceStatusOption = ['ACTIVE','SHUTOFF','ERROR'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'liveMigrate':
			instanceStatusOption = ['ACTIVE','PAUSED','LIVELY','FREE'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'liveMigrateAbort':
			instanceStatusOption = ['MIGRATING'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'liveMigrateForceComplete':
			instanceStatusOption = ['ACTIVE','MIGRATING'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'liveResize':
			instanceStatusOption = ['ACTIVE'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'pause':
			instanceStatusOption = ['ACTIVE'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'rebuild':
			instanceStatusOption = ['ACTIVE','SHUTOFF'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'recycle':
			instanceStatusOption = ['SHUTOFF','ERROR'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'terminateRecycleInstance':
			instanceStatusOption = ['SOFT_DELETED'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'rescue':
			instanceStatusOption = ['ACTIVE','SHUTOFF','ERROR'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'resize':
			instanceStatusOption = ['ACTIVE','SHUTOFF'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'restore':
			instanceStatusOption = ['SOFT_DELETED'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'resume':
			instanceStatusOption = ['SUSPENDED'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'reuse':
			instanceStatusOption = ['SOFT_DELETED'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'revert_resize':
			instanceStatusOption = ['RESIZED'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'shelve':
			instanceStatusOption = ['ACTIVE','SHUTOFF','PAUSED','SUSPENDED'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'shelveOffload':
			instanceStatusOption = ['SHELVED'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'snapshot':
			instanceStatusOption = ['ACTIVE','SHUTOFF','PAUSED','SUSPENDED'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'snapshotVolumeBacked':
			instanceStatusOption = ['ACTIVE','SHUTOFF','SUSPENDED'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'start':
			instanceStatusOption = ['SHUTOFF'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'stop':
			instanceStatusOption = ['ACTIVE','LIVELY','FREE'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'suspend':
			instanceStatusOption = ['ACTIVE','LIVELY','FREE'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'swapVolume':
			instanceStatusOption = ['ACTIVE','ERROR'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'unpause':
			instanceStatusOption = ['PAUSED'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'unrescue':
			instanceStatusOption = ['RESCUE'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'unshelve':
			instanceStatusOption = ['SHELVED','SHELVED_OFFLOADED'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'updateInstanceMetadata':
			instanceStatusOption = ['ACTIVE','PAUSED','SUSPENDED','SHUTOFF'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'reboot':
			instanceStatusOption = ['ACTIVE','LIVELY','FREE'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'forcedReboot':
			instanceStatusOption = ['ACTIVE','SHUTOFF','LIVELY','FREE'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'createImage':
			instanceStatusOption = ['SHUTOFF','SUSPENDED'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'coldMigrate':
			instanceStatusOption = ['SHUTOFF'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'createTemplate':
			instanceStatusOption = ['ERROR','RESCUE'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'adjustFlavor':
			instanceStatusOption = ['SHUTOFF'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'speedLimit':
			instanceStatusOption = ['ERROR','RESCUE'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'resetting':
			instanceStatusOption = ['ERROR'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'editInstance':
			instanceStatusOption = ['SHUTOFF'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'disconnect':
			instanceStatusOption = ['INSERVICE','FREE','LIVELY'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'defend':
			instanceStatusOption = ['ERROR'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'cancelDefend':
			instanceStatusOption = ['ERROR'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'bindGpu':
			instanceStatusOption = ['SHUTOFF'];
			isHandle = instanceStatusOption.includes(status);
			break;
		case 'uninstallGpu':
			instanceStatusOption = ['SHUTOFF'];
			isHandle = instanceStatusOption.includes(status);
			break;
		default:
			break;
	}
	return isHandle;
}

export default {
	instanceIsHandle,
}