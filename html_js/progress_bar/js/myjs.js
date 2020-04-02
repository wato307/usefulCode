$(function(){
    var time = 0;
    var eachProg = function(){		
        var strWidthWidthPx = $(".progress").css("width");
        var strWidth = strWidthWidthPx.slice(0, strWidthWidthPx.indexOf("px"));
        if((time+2)*10 > Number(strWidth)){
            time = 0;
        }
        var t = ++time;
        $("#prog_1").css("left", t * 10 );
        $("#prog_2").css("left", (t+1) * 10 );
        $("#prog_3").css("left", (t+2) * 10 );
    }
    
    var timeout = setInterval(eachProg, 100);
})