<style lang="scss">
    .page-alert {
        .modal-dialog {
            position: absolute;
            width: 500px;
            height: 300px;
            left: 50%;
            top: 50%;
            margin-left: -250px;
            margin-top: -150px;
            .modal-header {
                background: #F0F1F2;
                width: 100%;
                height: 45px;
                background: #434a52;
                color: #fff;
                padding: 0 19px;
                box-sizing: border-box;
                font-size: 14px;
                line-height: 45px;
                span {
                    font-size: 16px;
                }
            }
            .modal-body {
                padding: 20px 15px;
                min-height: 30px;
                .alert-text {
                    word-break: break-all;
                }
                .text-link {
                    font-size: 10px;
                    color: #62A8EA;
                    margin-left: 7px;
                }
                textarea {
                    border: 1px solid #E1E5EC;
                    margin-top: 10px;
                }
            }
            .modal-footer {
                background: #F0F1F2;
                border-top: 1px solid #E5E5E5;
                padding: 10px;
                .btn {
                    padding: 0 10px;
                    width: auto;
                    line-height: 32px;
                    height: 32px;
                }
                .btn-primary {
                    background: #fff;
                }
                .btn-primary:hover {
                    background: #fff;
                }
                .btn-active:hover {
                    background: #45C6F8;
                }
            }
        }
    }
</style>

<template>
    <div :show.sync="info.show" class="page-modal page-alert" style="z-index: 9999;" :class="info.show ? 'show' : 'hide'">
        <div class="modal-dialog" style="width: 500px;">
            <div class="modal-content">
                <div slot="modal-header" class="modal-header">
                    <span>{{info.title}}</span>
                    <a href="javascript:;" class="close" @click="onCancel"></a>
                </div>
                <div slot="modal-body" class="modal-body">
                    <div class="alert-text">
                        {{info.message}}
                        <a class="text-link" href="javascript:;" v-show="info.origin === 'error'" @click="showErrorInfo = !showErrorInfo">详情</a>
                    </div>
                    <textarea v-show="showErrorInfo" cols="65" rows="10" :value="info.errorInfo" readonly></textarea>
                </div>
                <div slot="modal-footer" class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="onCancel">{{info.canceltext}}</button>
                    <button type="button" class="btn btn-active" @click="onConfrim">{{info.oktext}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';

    export default {
        computed: {
            info() {
                return this.$store.state.common.alert;
            }
        },
        watch: {
            info() {
                this.showErrorInfo = false;
            }
        },
        data() {
            return {
                showErrorInfo: false,
            }
        },
        methods: {
            onCancel: function () {
                if(this.info.callbacks && typeof this.info.callbacks.onCancel === 'function') {
                    this.info.callbacks.onCancel()
                } else {
                    this.hideAlert()
                }
            },
            onConfrim: function () {
                if(this.info.callbacks && typeof this.info.callbacks.onConfirm === 'function') {
                    this.info.callbacks.onConfirm()
                } else {
                    this.hideAlert()
                }
            },
            hideAlert: function () {
                this.$store.dispatch('HIDE_ALERT');
            },
        }
    };
</script>