<style lang="scss">
    #tip-wrap {
        position: absolute;
        right: 20px;
        top: 60px;
        background: none;
        z-index: 1050;
        .alert {
            padding: 15px;
            margin-bottom: 20px;
            border: 1px solid transparent;
            border-radius: 4px;
        }
        .alert-success {
            color: #3c763d;
            background-color: #dff0d8;
            border-color: #d6e9c6;
        }
        .alert-info {
            color: #31708f;
            background-color: #d9edf7;
            border-color: #bce8f1;
        }
        .alert-warning {
            color: #8a6d3b;
            background-color: #fcf8e3;
            border-color: #faebcc;
        }
        .alert-danger {
            color: #a94442;
            background-color: #f2dede;
            border-color: #ebccd1;
        }
        .close {
            -webkit-appearance: none;
            padding: 0;
            cursor: pointer;
            background: 0 0;
            border: 0;
            float: right;
            font-size: 21px;
            font-weight: 700;
            line-height: 1;
            color: #000;
            text-shadow: 0 1px 0 #fff;
            opacity: .2;
            text-decoration: none;
        }
        p {
            margin: 0;
        }
    }
</style>

<template>
    <div id="tip-wrap"></div>
</template>

<script>
    import $ from 'jquery';

    export default {
        data() {
            return {
                id: 0,
            }
        },
        computed: {
            info() {
                return this.$store.state.common.tip;
            }
        },
        mounted() {
            $('#tip-wrap').on('click', '.close', function() {
                $(this).closest('.alert').remove();
            })
        },
        watch: {
            info() {
                this.addTip();
            }
        },
        methods: {
            addTip() {
                let html = `<div id="tip${this.id}" class="fade-transition alert top-right alert-${this.info.type}"  style="width: 400px;"><a href="javascript:;" type="button" class="close"><span>×</span></a><span class="icon-ok-circled alert-icon-float-left"></span><strong>${this.info.title}</strong>${this.info.message}</div>`;

                let fn = (function(id) {
                    return function() {
                        $('#tip' + id).remove();
                    }
                })(this.id);

                setTimeout(fn, 5000);

                $("#tip-wrap").html($("#tip-wrap").html() + html);
                this.id++;
            },
        }
    };
</script>