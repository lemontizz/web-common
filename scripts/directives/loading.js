export default {
    name: 'loading',
    twoWay: true,
    deep: true,
    isNoData: false,
    isHaveData: true,
    params: ['data'],
    paramWatchers: {
        data() {
            this.checkData();
        }
    },
    bind() {
        this.creareDome();
    },
    update() {
    },
    creareDome() {
        let Html = "";
        if( this.isNoData ){
            Html = "<span class='nodata-icon'></span>没有查询到符合条件的记录";
        } else if( this.isHaveData ){
            Html = "<div class='loadEffect'><div><span></span></div><div><span></span></div><div><span></span></div><div><span></span></div></div><br>数据加载中...";
        } else if( !this.isNoData && !this.isHaveData ){
            Html = "";
        }
        this.el.innerHTML = Html;
    },
    checkData() {
        if( this.params.data instanceof Array ){
            if( this.params.data.length > 0 ){
                this.isHaveDataList();
            } else {
                this.isNodataList();
            }
        } else if( this.params.data instanceof Object ){
            if( this.params.data ){
                this.isHaveDataList();
            } else {
                this.isNodataList();
            }
        }
        this.creareDome();
    },
    isHaveDataList() {
        this.isNoData = false;
        this.isHaveData = false;
    },
    isNodataList() {
        this.isNoData = true;
        this.isHaveData = false;
    }
};