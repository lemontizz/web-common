
<template>
    <input type="number" v-model="model" @keyup="keyUp">
</template>

<script>
    export default {
        props: ['parentkey', 'model', 'min', 'max'],
        methods: {
            keyUp() {
                this.model = String(this.model) || '';
                this.$parent[this.parentkey] = String(this.model) || '';
                if(this.model.length && this.min) {
                    if(Number(this.model) < this.min) {
                        this.model = String(this.min) || '';
                        this.$parent[this.parentkey] = String(this.min) || '';
                    }
                }
                if(this.model.length && this.max) {
                    if(Number(this.model) > this.max) {
                        this.model = String(this.max) || '';
                        this.$parent[this.parentkey] = String(this.max) || '';
                    }
                }
            }
        }
    }
</script>