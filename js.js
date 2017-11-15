var para = document.getElementsByClassName('trans');
var progress = document.querySelector('#progressbar');
var slidDown = document.querySelector('.polosaHor');
var range = document.querySelector('#range');
var slider = document.querySelector('.polosaVert');
var main = document.querySelector('.slider');
var sun = document.querySelectorAll('.next');
var rocks = document.querySelector('.rocks1');
var mark = true;  // Маркер
var w = screen.width; 
var h = screen.height;
var offset = 30; //Сопротивление в параллаксе
var swipe = {}; // пустой объект для свайпа
main.onmousedown = mouseDown;
main.addEventListener('touchstart', main.onmousedown);
slider.onmousedown = nextDown;
slider.addEventListener('touchstart', nextDown);


// 	 		включение/отключени инфоиконки внизу 1 и 2 слайда
function nextDown (e){
		mark = true;
		slider.addEventListener('touchmove', nextMove);
		slider.addEventListener('touchend', nextUp);
		
		slider.onmouseup = nextUp;
		slider.onmousemove = nextMove; 
		
		function nextMove (e){
			
			if (mark == true){
			for(var i = 0; i<sun.length;i++){
				sun[i].style.display='none';
			};
		};
	};

	function nextUp(e){
			mark = false;
			sun[0].style.display = 'inherit';
			sun[1].style.display = 'inherit';
	}
}



// 					функция ползунка
document.querySelector('#range').oninput = function(event){
	
	
	var val = this.value;
	progress.value = this.value; 
	if (this.value > 70 && this.value <=100){
		slidDown.style.left = -2048 + 'px';
		range.onchange = function(event){
			progress.value = 100;
			this.value = 100;
		}
	}else if (this.value > 30 && this.value < 70){
		slidDown.style.left = -1024 + 'px';
		range.onchange = function(event){
			progress.value = 50;
			this.value = 50;
		}
	}else if(this.value > 0 && this.value <30) {
		slidDown.style.left = 0;
		range.onchange = function(event){
			progress.value = 0;
			this.value = 0;
		}
	}
};

var radio = document.getElementsByName('checc');
var label = document.getElementsByTagName('label');


// 					Радиокнопки

var fnRadio = function(){
	if(document.querySelector('#fs').checked){
		slider.style.transform = 'translate3d(0px,0px,0px)';
		swipe.currentY = 0;
	}else if (document.querySelector('#ss').checked){
		slider.style.transform = 'translate3d(0px,-768px,0px)';
		swipe.currentY = 768;
	}else if (document.querySelector('#ts').checked){
		swipe.currentY = 1536;
		slider.style.transform = 'translate3d(0px,-1536px,0px)';
	}

};

for (var i=0; i<radio.length; i++){
	radio[i].onchange=fnRadio;
};



// 				Перелистывание мышкой

swipe.slid = slider;
slider.style.transform = 'translate3d(0, 0 ,0)';
swipe.shiftY = 0;
swipe.currentY = 0;
function mouseDown(e){
	
	slider.addEventListener('touchend', mouseUp, false);
	slider.addEventListener('touchmove', mouseMove, false);
	
	main.onmouseup = mouseUp;
	main.onmousemove = mouseMove;
	
	swipe.downY = e.pageY || e.touches[0].pageY;
	

	function mouseMove(e){
		slider.style.transition = 'none';
		
		var target;
		var offsetXY = 0.5 - e.pageX/w || 0.5 - e.touches[0].pageX/w;
		var offsetYX = 0.5 - e.pageY/h || 0.5 - e.touches[0].pageY/w;
		
		for (var i=0; i<para.length; i++){
				para[i].style.transform = 'translate3d(0px,' + Math.round(offsetYX * offset) + "px, 0px)";
			}
		rocks.style.transform = 'translate3d(' + Math.round(offsetXY * offset) + "px," + Math.round(offsetYX * offset) + "px, 0px)";
		
	
		//if(!swipe.slid)return;

		var moveY = e.pageY - swipe.downY || e.touches[0].pageY;

		if(Math.abs(moveY)<3){
			return;
		};
		var coords = e.clientY || e.touches[0].pageY;

		swipe.shiftY = (swipe.currentY + ((swipe.downY - coords)*0.7))*(-1);
		slider.style.transform = 'translate3d(0,' + swipe.shiftY + 'px ,0)';
		
		
		
		range.onmouseover = calling;
	
		range.addEventListener('touchstart', calling);
			
		
		function calling (e){
		range.addEventListener('touchend', rangeOut);
		range.onmouseout = rangeOut;
			
			
			var cloneSwipe = swipe;
			swipe = {};


			function rangeOut(){

				swipe = cloneSwipe;
				swipe.currentY = 1536;
		
			};
		};
	};
	
	
	
	

	function mouseUp (e){
		slider.style.transition = '0.7s all';
		
		if (swipe.shiftY < 150 || swipe.shiftY > -150){
			slider.style.transform = 'translate3d(0, 0 ,0)';
			swipe.currentY = 0;
			
		};
		
		if(swipe.shiftY < -70){
			slider.style.transform = 'translate3d(0, -768px ,0)';
			swipe.currentY = 768;	
		};
		if (swipe.shiftY < -300 && swipe.currentY === 768 && swipe.shiftY >-650){
			slider.style.transform = 'translate3d(0, 0 ,0)';
			swipe.currentY = 0;	
		}
				 
		if (swipe.currentY === 768 && swipe.shiftY < -900){
			slider.style.transform = 'translate3d(0, -1536px ,0)';
			swipe.currentY = 1536;
			document.querySelector('#ts').setAttribute('checked', 'checked');	
		}
		if (swipe.shiftY < -1100 && swipe.currentY === 1536 && swipe.shiftY >-1450){
			slider.style.transform = 'translate3d(0, -768px ,0)';
			swipe.currentY = 768;
		}
		
		if(swipe.currentY === 0){
			document.querySelector('#fs').checked = true;
		}if(swipe.currentY === 768){
			document.querySelector('#ss').checked = true;	
		}if (swipe.currentY === 1536){
			document.querySelector('#ts').checked = true;
		};

		swip = {};
		main.onmousemove = null;
		mouseMove = null;
		
	};
};
















