<style lang="scss" scoped>
    .pagination{
        padding:20px;
        padding-right: 0;
        padding-left:0;
        font-size: 12px;
        line-height: 30px;
        color:#667c99;
        p{              
            margin-right: 10px;
        }
        .limit{
            font-size:13px;
            color:#797b7b;
            font-family: PingFangSC;
            span{
                margin-right:20px;
            }
            a{
                font-family: PingFangSC;
                color:#86939e;
                font-size:13px;
                margin-right:15px;
            }
            a:last-child{
                margin-right:0;
            }
            .active{
                color:#3ba3f8;
            }
        }
        .page-area{
            display:flex;
            .prev-page,.next-page{
                display:block;
                width:24px;
                height:24px;
                text-align: center;
                background: #e1e5ec;
                border-radius:3px;
                color:#616262;
                line-height:24px;
                margin-top:3px;
            }
            .prev-page,.next-page{
                font-family:"宋体";
            }
            .prev-page{
                span{
                    display:inline-block;
                    width: 0;
                    height: 0;
                    border-top: 4px solid transparent;
                    border-right: 6px solid #616262;
                    border-bottom: 4px solid transparent;
                }

            }
            .next-page{
                span{
                    display:inline-block;
                    width: 0;
                    height: 0;
                    border-top: 4px solid transparent;
                    border-left: 6px solid #616262;
                    border-bottom: 4px solid transparent;
                }

            }
            ul{
                display:flex;
                margin-right:5px;
                li{
                    width:auto;
                    height:24px;
                    padding:0 10px;
                    color:#616262;
                    font-size:14px;
                    text-align:center;
                    line-height:30px;
                    background:none;
                    margin-left:0px;
                    a{
                        display:block;
                        color:#5d6d7e;
                    }
                }
                li.active{
                    background: none;
                    color:#3ba3f8;
                    a{
                        color:#3ba3f8;
                    }           
                }
            }
        }
        .m-l-10{
            margin-left:10px;
        }
    }
</style>

<template>
    <div class="pagination clearfix">
        <div class="float-l limit">
            <span>每一页显示</span>
            <a href="javascript:;" v-for="(item,index) in limits" @click="getLimit(item,index)" :class="index === order?'active':''">
                {{ item }}
            </a>
        </div>              
        <div class="page-area float-r">
            <!-- <a class="prev-page" href="javascript:;" @click="gotoPage('top')" :class="[!total || current == 1 || numbers.length == 1 ? 'disabled' : '']"><<</a> -->
            <a class="prev-page m-l-10" href="javascript:;" @click="gotoPage('prev')" :class="[!total || current == 1 || numbers.length == 1 ? 'disabled' : '']"><span></span></a>
            <ul>
                <li v-show="showPrevEllipsis"  href="javascript:;" @click="gotoPage('top')" :class="[!total || current == 1 || numbers.length == 1 ? 'disabled' : '']">
                    <a href="javascript:;">1</a>
                </li>
                <li v-show="showPrevEllipsis"><a @click="gotoPage('prevEllipsis')" href="javascript:;">...</a></li>
                <template v-for="n in numbers">
                    <li :class="[current == n ? 'active' : '']"><a @click="gotoPage('page', n)" href="javascript:;">{{n}}</a></li>
                </template>
                <li v-show="showNextEllipsis"><a @click="gotoPage('nextEllipsis')" href="javascript:;">...</a></li>
                <li v-show="showNextEllipsis"  href="javascript:;" @click="gotoPage('bottom')" :class="[!total || current == pageTotal ? 'disabled' : '']">
                    <a href="javascript:;">{{ pageTotal }}</a>
                </li>
            </ul>
            <a class="next-page" href="javascript:;" @click="gotoPage('next')" :class="[!total || current == pageTotal ? 'disabled' : '']"><span></span></a>
            <!-- <a class="next-page m-l-10" href="javascript:;" @click="gotoPage('bottom')" :class="[!total || current == pageTotal ? 'disabled' : '']">>></a> -->
        </div>
        <!-- <p class="float-r">共有{{total}}条，每页显示{{limit}}条</p> -->
    </div>
