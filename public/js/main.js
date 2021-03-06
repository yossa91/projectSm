/*야시장 운영시간 section 도트클릭>div 체인지 */
var time_list = document.querySelectorAll('.t_box');
var time_btn = document.querySelectorAll('.t_list>a');

time_list[0].style.display = 'block';

time_btn.forEach(function(el,idx){
  el.onclick = function(){
    for(var i = 0; i<time_btn.length; i++){
      time_btn[i].classList.remove('t_l_on');
      time_list[i].style.display = 'none';
     }
     console.log(el ,idx);
     time_btn[idx].classList.add('t_l_on');
     time_list[idx].style.display = 'block';
    }
  });

  /*행사/이벤트,오시는길 (마지막section) 탭기능 구현*/
  var ex_btn = document.querySelectorAll('.ex_menu>a');
  var ex_list = document.querySelectorAll('.ex_content');
  
  ex_list[0].style.display = 'block';
  ex_list[1].style.display = 'none';


  ex_btn[0].addEventListener('click',function(){
    ex_btn[0].classList.add('ex_on');
    ex_btn[1].classList.remove('ex_on');
    ex_list[0].style.display = 'block';
    ex_list[1].style.display = 'none';
  });
  ex_btn[1].addEventListener('click',function(){
    ex_btn[1].classList.add('ex_on');
    ex_btn[0].classList.remove('ex_on');
    ex_list[1].style.display = 'block';
    ex_list[0].style.display = 'none';
  });

  /*주변관광지*/
  var tourList = document.querySelectorAll('.tourimg>img');
  var up =  document.querySelector('.t_i_up');
  var dw =  document.querySelector('.t_i_dw');
  var tourBox = document.querySelectorAll('.tourtitle');
  var move = 0;
  tourBox[0].style.display = 'block';

  up.addEventListener('click',function(){
    for(var i = 0; i< tourList.length; i++){
      tourList[i].style.display = 'none';
      tourBox[i].style.display = 'none';
    }
    if(move == 0){
      tourList[0].style.display = 'block';
      tourBox[0].style.display = 'block';
      move = 0;
    }else{
      move--;
      tourList[move].style.display = 'block';
      tourBox[move].style.display = 'block';
    }
  });

  dw.addEventListener('click',function(){
    for(var i = 0; i< tourList.length; i++){
      tourList[i].style.display = 'none';
      tourBox[i].style.display = 'none';
    }
    if(move == tourList.length-1){
      tourList[tourList.length-1].style.display = 'block';
      tourBox[tourList.length-1].style.display = 'block';
      move = tourList.length-1;
    }else{
      move++;
      tourList[move].style.display = 'block';
      tourBox[move].style.display = 'block';
    }
  });

  /*메인 스크롤*/
  document.addEventListener('scroll', function() {
    var mainHei = document.querySelector('.fullsc').clientHeight;
    var scrollHei = document.documentElement.scrollTop;
    var moveHei = window.pageYOffset + document.querySelector('.sec').getBoundingClientRect().top;
    if(scrollHei>150){
      document.querySelector('.fullsc').style.height = 0;
    }else if(scrollHei==0){
      document.querySelector('.fullsc').style.height = '100vh';
    }
  });
