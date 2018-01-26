import request from '../common/request';
import $ from 'jquery';

export default {
    name: 'paging',
    twoWay: true,
    deep: true,
    interval: 5,
    pageTotal: 0,
    pageStart: 0,
    pageEnd: 0,
    /*
        url: 请求的纯url，不带参数
        method: 请求的类型
        parameter: 请求时带的参数，例如: {sort_dir: 'desc', sort_key: 'name'}
        key: 获取到数据之后取的list的key值：{data: {server: []}}  -> key=>server;
        current: page index
        limit: 每页请求数量
        reload: 是否重新请求，当reload改变时会重新调用reload方法请求数据
    */
    params: ['url', 'method', 'parameter', 'key', 'current', 'limit', 'reload', 'headers'],
    paramWatchers: {
        reload() {
            this.getData();
        }
    },
    bind() {
        this.bindEvents();
        this.getData();
    },
    update() {
    },
    async getData() {
        this.params.current = this.params.current || 1;
        this.params.limit = this.params.limit || 10;

        let url = this.params.url + '?limit=' + this.params.limit + '&page_index=' + this.params.current;

        if(this.params.parameter) {
            for(let key in this.params.parameter) {
                if(this.params.parameter[key]) {
                    url += '&' + key + '=' + this.params.parameter[key];
                }
            }
        }
        let requestInfo = {
                url,
                method: this.params.method || 'GET',
            };

        if(this.params.headers) {requestInfo['headers'] = this.params.headers}

        let result = await request(requestInfo),
            list = result.data[this.params.key];

        if(!list) {
            console.warn('返回数据中无' + this.params.key + ':' + url);
            console.log(result.data);
        }
        if(!(list instanceof Array)) {
            console.warn('返回数据非数组:' + url);
        }
        if(!result.data.total) {
            console.warn('返回数据无total参数:' + url);
        }
        let data = {
            data: result.data[this.params.key],
            total: result.data.total || 0,
        };

        this.set(result.data[this.params.key]);
        this.buildHtml(data);
    },
    buildHtml(alldata) {
        let total = alldata.total,
            interval = this.interval,
            current = Number(this.params.current),
            limit = this.params.limit,
            pageTotal = total > 0 && (total % limit > 0) ? Math.ceil(total / limit) : Math.floor(total / limit),
            totalZero = (pageTotal === 0);

        this.pageTotal = pageTotal;

        this.buildCurrent();

        let topDisabled = (current === 1 || totalZero),
            prevDisabled = topDisabled,
            nextDisabled = (current === pageTotal || totalZero),
            bottomDisabled = nextDisabled,
            prevEllipsis = (pageTotal > interval && current > Math.ceil(interval / 2)),
            nextEllipsis = (pageTotal > interval && current <= (pageTotal - Math.ceil(interval / 2)));

        let output = '<div class="paging"><ul><li class="records">共有' + total + '条，每页显示' + limit + '条</li>';

        output += '<li data-action="first" class="first ' + (topDisabled ? 'disabled' : '') + '"><button>首页</button></li>'; 
        output += '<li data-action="prev" class="prev ' + (prevDisabled ? 'disabled' : '') + '"><button>上一页</button></li>';

        if(prevEllipsis) {
            output += '<li data-action="prev-ellipsis" class="ellipsis"><button>...</button></li>';
        }

        for(let i = this.pageStart; i <= this.pageEnd; i++) {
            output += '<li data-action="page" data-value="' + i + '" class="page' + (current == i ? ' active' : '') + '"><button>' + i + '</button></li>';
        }

        if(nextEllipsis) {
            output += '<li data-action="next-ellipsis" class="ellipsis"><button>...</button></li> ';
        }

        output += '<li data-action="next" class="next ' + (nextDisabled ? 'disabled' : '') + '"><button>下一页</button></li>';
        output += '<li data-action="last" class="last ' + (bottomDisabled ? 'disabled' : '') + '"><button>尾页</button></li>';
        output += '</ul></div>';

        this.el.innerHTML = output;
    },
    buildCurrent() {
        let current = Number(this.params.current) || 1,
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
    },
    bindEvents() {
        let self = this;
        let $el = $(this.el);

        $el.on('click', 'li', function() {
            let action = $(this).attr('data-action');
            let value = $(this).attr('data-value');
            self.gotoPage(action, value, $(this));
        });
    },
    gotoPage(action, value, $el) {

        if($el.hasClass('disabled')) return;

        switch(action) {
            case 'first':
                this.params.current = 1;
                break;
            case 'prev':
                this.params.current = this.params.current - 1;
                break;
            case 'prev-ellipsis':
                this.params.current = this.pageStart - 1;
                break;
            case 'next-ellipsis':
                this.params.current = this.pageEnd + 1;
                break;
            case 'next':
                this.params.current = this.params.current + 1;
                break;
            case 'last':
                this.params.current = this.pageTotal;
                break;
            case 'page':
                this.params.current = value;
                break;
            default:
                break;
        }
        this.getData();
    },
};