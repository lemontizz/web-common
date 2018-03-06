let getLocalTime = function(nS) {
    let date = new Date(nS*1000),
        Y = date.getFullYear() + '-',
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
        D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ',
        h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':',
        m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':',
        s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;  
};

let getMaxLengthAxisIndex = function(options,dataType,model) {
    let key_ = dataType,
        index = 0,
    	arr = [],
    	turn = 0;

    if(model === 'single') {
    	for(let i = 0;i < options.length;i++){
    	    let max = options[i].data[dataType][0].items.value.length;

    	    for(let key in options[i].data){

    	        if(max < options[i].data[key][0].items.value.length){
    	            max = options[i].data[key][0].items.value.length;
    	            key_ = key;
    	        }                  
    	    }

    	    arr.push({
    	        max,key_,turn
    	    })
    	}
    }else {
    	for(let i = 0;i<options.length;i++){
    	    let max = options[i].data[dataType][0][0].items.value.length;

    	    for(let j = 0;j<options[i].data[dataType].length;j++){
    	        if(options[i].data[dataType][0][0].items.value.length < options[i].data[dataType][1][0].items.value.length){
    	            turn = 1;
    	        }
    	    }

    	    arr.push({
    	        max,key_,turn
    	    })
    	}
    }

    let maxOption = arr[0].max;

    for(let k = 0;k<arr.length;k++){
        if(maxOption < arr[k]['max']){
            maxOption = arr[k]['max'];
            index = k;
        }
    }

    return {
        index:index,
        key:arr[index]['key_'],
        turn:turn
    }

}

let read = function(iNow,turn,temp,item,arr1,value,dataType){
    let bSin = false,
        value_ = '',
        num = turn,
        dataTemp = item.data[dataType][0][0].items.value;

    for(let i = turn;i<temp.length*iNow/10;i++){
        num++;
        for(let j = 0; j < dataTemp.length; j++){
            if(dataType === 'netData'){
                if(value === '近一周'){
                    if(parseInt(temp[i].clock)-150 <= parseInt(dataTemp[j].clock) && parseInt(temp[i].clock)+150 >=parseInt(dataTemp[j].clock)){
                        value_ = parseFloat(dataTemp[j].value/1000/1000).toFixed(2);
                        bSin = true;
                    }
                }else {
                    if(parseInt(temp[i].clock)-60 <= parseInt(dataTemp[j].clock) && parseInt(temp[i].clock)+60 >=parseInt(dataTemp[j].clock)){
                        value_ = parseFloat(dataTemp[j].value/1000/1000).toFixed(2);
                        bSin = true;
                    }
                }
            }else {
                if(value === '近一周'){
                    if(parseInt(temp[i].clock)-150 <= parseInt(dataTemp[j].clock) && parseInt(temp[i].clock)+150 >=parseInt(dataTemp[j].clock)){
                        value_ = parseFloat(dataTemp[j].value).toFixed(2);
                        bSin = true;
                    }
                }else {
                    if(parseInt(temp[i].clock)-60 <= parseInt(dataTemp[j].clock) && parseInt(temp[i].clock)+60 >=parseInt(dataTemp[j].clock)){
                        value_ = parseFloat(dataTemp[j].value).toFixed(2);
                        bSin = true;
                    }
                }
            }
        }

        if(!bSin){
            value_ = '-';
        }
        arr1.push(value_);      
    }

    if(arr1.length < temp.length){
        iNow++;
        turn = num;
        setTimeout(read(iNow,turn,temp,item,arr1,value,dataType),0);
    }
}

let write = function(iNow,turn,temp,item,arr2,value,dataType) {
    let bSin = false,
        value_ = '',
        num = turn,
        dataTemp = item.data[dataType][1][0].items.value;

    for(let i = turn;i<temp.length*iNow/10;i++){
        num++;
        for(let j = 0; j < dataTemp.length; j++){
            if(dataType === 'netData'){
                if(value === '近一周'){
                    if(parseInt(temp[i].clock)-240 <= parseInt(dataTemp[j].clock) && parseInt(temp[i].clock)+240 >=parseInt(dataTemp[j].clock)){
                        value_ = parseFloat(dataTemp[j].value/1000/1000).toFixed(2);
                        bSin = true;
                    }
                }else {
                    if(parseInt(temp[i].clock)-60 <= parseInt(dataTemp[j].clock) && parseInt(temp[i].clock)+60 >=parseInt(dataTemp[j].clock)){
                        value_ = parseFloat(dataTemp[j].value/1000/1000).toFixed(2);
                        bSin = true;
                    }
                }
            }else {
                if(value === '近一周'){
                    if(parseInt(temp[i].clock)-240 <= parseInt(dataTemp[j].clock) && parseInt(temp[i].clock)+240 >=parseInt(dataTemp[j].clock)){
                        value_ = parseFloat(dataTemp[j].value).toFixed(2);
                        bSin = true;
                    }
                }else {
                    if(parseInt(temp[i].clock)-60 <= parseInt(dataTemp[j].clock) && parseInt(temp[i].clock)+60 >=parseInt(dataTemp[j].clock)){
                        value_ = parseFloat(dataTemp[j].value).toFixed(2);
                        bSin = true;
                    }
                }
            }
        }

        if(!bSin){
            value = '-';
        }
        arr2.push(value_);      
    }

    if(arr2.length < temp.length){
        iNow++;
        turn = num;
        setTimeout(write(iNow,turn,temp,item,arr2,value,dataType),0)
    }else {
        return arr2;
    }
}

