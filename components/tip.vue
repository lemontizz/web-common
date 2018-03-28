<style lang="scss">
    #tip-wrap {
        position: absolute;
        right: 20px;
        top: 60px;
        background: none;
        z-index: 1050;
        width: 384px;
        .el-alert {
            margin-top: 10px;
        }
    }
    .el-alert.el-alert--info {
        box-shadow: 0px 0px 10px -2px #909399
    }
    .el-alert.el-alert--success {
        box-shadow: 0 0 10px -2px #67C23A;
    }
    .el-alert.el-alert--warning {
        box-shadow: 0 0 10px -2px #E6A23C;
    }
    .el-alert.el-alert--error {
        box-shadow: 0 0 10px -2px #F56C6C;
    }
</style>

<template>
    <div id="tip-wrap">
        <template v-for="item of tips">
            <el-alert v-if="item" :title="String(item.message)" :type="getType(item.type)" show-icon @close="closeTip(item)"></el-alert>
        </template>
    </div>
</template>

<script>
    import $ from 'jquery';

    export default {
        computed: {
            tips() {
                return this.$store.state.common.tips;
            }
        },
        watch: {
            info() {
                this.addTip();
            }
        },
        methods: {
            getType(type) {
                if(type === 'danger') {
                    return 'error';
                }
                return type;
            },
            closeTip(item) {
                console.log()
            }
        }
    };
</script>