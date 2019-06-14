--https://github.com/TheWebAuthor/LinkedIn-Bulk-Connect
--https://github.com/zengfr/LinkedIn-Bulk-Connect-BatchAddFriend
--https://gitee.com/zengfr/LinkedIn-Bulk-Connect-BatchAddFriend
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
 function loop_clicks(sleepMillisecond) {
	var count = $('button.search-result__actions--primary').not('button.message-anywhere-button').length;
	if (count == 0) {
		next();
	}
	else {
		var totlalCount=count;
		$('button.search-result__actions--primary').not('button.message-anywhere-button').each(async function(index,element) {
			var name=$(this).attr('aria-label');
            if(name.indexOf('加')>=0){
            	var s=index*randomNum(sleepMillisecond,sleepMillisecond*2);
				await sleep(s);
				log(" count:"+count+" name:"+name+" index:"+index+" sleep:"+s);
				click_connect($(this));
            }
			--count;
			if (count<=0){
			next();
			}
		});
	}
}


function click_connect($obj) {
	$obj.click();
	$('button.ml1').click();
}

var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();
var sleepMillisecond=11*1000;
function next() {
    log('next');
	$('button.artdeco-pagination__button--next').click();
	delay(function(){ loop_clicks(sleepMillisecond); }, sleepMillisecond*3);
}
function log(str){
	console.info(new Date().toLocaleTimeString()+" "+str);
}
loop_clicks(sleepMillisecond);