let getChartSeriesData = function(options,item,result,value,dataType) {
    let temp = null;
    temp = options[result.index].data[dataType][0].items.value.map((j)=>j);
    if(value === '近一天'){
        temp = options[result.index].data[dataType][0].items.value.filter((i,n)=>{
            return n%5 === 0;
        }).map((j)=>j);
    }
    if(value === '近一周'){
        temp = options[result.index].data[dataType][0].items.value.filter((i,n)=>{
            return n%60 === 0;
        }).map((j)=>j);
    }

    return temp.map((i)=>{
        let bSin = false;
        let value = '';

        item.data[dataType][0].items.value.forEach((strip)=>{

            if(value === '近一周'){
                if(parseInt(i.clock)-150 <= parseInt(strip.clock) && parseInt(i.clock)+150 >=parseInt(strip.clock)){
                    value = parseFloat(strip.value).toFixed(2);
                    bSin = true;
                }
            }else {
                if(parseInt(i.clock)-150 <= parseInt(strip.clock) && parseInt(i.clock)+150 >=parseInt(strip.clock)){
                    value = parseFloat(strip.value).toFixed(2);
                    bSin = true;
                }
            }
            

        })

        if(!bSin){
            value = '-';
        }
        return value;

    })
}

let getMultiChartSeriesData = function(options,item,result,value,dataType) {
    let arr1 = [];
    let arr2 = [];
    let iNow = 1;
    let turn = 0;
    let temp = null;

    temp = options[result.index].data[dataType][result.turn][0].items.value.filter((i,index)=>{
        return index;
    }).map((j)=>j);
    if(value === '近一天'){
        temp = options[result.index].data[dataType][result.turn][0].items.value.filter((i,index)=>{
            return index%10 === 0;
        }).map((j)=>j);
    }
    if(value === '近一周'){
        temp = options[result.index].data[dataType][result.turn][0].items.value.filter((i,index)=>{
            return index%140 === 0;
        }).map((j)=>j);
    }

    read(iNow,turn,temp,item,arr1,value,dataType);

    write(iNow,turn,temp,item,arr2,value,dataType);

    let arr=[];
    arr.push(arr1)
    arr.push(arr2)
    return arr;
}

let getChartYaxisData = function(options,item,value,dataType,model) {
    if(!options[0].data) return;
    let result = getMaxLengthAxisIndex(options,dataType,model);

    if(model === 'single') {
        return getChartSeriesData(options,item,result,value,dataType);
    }else {
        return getMultiChartSeriesData(options,item,result,value,dataType)
    }
    
}

let getChartOptionSeries = function(options,value,dataType,model) {
    if(!options[0].title)return;

    return options.map((item)=>{
    	return {
            name:item.title.split('_')[0],
            type:'line',
            smooth:true,
            symbolSize: 8,
            showSymbol:false,
            data:getChartYaxisData(options,item,value,dataType,model)
        }
    })
}

let getMultiChartOptionSeries = function(options,value,dataType,model) {
    if(!options[0].title)return;

    let temp = [];
    options.map((item)=>{
        temp.push({
            name:dataType === 'netData' ? item.title.split('_')[0]+'-in' : item.title.split('_')[0]+'-write',
            type:'line',
            smooth:true,
            symbolSize: 8,
            showSymbol:false,
            data:getChartYaxisData(options,item,value,dataType,model)[0]
        })
        temp.push({
            name:dataType === 'netData' ? item.title.split('_')[0]+'-out' : item.title.split('_')[0]+'-read',
            type:'line',
            smooth:true,
            symbolSize: 8,
            showSymbol:false,
            data:getChartYaxisData(options,item,value,dataType,model)[1]
        })
    })

    return temp;
}

