<style lang="scss" scoped>
    .pagination{
        padding:20px;
        padding-right: 0;
        font-size: 12px;
        line-height: 30px;
        color:#667c99;
        p{              
            margin-right: 10px;
        }
        .page-area{
            display:flex;
            .prev-page,.next-page,li{
                display:block;
                width:30px;
                height:30px;
                text-align: center;
                background: #e0e4ea;
                border-radius:2px;
                color:#667c99;
            }
            .prev-page,.next-page{
                font-family:"宋体";
            }
            ul{
                display:flex;
                margin-right:5px;
                li{
                    margin-left:5px;
                    a{
                        display:block;
                        color:#5d6d7e;
                    }
                }
                li.active{
                    background: #a3b3cb;
                    a{
                        color:#fff;
                    }           
                }
            }
        }
    }
</style>

<template>
    <!-- <div class="pagination clearfix">               
        <div class="page-area float-r">
            <div class="page-area float-r">
                <ul>
                    <li><a @click="prev" :class="{'disabled': currentIndex === 1}" class="prev-page" href="javascript:;"><</a></li>
                    <li><a @click="next" :class="{'disabled': list.length != finalLimit}" class="next-page" href="javascript:;">></a></li>
                </ul>
            </div>
        </div>
    </div> -->
</template>

<script>
    import utils from '&/scripts/utils.js';
    import request from '&/scripts/request.js';
    import config from '&/scripts/config.js';

    export default {
        props: ['uri', 'limit', 'defaultSearch', 'searchParams', 'requestConfig', 'listKey'],
        data() {
            return {
                currentIndex: 1,
                list: [],
                pageMaker: {},
            }
        },
        computed: {
            finalLimit() {
                return this.limit ? Number(this.limit) + 1 : 11
            }
        },
        mounted() {
            if(this.defaultSearch === true) {
                this.getData();
            }
        },
        watch: {
            searchParams() {
                // console.log('xxxxx');
            }
        },
        methods: {
            prev() {
                this.currentIndex--;
                this.getData();
            },
            next() {
                this.currentIndex++;
                this.getData();
            },
            async getData() {
                let params = Object.assign({}, this.requestConfig || {}),
                    search = Object.assign({}, this.searchParams || {}),
                    result,
                    marker,
                    markerIndex;
                if(this.limit) {
                    search['limit'] = this.finalLimit;
                } else {
                    delete search['limit'];
                }

                if(this.currentIndex !== 1) {
                    search['marker'] = this.pageMaker[this.currentIndex - 1];
                } else {
                    delete search['marker'];
                }

                params['url'] = config.rootPath + utils.buildUrl(this.uri, search);

                params['headers'] = this.requestConfig || {};

                if(params.method === 'POST') {
                    params['url'] = config.rootPath + this.uri;
                    params['data'] = this.searchParams;
                } 

                try {
                    result = await request(params);
                } catch(e) {
                    return
                }
                this.$emit('search-finished', result.data.data[this.listKey].slice(0, result.data.data[this.listKey].length));

                if(search.status){
                    this.list = result.data.data[this.listKey].filter((item)=>{
                        return item.status === search.status; 
                    })
                }else {
                    this.list = result.data.data[this.listKey];
                }

                // this.list = result.data.data[this.listKey];

                if (this.list.length === 1) {
                    markerIndex = 0;
                    return;
                } else {
                    markerIndex = this.list.length - 2;
                }
                try {
                    marker = this.list[markerIndex].id;
                    if(this.currentIndex === 1) {
                        this.pageMaker = {};
                    }

                    this.pageMaker[this.currentIndex] = marker;
                } catch(e) {
                    // console.warn('set marker failed')
                }
            }
        },
    }
</script>