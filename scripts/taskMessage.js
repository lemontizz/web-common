let trans = {
    'compute.instance.create': ['虚拟机', '构建中'],
    'compute.instance.create.start': ['虚拟机', '构建中'],
    'compute.instance.create_ip.start': ['虚拟机', '构建中'],
    'compute.instance.create.end': ['虚拟机', '创建完成'],
    'compute.instance.create.error': ['虚拟机', '创建失败'],
    'compute.instance.power_off.start': ['虚拟机', '关机中'],
    'compute.instance.power_off.end': ['虚拟机', '关机完成'],
    'compute.instance.power_on.start': ['虚拟机', '开机中'],
    'compute.instance.power_on.end': ['虚拟机', '开机完成'],
    'compute.instance.suspend.start': ['虚拟机', '挂起中'],
    'compute.instance.shutdown.end': ['虚拟机', '关机中'],
    'compute.instance.shutdown.start': ['虚拟机', '关机完成'],
    'compute.instance.suspend.end': ['虚拟机', '挂起完成'],
    'compute.instance.resume.start': ['虚拟机', '恢复中'],
    'compute.instance.resume.end': ['虚拟机', '恢复完成'],
    'compute.instance.reboot.start': ['虚拟机', '重启中'],
    'compute.instance.reboot.end': ['虚拟机', '重启完成'],
    'compute.instance.resize.end': ['虚拟机', '规格调整中'],
    'compute.instance.resize.start': ['虚拟机', '规格调整等待确认'],
    'compute.instance.resize.confirm.start': ['虚拟机', '调整规格中'],
    'compute.instance.resize.confirm.end': ['虚拟机', '调整规格完成'],
    'compute.instance.resize.prep.start': ['虚拟机', '迁移中'],
    'compute.instance.resize.prep.end': ['虚拟机', '规格调整完成'],
    'compute.instance.finish_resize.start': ['虚拟机', '迁移中'],
    'compute.instance.finish_resize.end': ['虚拟机', '迁移完成'],
    'compute.instance.live_migration.pre.start': ['虚拟机', '迁移中'], 
    'compute.instance.live_migration._post.end': ['虚拟机', '迁移完成'],
    'compute.instance.resize.error': ['虚拟机', '规格调整失败'],
    'compute.instance.volume.attach': ['虚拟机', '挂载云硬盘完成'],
    'compute.instance.volume.detach': ['虚拟机', '卸载云硬盘完成'],
    'compute.instance.delete.start': ['虚拟机', '删除中'],
    'compute.instance.delete.end': ['虚拟机', '删除完成'],
    'compute.instance.rebuild.end': ['虚拟机', '重建完成'],
    'compute.instance.rebuild.error': ['虚拟机', '重建失败'],
    'compute.instance.rebuild.start': ['虚拟机', '重建中'],
    'compute.instance.rescue.start':['虚拟机','开始进入救援模式'],
    'compute.instance.rescue.end':['虚拟机','进入救援模式完毕'],
    'compute.instance.snapshot.start': ['快照', '构建中'],
    'compute.instance.snapshot.end': ['快照', '构建完成'],
    'compute.instance.rescue.start':['虚拟机','开始进入救援模式'],
    'compute.instance.rescue.end':['虚拟机','进入救援模式完毕'],
    'volume.create.start': ['数据盘', '创建中'],
    'volume.create.end': ['数据盘', '创建完成'],
    'volume.attach.start': ['数据盘', '挂载中'],
    'volume.attach.end': ['数据盘', '挂载完成'],
    'volume.detach.start': ['数据盘', '卸载中'],
    'volume.detach.end': ['数据盘', '卸载完成'],
    'volume.resize.start': ['数据盘','扩容中'],
    'volume.resize.end':['数据盘','扩容完成'],
    "volume.update.start":['数据盘','编辑中'],
    "volume.update.end":['数据盘','编辑完成'],
    'volume.delete.start': ['数据盘', '删除中'],
    'volume.delete.end': ['数据盘', '删除完成'],
    "snapshot.create.start":['快照','创建中'],
    "snapshot.create.end":['快照','创建完成'],
    "snapshot.delete.start":['快照','删除中'],
    "snapshot.delete.end":['快照',"删除成功"],
    "image.prepare": ['镜像', '准备中'],
    "image.upload": ['镜像', '制作中'],
    "image.activate": ['镜像', '制作完成'],
    'floatingip.update.start': ['浮动IP', '绑定中'],
    'floatingip.update.end': ['浮动IP', '绑定完成'],
}

let getMessage = function(data) {
    if(!data.data.event_type) return;

    let transItem = trans[data.data.event_type];

    if(transItem) {
        return transItem[0] + (data.name || '') + transItem[1];
    } else {
        return data.name + '操作中...'
    }
};

let isInstanceError = function(data) {
    return data.event_type && data.event_type === 'compute.instance.update' && data.payload.state === 'error';
}

let isCreateInstanceFinished = function(data) {
    return (data.event_type === 'compute.instance.create.end' || data.event_type === 'compute.instance.create.error');
}

let isInstanceOperation = function(data) {
    return data.event_type && data.event_type.startsWith('compute.instance');
}

let isVolumeOperation = function(data) {
    return data.event_type && data.event_type.startsWith('volume.');
}

let isFinished = function(data) {
    return data.event_type && ((data.event_type.endsWith('.end') || data.event_type.endsWith('.error')) || data.event_type == 'image.activate');
}

let isFlavorChange = function(data) {
    return (['compute.instance.resize.prep.end', 'compute.instance.resize.confirm.end'].includes(data.event_type));
}

let isInstanceDettachVolume = function(data) {
    return data.event_type === 'compute.instance.volume.detach';
}

let isSnapshotOperation = function(data) {
    return data.event_type && data.event_type.startsWith('snapshot.');
}

let isInstanceDelFinished = function(data) {
    return data.event_type && data.event_type === 'compute.instance.delete.end';
}

let isRepeatMsg = function(oldMsg, newMsg) {
    if(!oldMsg || !oldMsg.event_type) {
        return false;
    }

    if(!newMsg || !newMsg.event_type) {
        return false;
    }

    if(oldMsg.event_type !== newMsg.event_type) {
        return false;
    }

    if(isInstanceOperation(newMsg)) {
        if(!newMsg.payload.instance_id) {
            return false;
        }
        if(oldMsg.payload.instance_id === newMsg.payload.instance_id) {
            return true;
        }
    }
    if(isVolumeOperation(newMsg) || isSnapshotOperation(newMsg)) {
        if(!newMsg.payload.id) {
            return false;
        }
        if(oldMsg.payload.id === newMsg.payload.id) {
            return true;
        }
    }
}

let isResizeFinished = function(data) {
    return data.payload.old_state === "resized" && data.payload.state === 'stopped';
}

let isFloatingIpBindFinished = function(data) {
    return data.event_type && data.event_type === 'floatingip.update.end';
}

let isInstanceUserOperation = function(data) {
    return data.event_type && data.event_type === 'instance.state.user';
}

let isRebuildInstanceStart = function(data) {
    return data.event_type && data.event_type === 'compute.instance.rebuild.start';
}

export default {
    getMessage,
    isCreateInstanceFinished,
    isInstanceOperation,
    isFinished,
    isVolumeOperation,
    isSnapshotOperation,
    isFlavorChange,
    isInstanceDelFinished,
    isRepeatMsg,
    isInstanceDelFinished,
    isResizeFinished,
    isFloatingIpBindFinished,
    isInstanceDettachVolume,
    isInstanceError,
    isInstanceUserOperation,
    isRebuildInstanceStart,
}