let getChartXaxisData = function(options,value,dataType,model) {
    if(!options[0].data) return;
    let result = getMaxLengthAxisIndex(options,dataType,model);

    if(value === '近一小时'){
        return options[result.index].data[dataType][0].items.value.map((i)=>{
            return getLocalTime(i.clock).split(' ')[1];
        });
    }else if(value === '近一天') {
        let length = options[result.index].data[dataType][0].items.value.length;
        return options[result.index].data[dataType][0].items.value.map((i)=>{
            if(i.clock <= options[result.index].data[dataType][0].items.value[length-1].clock - 3600*parseInt(getLocalTime(options[result.index].data[dataType][0].items.value[length-1].clock).split(' ')[1].split(':')[0])){
                return getLocalTime(i.clock).split(' ')[0].split('-')[1]+'-'+getLocalTime(i.clock).split(' ')[0].split('-')[2]+' '+getLocalTime(i.clock).split(' ')[1].split(':')[0]+':'+getLocalTime(i.clock).split(' ')[1].split(':')[1];
            }else {
                return getLocalTime(i.clock).split(' ')[1];
            }
            
        }).filter((i,n)=>{
            return n%5 === 0;
        });
    }else if(value === '近一周') {
        return options[result.index].data[dataType][0].items.value.map((item)=>{
            return getLocalTime(item.clock).split(' ')[0].split('-')[1]+'-'+getLocalTime(item.clock).split(' ')[0].split('-')[2]+' '+getLocalTime(item.clock).split(' ')[1].split(':')[0]+':'+getLocalTime(item.clock).split(' ')[1].split(':')[1];
        }).filter((i,n)=>{
            return n%60 === 0;
        });
    }
}

let getMultiChartXaxisData = function(options,value,dataType,model) {
    if(!options[0].data) return;
    let result = getMaxLengthAxisIndex(options,dataType,model);

    if(value === '近一小时') {
        let temp = options[result.index].data[dataType][result.turn][0].items.value.map((i)=>{
            return getLocalTime(i.clock).split(' ')[1];
        })

        temp.splice(options[result.index].data[dataType][result.turn][0].items.value.length-1,1);

        return temp

    }else if(value === '近一天') {
        let length = options[result.index].data[dataType][result.turn][0].items.value.length;

        return options[result.index].data[dataType][result.turn][0].items.value.map((item)=>{
            if(item.clock <= options[result.index].data[dataType][result.turn][0].items.value[length-1].clock - 3600*parseInt(getLocalTime(options[result.index].data[dataType][result.turn][0].items.value[length-1].clock).split(' ')[1].split(':')[0])){
                return getLocalTime(item.clock).split(' ')[0].split('-')[1]+'-'+getLocalTime(item.clock).split(' ')[0].split('-')[2]+' '+getLocalTime(item.clock).split(' ')[1].split(':')[0]+':'+getLocalTime(item.clock).split(' ')[1].split(':')[1];
            }else {
                return getLocalTime(item.clock).split(' ')[1];
            }
        }).filter((i,n)=>{
            return n%10 === 0;
        });

    }else if(value === '近一周') {
        return options[result.index].data[dataType][result.turn][0].items.value.filter((item,index)=>{
            return index%140===0;
        }).map((i)=>{
            return getLocalTime(i.clock).split(' ')[0].split('-')[1]+'-'+getLocalTime(i.clock).split(' ')[0].split('-')[2]+' '+getLocalTime(i.clock).split(' ')[1].split(':')[0]+':'+getLocalTime(i.clock).split(' ')[1].split(':')[1];
        });
    }
}

let getChartOptions = function(chartType,name,options,value,dataType,model) {
    if (chartType === 'line') {
        return {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            color:['rgba(71,134,255,0.7)','rgba(247,93,88,0.7)','rgba(254,208,51,0.7)','rgba(38,192,160,0.7)','rgba(254,208,51,0.7)'],
            legend: {
                show:false,
                top:35,
                itemWidth:10,
                itemHeight:5,
                left:'center',
                icon:'roundRect',
                textStyle:{
                    color:'#616262',
                },
                data:options.length?options.map((item)=>{
                    return item.title
                }):[]
            },
            grid:{
                left:model==='single'?55:66,
                bottom:40
            },
            xAxis: {
                type:'category',
                boundaryGap : false,
                data: model==='single' ? getChartXaxisData(options,value,dataType,model) :getMultiChartXaxisData(options,value,dataType,model),
                axisLabel: {
                   show: true,
                   textStyle: {
                       color: '#767676'
                   },

                },
                axisTick: {
                    show:false,
                },
                axisLine:{
                   lineStyle:{
                       color: '#acb5c3',
                       opacity:0.8,
                   }
                },
                splitLine:{
                    lineStyle:{
                        color:'#d4d9e0',
                        type:'dashed'
                    }
                },
                nameTextStyle:{
                    color:'#354052',
                },
            },
            yAxis: {
                type:'value',
                name:name,
                nameGap:30,
                axisLabel: {
                   show: true,
                   textStyle: {
                       color: '#767676',
                   },
                },
                axisTick: {
                    show:false,
                },
                axisLine:{
                   lineStyle:{
                       color: '#acb5c3',
                       opacity:0.8,
                   },
                },
                splitLine:{
                    lineStyle:{
                        color:'#acb5c3',
                        opacity:0.1,
                    }
                },
                nameTextStyle:{
                    color:'#354052',
                    fontSize:13,
                },
                minInterval:0,
            },
            cursor:'default',
            series: model==='single' ? getChartOptionSeries(options,value,dataType,model) : getMultiChartOptionSeries(options,value,dataType,model)
        }
    }
}
export default {
	getChartOptions
}