</template>

<script>
    export default {
        props: ['list', 'current', 'interval'],
        data() {
            return {
                numbers: [],
                pageTotal: 0,
                pageStart: 1,
                pageEnd: 1,
                showPrevEllipsis: false,
                showNextEllipsis: false,
                limits:[10,20,30,50,'所有'],
                limit:10,
                order:0,
            }
        },
        computed: {
            originList() {
                return this.list;
            },
            total() {
                return this.list.length || 0;
            }
        },
        watch: {
            list() {
                this.build();
                this.rebuild(this.current);
            },
            current() {
                this.build();
            },
        },
        methods: {
            build: function() {
                let total = this.total,
                    interval = this.interval,
                    current = Number(this.current),
                    limit = this.limit,
                    pageTotal = total > 0 && (total % limit > 0) ? Math.ceil(total / limit) : Math.floor(total / limit);

                this.pageTotal = pageTotal;

                this.buildCurrent();  

                let prevEllipsis = (pageTotal > interval && current > Math.ceil(interval / 2)),
                    nextEllipsis = (pageTotal > interval && current <= (pageTotal - Math.ceil(interval / 2)));

                this.showPrevEllipsis = prevEllipsis ? true : false;
                this.showNextEllipsis = nextEllipsis ? true : false;
            },
            buildCurrent() {
                let current = Number(this.current) || 1,
                    pageTotal = this.pageTotal,
                    interval = this.interval,
                    pageTotalMoreInterval = (pageTotal > interval);

                if(current == 1) {
                    this.pageStart = 1;
                    this.pageEnd = pageTotalMoreInterval ? this.pageStart + (interval - 1) : pageTotal;
                } else if (current == pageTotal) {
                    this.pageStart = pageTotalMoreInterval ? current - (interval - 1) : 1;
                    this.pageEnd = current;
                } else if(current - Math.floor(interval / 2) <= 0) {
                    this.pageStart = 1;
                    this.pageEnd = pageTotalMoreInterval ? this.pageStart + (interval - 1) : pageTotal;
                } else if (current + Math.floor(interval / 2) > pageTotal) {
                    this.pageEnd = pageTotal;
                    this.pageStart = pageTotalMoreInterval ? pageTotal - (interval - 1) : 1;
                } else {
                    this.pageStart = current - Math.floor(interval / 2);
                    this.pageEnd = current + Math.floor(interval / 2);
                }

                if(this.pageEnd <= 1) {
                    this.numbers = [1];
                } else {
                    let numbers = [];
                    for(let i = this.pageStart; i <= this.pageEnd; i++) {
                        numbers.push(i);
                    }
                    this.numbers = numbers;
                }
            },
            gotoPage(action, num) {
                let page;

                switch(action) {
                    case 'top':
                        page = 1;
                        break;
                    case 'prev':
                        page = this.current - 1;
                        break;
                    case 'prevEllipsis':
                        page = this.pageStart - 1;
                        break;
                    case 'nextEllipsis':
                        page = this.pageEnd + 1;
                        break;
                    case 'next':
                        page = this.current + 1;
                        break;
                    case 'bottom':
                        page = this.pageTotal;
                        break;
                    case 'page':
                        page = num;
                        break;
                    default:
                        break;
                }
                
                this.rebuild(page);
            },
            getLimit(item,index) {
                if(item === '所有') {
                    this.limit = this.list.length;
                }else{
                    this.limit = item;
                }

                this.order = index;

                this.build();
                this.rebuild(1);

            },
            rebuild(page) {
                let end = page * this.limit,
                    start = end - this.limit,
                    data = this.list.slice(start, end);
                this.$emit('goto', data, page);
                this.build();
            },
        },
    }
</script>
