let getLocalTime = function(nS) {
    let date = new Date(nS*1000),
        Y = date.getFullYear() + '-',
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
        D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ',
        h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':',
        m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':',
        s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;  
}

let read = function(iNow,turn,temp,item,arr1,dataType){
    let bSin = false,
    value_ = '',
    num = turn,
    dataTemp = item['data'][0].items.value;
	for(let i = turn;i<temp.length*iNow/10;i++){
	    num++;
	    for(let j = 0; j < dataTemp.length;j++){
	        if(parseInt(temp[i].clock)-60 <= parseInt(dataTemp[j].clock) && parseInt(temp[i].clock)+60 >=parseInt(dataTemp[j].clock)){
	            if(dataTemp[j].value_avg){
	               value_ = parseFloat(dataTemp[j].value_avg/1000/1000).toFixed(2);
	            }else{
	               value_ = parseFloat(dataTemp[j].value/1000/1000).toFixed(2); 
	            }
	            bSin = true;
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
	    setTimeout(read(iNow,turn,temp,item,arr1,dataType),0);
	}
}

let write = function(iNow,turn,temp,item,arr2,dataType) {
	let bSin = false,
    value_ = '',
    num = turn,
    dataTemp = item['data'][1].items.value;

	for(let i = turn;i<temp.length*iNow/10;i++){
	    num++;
	    for(let j = 0; j < dataTemp.length;j++){
	        if(parseInt(temp[i].clock)-60 <= parseInt(dataTemp[j].clock) && parseInt(temp[i].clock)+60 >=parseInt(dataTemp[j].clock)){
	            if(dataTemp[j].value_avg){
	               value_ = parseFloat(dataTemp[j].value_avg/1000/1000).toFixed(2);
	            }else{
	               value_ = parseFloat(dataTemp[j].value/1000/1000).toFixed(2); 
	            }
	            bSin = true;
	        }
	    }

	    if(!bSin){
	        value_ = '-';
	    }
	    arr2.push(value_);      
	}

	if(arr2.length < temp.length){
	    iNow++;
	    turn = num;
	    setTimeout(write(iNow,turn,temp,item,arr2,dataType),0)
	}
}

let computeLength = function(options,dataType,instance) {
	let turn = 0,
		length = 0,
		length1,
		length2;
	if((options.length === 2 && dataType !== 'netData') || instance === 'instance'){
		length1 = options[0][0].items.value.length;
		length2 = options[1][0].items.value.length;
	}else{
		length1 = options[0]['data'][0].items.value.length;
		length2 = options[0]['data'][1].items.value.length;
	}

	if(length1>=length2){
	    turn = 0;
	    length = length1;
	}else {
	    turn = 1;
	    length = length2;
	}

	return {
		turn,
		length
	}
}

let getMultiChartSeriesData = function(options,item,dataType,instance) {
	let arr1 = [],
    	arr2 = [],
    	iNow = 1,
    	turn = 0,
    	temp = null,
    	result = computeLength(options,dataType,instance).turn,
    	length = computeLength(options,dataType,instance).length,
    	dateTime;

    if((options.length === 2 && dataType !== 'netData') || instance === 'instance'){
    	if(!options[0][0].items.value.length || !options[1][0].items.value.length || length === 0) return;
    	dateTime = parseInt(options[result][0].items.value[length-1].clock)-parseInt(options[result][0].items.value[0].clock);
    	if(dateTime < 3600*24*0.9){
    		arr1 = options[0][0].items.value.map((item)=>{
    		    if(item.value_avg){
    		        return parseFloat(item.value_avg).toFixed(2);
    		    }
    		    return parseFloat(item.value).toFixed(2)
    		})
    		if(dataType === 'netData') {
    			arr1 = options[0][0].items.value.map((item)=>{
    			    if(item.value_avg){
    			        return parseFloat(item.value_avg/1000/1000);
    			    }
    			    return parseFloat(item.value/1000/1000).toFixed(2)
    			})
    		}
    		arr2 = options[1][0].items.value.map((item)=>{
    		    if(item.value_avg){
    		        return parseFloat(item.value_avg);
    		    }
    		    return parseFloat(item.value).toFixed(2)
    		})
    		if(dataType === 'netData') {
    			arr2 = options[1][0].items.value.map((item)=>{
    			    if(item.value_avg){
    			        return parseFloat(item.value_avg/1000/1000).toFixed(2);
    			    }
    			    return parseFloat(item.value/1000/1000).toFixed(2)
    			})
    		}
    	}else {
    		arr1 = options[0][0].items.value.filter((item,index)=>{
    		    return index%50 === 0;
    		}).map((item)=>{
    		    return item.value
    		})
    		arr2 = options[1][0].items.value.filter((item,index)=>{
    		    return index%50 === 0;
    		}).map((item)=>{
    		    return item.value
    		})
    	}

    	let arr=[];
    	arr.push(arr1)
    	arr.push(arr2)

    	return arr;

    }else{
    	dateTime = parseInt(options[0]['data'][result].items.value[length-1].clock)-parseInt(options[0]['data'][turn].items.value[0].clock);
    }

    if(dateTime < 3600*24*0.9){
    	temp = options[0].data[result].items.value.map((j)=>j);
    }else {
    	temp = options[0].data[result].items.value.filter((i,index)=>{
    	   return index%50 === 0
    	}).map((j)=>j);
    }
	read(iNow,turn,temp,item,arr1,dataType);

	write(iNow,turn,temp,item,arr2,dataType);

	let arr=[];
	arr.push(arr1)
	arr.push(arr2)

	return arr;
}

let getChartYaxisData = function(options,item,dataType,model,instance) {
	if(!options)return;
	if(model === 'single') {
		let temp = [];
		temp = options[0].items.value.map((i)=>{
		    if(i.value_avg){
		        return parseFloat(i.value_avg).toFixed(2);
		    }
		    return parseFloat(i.value).toFixed(2)
		})

		return temp;
	}else {
		return getMultiChartSeriesData(options,item,dataType,instance)
	}
}

let getChartOptionSeries = function(options,dataType,model,hostName,instance) {
	if(!options)return;

    return options.map((item)=>{
    	return {
            name:hostName,
            type:'line',
            smooth:true,
            symbolSize: 8,
            showSymbol:false,
            data:getChartYaxisData(options,item,dataType,model,instance)
        }
    })
}

let getMultiChartOptionSeries = function(options,dataType,model,hostName,instance) {
    let temp = [];
    if((options.length === 2 && dataType !== 'netData') || instance === 'instance'){
    	if(!options[0][0].items.value.length || !options[1][0].items.value.length) return;
    	temp.push({
    	    name:dataType === 'netData'&& options[0].key ? options[0].key+'-in' : dataType === 'netData' ?hostName+'-in':hostName+'-write',
    	    type:'line',
    	    smooth:true,
    	    symbolSize: 8,
    	    showSymbol:false,
    	    data:getChartYaxisData(options,options[0],dataType,model,instance)[0]
    	})
    	temp.push({
    	    name:dataType === 'netData'&& options[1].key? options[1].key+'-out' : dataType === 'netData'?hostName+'-out':hostName+'-read',
    	    type:'line',
    	    smooth:true,
    	    symbolSize: 8,
    	    showSymbol:false,
    	    data:getChartYaxisData(options,options[1],dataType,model,instance)[1]
    	})
    }else {
    	options.map((item)=>{
    	    temp.push({
    	        name:dataType === 'netData' ? item.key+'-in' : hostName+'-write',
    	        type:'line',
    	        smooth:true,
    	        symbolSize: 8,
    	        showSymbol:false,
    	        data:getChartYaxisData(options,item,dataType,model,instance)[0]
    	    })
    	    temp.push({
    	        name:dataType === 'netData' ? item.key+'-out' : hostName+'-read',
    	        type:'line',
    	        smooth:true,
    	        symbolSize: 8,
    	        showSymbol:false,
    	        data:getChartYaxisData(options,item,dataType,model,instance)[1]
    	    })
    	})
    }

    return temp;
}

let getChartXaxisData = function(options) {
	if(!options)return;
	let length = options[0].items.value.length;
	if(!length)return;
	let oDate = new Date();

	if(parseInt(options[0].items.value[length-1].clock)-parseInt(options[0].items.value[0].clock) > 3600*24*0.9 || options[0].items.value[length-1].clock < oDate.getTime()/1000 -3600*24*1){
	   	return options[0].items.value.map((item)=>{
	        return (getLocalTime(parseInt(item.clock)).split('-')[1]+'-'+getLocalTime(parseInt(item.clock)).split('-')[2]);
	    })
	}else {
	    return options[0].items.value.map((item)=>{
	        return getLocalTime(parseInt(item.clock)).split(' ')[1];
	    }) 
	}
}


let getMultiChartXaxisData = function(options,dataType,instance) {
	if(!options)return;
	
	let oDate = new Date(),
		turn = computeLength(options,dataType,instance).turn,
		length = computeLength(options,dataType,instance).length,
		dateTime;
	if((options.length === 2 && dataType !== 'netData') || instance === 'instance'){
		if(!options[0][0].items.value.length || !options[1][0].items.value.length || length === 0) return;
		dateTime = parseInt(options[turn][0].items.value[length-1].clock)-parseInt(options[turn][0].items.value[0].clock);

		if(dateTime >= 3600*24*0.9 && dateTime < 3600*24*1.5 || options[turn][0].items.value[length-1].clock < oDate.getTime()/1000 -3600*24*1){
		    return options[turn][0].items.value.filter((item,index)=>{
		        return index%50 === 0;
		    }).map((item)=>{
		        return (getLocalTime(parseInt(item.clock)).split('-')[1]+'-'+getLocalTime(parseInt(item.clock)).split('-')[2]);
		    })
		}else if(dateTime >= 3600*24*1.5){
		    return options[turn][0].items.value.filter((item,index)=>{
		        return index%50 === 0;
		    }).map((item)=>{
		        return (getLocalTime(parseInt(item.clock)).split('-')[1]+'-'+getLocalTime(parseInt(item.clock)).split('-')[2]);
		    })
		}else {
		    return options[turn][0].items.value.map((item)=>{
		        return getLocalTime(parseInt(item.clock)).split(' ')[1];
		    }) 
		}
	}else{
		dateTime = parseInt(options[0]['data'][turn].items.value[length-1].clock)-parseInt(options[0]['data'][turn].items.value[0].clock);

		if(dateTime >= 3600*24*0.9 && dateTime < 3600*24*1.5 || options[0]['data'][turn].items.value[length-1].clock < oDate.getTime()/1000 -3600*24*1){
		    return options[0]['data'][turn].items.value.map((item)=>{
		        if(dateTime > 3600*24*0.9 && dateTime <= 3600*24*1){
		            return getLocalTime(parseInt(item.clock)).split(' ')[1];
		        }
		        return (getLocalTime(parseInt(item.clock)).split('-')[1]+'-'+getLocalTime(parseInt(item.clock)).split('-')[2]);
		    }).filter((item,index)=>{
		        return index%50 ===0;
		    })
		}else if(dateTime >= 3600*24*1.5){
		    return options[0]['data'][turn].items.value.filter((item,index)=>{
		        return index%50 === 0;
		    }).map((item)=>{
		        return (getLocalTime(parseInt(item.clock)).split('-')[1]+'-'+getLocalTime(parseInt(item.clock)).split('-')[2]);
		    })
		}else {
		    return options[0]['data'][turn].items.value.map((item)=>{
		        return getLocalTime(parseInt(item.clock)).split(' ')[1];
		    })
		}
	}
}

let getChartOptions = function(chartType,name,options,dataType,model,hostName,instance) {
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
			},
			grid:{
			    left:80,
                top:120
			},
			xAxis: {
			    type:'category',
			    boundaryGap : false,
			    data: model==='single' ? getChartXaxisData(options) :getMultiChartXaxisData(options,dataType,instance),
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
			series: model==='single' ? getChartOptionSeries(options,dataType,model,hostName,instance) : getMultiChartOptionSeries(options,dataType,model,hostName,instance)
		}
	}
}

export default {
	getChartOptions
}
