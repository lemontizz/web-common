<style lang="scss">
    .tooltip {
        position: absolute;
        z-index: 1070;
        display: block;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 1.42857143;
        text-align: left;
        text-align: start;
        text-decoration: none;
        text-shadow: none;
        text-transform: none;
        letter-spacing: normal;
        word-break: normal;
        word-spacing: normal;
        word-wrap: normal;
        white-space: normal;
    }
    .tooltip-inner {
        max-width: 200px;
        padding: 3px 8px;
        color: #fff;
        text-align: center;
        background-color: #cc2828;
        border-radius: 4px;
    }
    .tooltip-arrow {
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
    }
    .tooltip.top .tooltip-arrow {
        bottom: -5px;
        left: 50%;
        margin-left: -5px;
        border-width: 5px 5px 0;
        border-top-color: #cc2828;
    }
</style>

<template>
    <div class="tooltip top">
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner">{{text}}</div>
    </div>
</template>

<script>
    export default {
        props: ['text']
    }
</script>