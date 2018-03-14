let clock = function(serverTime){
	var canid=document.getElementById('canid');
	var ct=canid.getContext('2d');
	// var time = moment(new Date($.ajax({async:false}).getResponseHeader("Date")))
	var time = moment(serverTime);
	canid.width=600;
	canid.height=600;

	ct.beginPath();
	setInterval(function(){
		ct.clearRect(0,0,canid.width,canid.height);
		ct.beginPath();
		ct.arc(250,250,200,0*(Math.PI/180),360*(Math.PI/180));
		ct.strokeStyle='#aaa';
		ct.stroke();

		ct.beginPath();
		var tangleR=0;
		for(var i=0;i<360;i++){
			var x;var y;
			ct.beginPath();
			ct.moveTo(250,250);
			x=250+Math.cos(tangleR* Math.PI / 180 ) * (200); 
			y=250+Math.sin(tangleR* Math.PI / 180 ) * (200); 
			tangleR++;
			ct.strokeStyle='#ccc';
			ct.lineTo(x,y);
			ct.stroke();
		}
		ct.beginPath();
		ct.arc(250,250,190,0*(Math.PI/180),360*(Math.PI/180));
		ct.fillStyle='white';
		ct.fill();
		ct.beginPath();
		var tangle=0;
		for(var i=0;i<60;i++){
			var x;var y;
			ct.beginPath();
			ct.moveTo(250,250);
			x=250+Math.cos(tangle* Math.PI / 180 ) * (200); 
			y=250+Math.sin(tangle* Math.PI / 180 ) * (200); 
			tangle+=6;
			ct.strokeStyle='#aaa';
			
			ct.lineTo(x,y);
			ct.stroke();
		}
		ct.beginPath();
		ct.arc(250,250,180,0*(Math.PI/180),360*(Math.PI/180));
		ct.fillStyle='white';
		ct.fill();
		var tangleRR=-60;
		for(var i=0;i<12;i++){
			ct.beginPath();
			var x;var y;
			x=250+Math.cos(tangleRR* Math.PI / 180 ) * (200-50); 
			y=250+Math.sin(tangleRR* Math.PI / 180 ) * (200-50); 
			tangleRR+=30;
			// console.log(x,y,""+(i+1));
			ct.fillStyle='#aaa'
			ct.fillText(""+(i+1),x,y);
			ct.fill();
			ct.textAlign='center';
		}

		ct.beginPath();
		ct.arc(250,250,5,0*(Math.PI/180),360*(Math.PI/180));
		ct.stroke();

		ct.fill();
			var new_time=time.add(1, 'seconds');
			var h=new_time.hour();
			var m=new_time.minute();
			var s=new_time.second();
			var mj=m*6+(s/60)*6-90;
			var sj=s*6-90;
			var hj=h*30+(m/60)*30+(s/3600)*30-90;
			let x0=250+Math.cos(hj* Math.PI / 180 ) * (200-120); 
			let x1=250+Math.cos(mj* Math.PI / 180 ) * (200-100); 
			let x2=250+Math.cos(sj* Math.PI / 180 ) * (200-60); 
			let y0=250+Math.sin(hj* Math.PI / 180 ) * (200-120); 
			let y1=250+Math.sin(mj* Math.PI / 180 ) * (200-100); 
			let y2=250+Math.sin(sj* Math.PI / 180 ) * (200-60); 

		    ct.beginPath();
			ct.moveTo(250,250);
			ct.lineTo(x0,y0);
			ct.stroke();
			ct.beginPath();
			ct.moveTo(250,250);
			ct.lineTo(x1,y1);
			ct.stroke();

			ct.beginPath();
			ct.moveTo(250,250);
			ct.lineTo(x2,y2);
			ct.stroke();
		},1000);
}

export default {
    clock
}

import moment from 'moment';
import $ from 'jquery';