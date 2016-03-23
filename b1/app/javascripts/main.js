

(function(){
var startbtn = document.getElementById('start');//开始游戏按钮
var resetbtn = document.getElementById('reset');//重置游戏按钮
var countspan = document.getElementById('count');//分数
var bunumspan = document.getElementById('bunum');//步数
//墙
var wall = 
{
	top:0,
	left:0,
	right:420,
	bottom:420
}
//豆子   x  y 表示第几行几列
var Bean =function(x,y)
{//
	this.x=x;
	this.y=y;
}
var beans = [];
var count = 0;
var bunum = 0;
//人
var person =
{
	x:0,
	y:0,
	move:function(keyCode){
		bunum +=1;
		var ismove= false;//是否移动了
		if (keyCode==37)//左 
		{
			if(person.x>0)
			{
				person.x-=1;//左移一位
				ismove=true;
			}
		}
		if (keyCode==38)//上
		{
			if(person.y>0)
			{
				person.y-=1;//上移一位
				ismove=true;
			}
		}
		if (keyCode==40)//右 
		{
			if(person.y<9)
			{
				person.y+=1;//右移一位
				ismove=true;
			}
		}
		if (keyCode==39)//下 
		{
			if(person.x<9)
			{
				person.x+=1;//下移一位
				ismove=true;
			}
		}
		if(ismove)
		{
			for(var i = 0;i<beans.length;i++)
			{
				if(person.x===beans[i].x&&person.y===beans[i].y)//吃了豆子
				{
					count+=1;
					beans.remove(i);
				}
			}
			render();
			if(beans.length==0)
			{
				alert("恭喜您胜利了");
			}
		}
	}
}
var init = function()
{	//分数置零
	count =0;
	//人物重新置位
	person.x=0;
	person.y=0;
	//步数置零
	bunum =0;
	beans=[];
	//初始化beans数组，生成10个不相同的坐标点
	for(var i = 0;beans.length<10;i++)
	{
		var randx = parseInt(Math.random()*10); 
		var randy = parseInt(Math.random()*10);
		if(!function (){
			var ishas = false;
			if(beans.length!=0)
			{
				for(var j = 0;j<beans.length;j++)
				{
					if((beans[j].x===randx&&beans[j].y===randy)||(person.x===randx&&person.y===randy))//不再人物地点
					{
						ishas = true;
						break;
					}
				}
			}
			return ishas;
		}())//如果beans里不存在坐标(randx,randy)就添加
		{
			beans.push(new Bean(randx,randy));
		}
	}//初始化beans结束
}
//画布初始化以及渲染函数
var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');
var render = function()
{
	//背景
	ctx.fillStyle='#2196F3';
	for (var i = 0;i<10;i++)
	{
		for(var j = 0;j<10;j++)
		{
			ctx.fillRect(j*42,i*42,40,40);
		}
	}
	//豆子
	ctx.fillStyle='green';
	if(beans.length!=0)
	{
		for (var i = 0;i<beans.length;i++)
		{
			ctx.fillRect(beans[i].x*42,beans[i].y*42,40,40);
		}
	}
	//人物
	ctx.fillStyle='#9C27B0';
	ctx.fillRect(person.x*42,person.y*42,40,40);

	 countspan.innerHTML=count;
	 bunumspan.innerHTML=bunum;
}



init();
render();
//监听上下左右按键
document.onkeydown= function(event)
{

	person.move(event.keyCode);
	event.stopPropagation(); //阻止事件冒泡
	event.preventDefault();	//阻止页面滚动
}
//监听开始游戏 重玩 按键


addEvent(startbtn,'click',function(event){
	event.stopPropagation(); //阻止事件冒泡
	init();
	render();
});
addEvent(resetbtn,'click',function(event){
	event.stopPropagation(); //阻止事件冒泡
	init();
	render();
});


//扩展下remove方法。  删除豆子需要用到。
Array.prototype.remove = function(from, to) {  
  var rest = this.slice((to || from) + 1 || this.length);  
  this.length = from < 0 ? this.length + from : from;  
  return this.push.apply(this, rest);  
};  
// 封装添加事件监听程序
function addEvent(ele,type,hander)
{
   // 执行代码  
   if(ele.addEventListener){
       ele.addEventListener(type,hander,false);
   }else if(ele.attachEvent)
   {
       ele.attachEvent("on"+type,hander);
   }else 
   {
       ele["on"+type]=hander;
   }
}












// ctx.strokeStyle('#333333');







}())



















