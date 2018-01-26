<style lang="scss">
    
</style>

<template>
    <button class="default-button" type="button" @click="clicked()" @mouseenter="hoverBtn()"><span></span>{{text}}</button>
</template>

<script>
    export default {
        props: ['text'],
        data() {
            return {

            }
        },
        methods: {
            clicked() {
                this.$emit('click');
            },
            hoverBtn() {
                console.log('hover');
            },
        }
    }
</script>