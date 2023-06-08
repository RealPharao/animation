window.addEventListener("load", startScreen);

let point;
let life;

const runningL = document.querySelector("#running_guy_containerL");
const runningR = document.querySelector("#running_guy_containerR");

const swimming = document.querySelector("#swimming_guy_retainer");

function startScreen() {
    console.log("startScreen");
    hideAll();
    document.querySelector("#start_screen").classList.remove("hide");
    document.querySelector("#play_button").addEventListener("click", playGame);
    document.querySelector("#info_button-1").addEventListener("mouseover", revealInfo);
}

function revealInfo() {
    console.log("revealInfo");
    document.querySelector("#info_screen").classList.remove("hide");
    document.querySelector("#info_button-1").addEventListener("mouseout", hideInfo);
}

function hideInfo() {
    console.log("hideInfo");
    document.querySelector("#info_screen").classList.add("hide");
}

function playGame(){
  console.log("playGame");
  hideAll();

  point = 0;
  life = 3;


  updatePoint();
  updateLives();


  runningL.classList.add("running_left");
  runningR.classList.add("running_right");
  swimming.firstElementChild.classList.add("diving");


  let rand = numberCheck1(2);

  runningL.classList.add("posL" + rand);

  runningR.classList.add("posR" + rand);

  rand = numberCheck1(5);

  swimming.classList.add("posS" + rand);


  runningL.addEventListener("mousedown", pointClick);
  runningR.addEventListener("mousedown", pointClick);
  swimming.addEventListener("mousedown", pointClick2);

  runningL.addEventListener("animationiteration", failClick);
  runningR.addEventListener("animationiteration", failClick);
  swimming.addEventListener("animationiteration", failClick2);
}

function pointClick(){
  console.log("pointClick");

  this.removeEventListener("mousedown", pointClick);

  addPoint();
  updatePoint();
  
  if (point >= 20){
    winGame();
  }

  this.classList.add("freeze");

  this.firstElementChild.classList.add("death1");

  this.addEventListener("animationend", successReset);
}

function pointClick2(){
  console.log("pointClick");

  this.removeEventListener("mousedown", pointClick2);

  addPoint();
  updatePoint();

  if (point >= 20){
    winGame();
  }

  this.classList.add("freeze");

  this.firstElementChild.firstElementChild.classList.add("death2");

  this.addEventListener("animationend", successReset2);
}

function successReset(){
  console.log("successReset")

  this.removeEventListener("animationend", successReset);

  if(this.classList.contains("running_left")){
    
  this.classList = "";

  this.firstElementChild.classList = "";

  let rand = numberCheck1(2);

  this.classList.add("posL" + rand);


  this.offsetHeight;
  this.classList.add("running_left");
  }
  else{
    
    this.classList = "";
  
    this.firstElementChild.classList = "";
  
    let rand = numberCheck1(2);
  
    this.classList.add("posR" + rand);
  
  
    this.offsetHeight;
    this.classList.add("running_right");
  }

  //lyt igen efter click og animationiteration
  this.addEventListener("mousedown", pointClick);

}

function successReset2(){
  console.log("successReset2")

  this.removeEventListener("animationend", successReset2);

  this.classList = "";

  this.firstElementChild.classList = "";
  this.firstElementChild.firstElementChild.classList = "";

  let rand = numberCheck1(5);
  this.classList.add("posS" + rand);

  this.offsetHeight;

  swimming.firstElementChild.classList.add("diving");

  this.addEventListener("mousedown", pointClick2);

}

function failClick(){
  console.log("failClick");

  this.removeEventListener("animationiteration", failClick);

  if (life <= 0){
    loseGame();
  }
  else{

    console.log("failResetelse");
    
    if(this.classList.contains("running_left")){
    
      this.classList = "";
    
      this.firstElementChild.classList = "";
    
      let rand = numberCheck1(2);
    
      this.classList.add("posL" + rand);
    
    
      this.offsetHeight;
      this.classList.add("running_left");

      subtractLives();
      updateLives();
    
      }
      else{
        
        this.classList = "";
      
        this.firstElementChild.classList = "";
      
        let rand = numberCheck1(2);
      
        this.classList.add("posR" + rand);
      
      
        this.offsetHeight;
        this.classList.add("running_right");

        subtractLives();
        updateLives();
      
      }
  
    //lyt igen efter click og animationiteration

    this.addEventListener("animationiteration", failClick);
  }
}

function failClick2(){
  console.log("failClick2");

  this.removeEventListener("animationiteration", failClick2);

  if (life <= 0){
    loseGame();
  }
  else{

    subtractLives();
    updateLives();

    this.classList = "";

    this.firstElementChild.classList = "";
    this.firstElementChild.firstElementChild.classList = "";
  
    let rand = numberCheck1(5);
    this.classList.add("posS" + rand);
  
    this.offsetHeight;
    
    swimming.firstElementChild.classList.add("diving");
  
    this.addEventListener("animationiteration", failClick2);
 
  }

}

function loseGame(){
  console.log("game over")

  stopAll();

  hideAll();
  document.querySelector("#loser_screen").classList.remove("hide");
  document.querySelector("#replay_button-2").addEventListener("click", playGame);
  document.querySelector("#info_button-2").addEventListener("mouseover", revealInfo2);
}

function revealInfo2() {
    console.log("revealInfo2");
    document.querySelector("#loser_info").classList.remove("hide");
    document.querySelector("#info_button-2").addEventListener("mouseout", hideInfo2);
}

function hideInfo2() {
    console.log("hideInfo2");
    document.querySelector("#loser_info").classList.add("hide");
}

function winGame(){
  console.log("Champ");

  stopAll();

  hideAll();

  document.querySelector("#winner_screen").classList.remove("hide");
  document.querySelector("#replay_button-1").addEventListener("click", playGame);
}




  function addPoint() {
    point = point + 1;

  }
  // udskriver point på siden
  function updatePoint() {
    document.querySelector("#points").textContent = point;
  }
  // trækker et liv fra
  function subtractLives() {
    life = life - 1;

  }
  // udskriver liv på siden
  function updateLives() {
    document.querySelector("#lives").textContent = life;
  }

function numberCheck1(rand){
    return Math.floor(Math.random() * rand) + 1;
}


function hideAll(){
    document.querySelector("#start_screen").classList.add("hide");
    document.querySelector("#loser_screen").classList.add("hide");
    document.querySelector("#winner_screen").classList.add("hide");
    document.querySelector("#info_screen").classList.add("hide");
    document.querySelector("#loser_info").classList.add("hide");

}

function stopAll() {
  runningL.classList = "";
  runningR.classList = "";
  swimming.classList = "";

  runningL.firstElementChild.classList = "";
  runningR.firstElementChild.classList = "";
  swimming.firstElementChild.classList = "";
  swimming.lastElementChild.classList = "";

  runningL.removeEventListener("mousedown", pointClick);
  runningR.removeEventListener("mousedown", pointClick);
  swimming.removeEventListener("mousedown", pointClick2);

  runningL.removeEventListener("animationiteration", failClick);
  runningR.removeEventListener("animationiteration", failClick);
  swimming.removeEventListener("animationiteration", failClick2);

  runningL.firstElementChild.removeEventListener("animationend", successReset);
  runningR.firstElementChild.removeEventListener("animationend", successReset);
  swimming.lastElementChild.removeEventListener("animationend", successReset2);
}
