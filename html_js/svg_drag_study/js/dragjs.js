$(function(){
    var createSvgElement = function (tagName, id) {
        var svgElement = document.createElementNS("http://www.w3.org/2000/svg", tagName);
        if (id !== undefined) svgElement.id = id;
        return svgElement;
    };
                
    //$("#srcImg").bind("dragstart", function(e){
    //	e.originalEvent.dataTransfer.setData("Text", e.target.id);
    //});
    
    //$("#srcSvg").focus(function(){
    //	alert("focused");
    //});
    
    //$("#srcSvg").draggable();
    //$("#srcSvg").bind("mousedown", function(e){
    //	$(e.target).focus();
    //});
    
    $("#srcContainer").bind("dragstart", function(e){		
        e.originalEvent.dataTransfer.setData("Text", e.target.id ? e.target.id : e.target.parentElement.id);
        
        var crt = this.cloneNode(true);
        crt.style.display = "none"; /* or visibility: hidden, or any of the above */
        e.originalEvent.target.appendChild(crt);
        e.originalEvent.dataTransfer.setDragImage(crt, 0, 0);
    });
    
    $("#tarContainer").bind("dragenter", function(e){
        e.originalEvent.preventDefault();
        var crt = this.cloneNode(true);
        crt.style.display = "none"; /* or visibility: hidden, or any of the above */
        e.originalEvent.target.appendChild(crt);
        e.originalEvent.dataTransfer.setDragImage(crt, 0, 0);
    });
    
    $("#tarContainer").bind("dragover", function(e){
        e.originalEvent.preventDefault();
    });
    
    $("#tarContainer").bind("drop", function(e){
        e.originalEvent.preventDefault();
        
        var data = e.originalEvent.dataTransfer.getData("Text");		
        if(data == "srcSvg" || data=="srcImg" || data=="srcP"){
            e.originalEvent.target.appendChild(document.getElementById(data));
            return;
        }
        
        var svgDom;
        var curDom = e.originalEvent.target;
        var children = curDom.childNodes;
        for(var i=0,len=children.length;i<len;i++){
            if(children[i].nodeType == 1 && children[i].nodeName=="svg"){
                svgDom = children[i];
                break;
            }
        }
        
        if(!svgDom){
            svgDom = createSvgElement("svg", "srcSvg1");
            e.originalEvent.target.appendChild(svgDom);
        }
        
        svgDom.appendChild(document.getElementById(data));	
        
    });
})