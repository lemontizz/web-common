<template>
    <span class="checkbox-item" :class="{'checked': isChecked=== 'true', 'disabled': isDisabled === 'true', 'clickfalse': event === 'false'}" @click="checkedItem">
        <span class="checkbox"></span>
        <span class="text">{{text}}</span>
    </span>
</template>

<script>
    export default {
        props: ['list', 'value', 'text', 'checked', 'disabled', 'event'],
        mounted() {
            if(this.checked === 'true') {
                this.list.push(this.value);
            }
        },
        watch:{
            checked(){
                if(this.checked === 'true') {
                    this.list.push(this.value);
                    this.isChecked = 'true';
                }
            },
            list() {
                if(!this.list.length){
                    this.isChecked = 'false';
                }
            }
        },
        data() {
            return {
                isChecked: this.checked || 'false',
                isDisabled: this.disabled || 'false',
            }
        },
        methods: {
            checkedItem() {
                let self = this;

                if(this.event === 'false') return;
                
                if(this.list.includes(this.value)) {
                    this.isChecked = 'false';
                    this.list.findIndex(function(value, index, arr) {
                        if(value === self.value) {
                            arr.splice(index, 1);
                            return;
                        }
                    });
                } else {
                    this.isChecked = 'true';
                    this.list.push(this.value);
                }
            }
        }
    }
</script>