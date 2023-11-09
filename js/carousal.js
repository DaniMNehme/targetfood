function scroll(direction) {
    var container = document.getElementById('carousel');
    scrollCompleted = 0;
    var slideVar = setInterval(function(){
      if(direction == 1){
        container.scrollLeft += 10;
      } else {
        container.scrollLeft -= 10;
      }
      scrollCompleted += 10;
      if(scrollCompleted >= 100){
        window.clearInterval(slideVar);
      }
    }, 50);
  }