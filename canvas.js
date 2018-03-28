var ctx=document.getElementById('canvas');
var context=ctx.getContext('2d');

var eraserUse=false;

listMouse(ctx);
viewWidth(ctx);

function viewWidth(canvas){
    windowSize();
    window.onresize=function(){ 
        windowSize();
    }
    function windowSize(){
        var pageWidth=document.documentElement.clientWidth;
        var pageHeight=document.documentElement.clientHeight;
        ctx.width=pageWidth;
        ctx.height=pageHeight;
    }
}
/***********************************/
black.onclick = function(){
    context.fillStyle = 'black';
    context.strokeStyle = 'black';
    black.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    red.classList.remove('active');
    greenyellow.classList.remove('active');
    yellow.classList.remove('active');
}
red.onclick = function(){
    context.fillStyle = 'red';
    context.strokeStyle = 'red';
    red.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
    greenyellow.classList.remove('active');
    yellow.classList.remove('active');
}
green.onclick = function(){
    context.fillStyle = 'green';
    context.strokeStyle = 'green';
    red.classList.remove('active');
    green.classList.add('active');
    blue.classList.remove('active');
    black.classList.remove('active');
    greenyellow.classList.remove('active');
    yellow.classList.remove('active');
}
blue.onclick = function(){
    context.fillStyle = 'blue';
    context.strokeStyle = 'blue';
    red.classList.remove('active');
    green.classList.remove('active');
    blue.classList.add('active');
    black.classList.remove('active');
    greenyellow.classList.remove('active');
    yellow.classList.remove('active');
}
yellow.onclick = function(){
    context.fillStyle = 'yellow';
    context.strokeStyle = 'yellow';
    red.classList.remove('active');
    green.classList.remove('active');
    yellow.classList.add('active');
    black.classList.remove('active');
    blue.classList.remove('active');
    greenyellow.classList.remove('active');
}
greenyellow.onclick = function(){
    context.fillStyle = 'greenyellow';
    context.strokeStyle = 'greenyellow';
    red.classList.remove('active');
    green.classList.remove('active');
    greenyellow.classList.add('active');
    black.classList.remove('active');
    blue.classList.remove('active');
    yellow.classList.remove('active');
}
/************************************/
thin.onclick = function(){
    context.lineWidth = 2;
}
thick.onclick = function(){
    context.lineWidth = 8;
}

/**************************/

/*************************************/ 


/*************************************/
  
function listMouse(canvas){
    var lastPoint={
        x: undefined,
        y: undefined
    }
    var using=false;
    if(document.body.ontouchstart !== undefined){
        canvas.ontouchstart=function(e){
            var x=e.touches[0].clientX;
            var y=e.touches[0].clientY;
            using=true;
            console.log(x,y);
            if(eraserUse){
                context.clearRect(x-5,y-5,10,10);
            }else{
                lastPoint={
                    "x":x,
                    "y":y
                }
            }
        }
        canvas.ontouchmove=function(e){
            var x=e.touches[0].clientX;
            var y=e.touches[0].clientY;
            if(!using){return}
            if(eraserUse){
                context.clearRect(x-5,y-5,10,10);
            }else{
                var newPoint={
                    "x":x,
                    "y":y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                drawCircle(newPoint.x, newPoint.y);
                lastPoint=newPoint;
            }
        }
        canvas.ontouchend=function(){
            using=false;
        }
    }else{
        canvas.onmousedown=function(e){ 
            var x=e.clientX;
            var y=e.clientY;
            using=true;
            console.log(x,y);
            if(eraserUse){
                context.clearRect(x-5,y-5,10,10); 
            }else{
                lastPoint={
                   'x': x,
                   'y': y
                }
            } 
        }
    
        canvas.onmousemove=function(e){
            var x=e.clientX;
            var y=e.clientY;
            if(!using){return}
            if(eraserUse){
                context.clearRect(x-5,y-5,10,10);
            }else{
                var newPoint={
                    'x': x,
                    'y': y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                drawCircle(newPoint.x, newPoint.y);
                lastPoint=newPoint;  
            }  
        } 
    
       canvas.onmouseup=function(e){
            using=false;
        }
    }
}


function drawLine(x1,y1,x2,y2){
    context.beginPath();
    // context.strokeStyle = 'black';
    context.moveTo(x1,y1);
    // context.lineWidth=lineWidth;
    context.lineTo(x2,y2);
    context.stroke(); 
    context.closePath(); 
}



function drawCircle(x,y){
    context.beginPath();
    if(context.lineWidth<=1){
        r=0.1;
    }else if(context.lineWidth<=2){
        r=0.8;
    }else{
        r=3.5;
    }
    // context.fillStyle='black';
    context.arc(x,y,r,0,Math.PI*2);
    context.fill();
}


eraser.onclick=function(){
    eraserUse=true;
}
brush.onclick=function(){
    eraserUse=false;
}
delete1.onclick=function(){
    context.clearRect(0, 0, ctx.width, ctx.height);
}
save1.onclick=function(){
    var url = ctx.toDataURL("image/png");
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = '我的画儿';
    a.target = '_blank';
    a.click();
}


  
