
  const bplay = document.querySelector(".bplay");
  const text = document.querySelector(".text");
  var read = text.innerHTML; 
  function click(){
      if(lang=='ar'){ responsiveVoice.speak(read,'Arabic Male');}else{
    responsiveVoice.speak(read,'US English Male');} 
     }


    bplay.onclick = click;

  const pasue = document.querySelector(".bpasue");
  var text1 = text.innerHTML; 
  function cpasue(){
    responsiveVoice.pause();
  }

  pasue.onclick = cpasue;
    
    
      const resume = document.querySelector(".bresume");
      var text1 = text.innerHTML; 
      function cresume(){
        responsiveVoice.resume();
          }
    
          resume.onclick = cresume;
        

