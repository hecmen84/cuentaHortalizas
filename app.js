const rabbit = document.getElementById('rabbit');
const soil_carrot = document.querySelector('.soil-carrot');
const soil_lettuce = document.querySelector('.soil-lettuce');
const soil_radish = document.querySelector('.soil-radish');
const answer_btn = document.getElementById('answer-btn');
let answer = document.getElementById('answer');
const progress = document.querySelector('.progress-done');
const question = document.querySelector('.question');
const wrong = document.querySelector('.wrong');
const correct = document.querySelector('.correct');
const start_btn = document.getElementById('start-btn');
const game_start = document.querySelector('.game-start');
const reload_game = document.getElementById('reload-game');
let id;

reload_game.addEventListener('click', () =>{
    location.reload();
})
let carrots = 0;
let lettuce = 0;
let radish = 0;
//start the game
start_btn.addEventListener('click', () =>{
    playAudio('heaven.mp3');
    localStorage.clear();
    localStorage.setItem('wrong', 0);
    localStorage.setItem('correct', 0);
    carrots = randomInteger(1,5)
    theGrid(carrots,'carrots.svg',soil_carrot);
    lettuce = randomInteger(1,5)
    theGrid(lettuce,'lettuce.png',soil_lettuce);
    radish = randomInteger(1,5)
    theGrid(radish,'radish2.png',soil_radish);
    setLocalStorage('question');
    id = setInterval(()=>{
    progressBar();
    game_start.classList.remove('animate__animated', 'animate__fadeInUp');
    game_start.classList.add('animate__animated', 'animate__fadeOutDown')
},1000);
})
let counter = 0;
let periodo = 0;
let ac = 0;

//function to make the progress bar grow till one minute
function progressBar(){
    if(counter === 60){
        endGame();
        clearInterval(id);
        localStorage.clear();
       
    }
    else{
    counter = counter + 1;    
    periodo = 200/60;
    ac = ac + periodo;
    progress.style.width = ac + 'px'
    progress.style.opacity = 1;
    }
}

//function to paint the html grid, receive till: the maximum number from 1 to 5
// vegetable: carrot, lettuce or radish. grid:html element where to insert the grid as appendChild 
function theGrid(till,vegetable, grid){
    for(let i = 0; i < till; i++){
    const li = document.createElement('li');
    const img = document.createElement('img');
    let url = vegetable;
    img.src = `${url}`
    li.appendChild(img);
    grid.appendChild(li);
    }
    
}
function cleanSoil(list){
    while (list.hasChildNodes()) {  
        list.removeChild(list.firstChild);
      }
}
function playAudio(audio){
    var audio = new Audio(audio);
    audio.play();
   
}

answer_btn.addEventListener('click', calculateAnswer);
//function to calculate the answer correct or not, 
function calculateAnswer(){
    const answer = document.getElementById('answer');
    const total = (carrots * 2) + lettuce + (radish * 2);
    
    if(+answer.value === total){
        playAudio('children.mp3');
        const confetti = document.getElementById('confetti');
        confetti.classList.add('showed');
        carrots = 0;
        lettuce = 0;
        radish = 0;
        Swal.fire({
            title: 'Correcto',
            icon: 'success',
            showClass: {
            popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setLocalStorage('question');
                setLocalStorage('correct');
                confetti.classList.remove('showed');
                confetti.classList.add('hidden');
                console.log('vamos al siguiente');

                cleanSoil(soil_carrot);
                cleanSoil(soil_lettuce);
                cleanSoil(soil_radish);
                
                answer.value = "";

                carrots = randomInteger(1,5)
                theGrid(carrots,'carrots.svg',soil_carrot);
                lettuce = randomInteger(1,5)
                theGrid(lettuce,'lettuce.png',soil_lettuce);
                radish = randomInteger(1,5)
                theGrid(radish,'radish2.png',soil_radish);
            }
        })
        
    }else{
        playAudio('error.mp3');
        Swal.fire({
            icon: 'error',
            title: 'Vuelve a intentar',
            text: 'Tu respuesta no es correcta!',
        })
        setLocalStorage('question');
        setLocalStorage('wrong');
        let answer = document.getElementById('answer');
        answer.value = "";
        cleanSoil(soil_carrot);
        cleanSoil(soil_lettuce);
        cleanSoil(soil_radish);
        answer = document.getElementById('answer');
        answer.value = "";
        carrots = randomInteger(1,5)
        theGrid(carrots,'carrots.svg',soil_carrot);
        lettuce = randomInteger(1,5)
        theGrid(lettuce,'lettuce.png',soil_lettuce);
        radish = randomInteger(1,5)
        theGrid(radish,'radish2.png',soil_radish);
    }

}
//generate a number between 1 and 5 to create the grid
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
setInterval(()=>{
    showRabbit();
},4000);
//function to show and hide the rabbit at bottom
function showRabbit(){
   let theClass = rabbit.classList.contains('hide');
   if(theClass){
        rabbit.classList.remove('hide')
        rabbit.classList.add('show');
   }
   else{
        rabbit.classList.remove('show')
        rabbit.classList.add('hide');
   }
}
//to clear points in local storage
function clearLocalStorage(item){
    if(localStorage.getItem('question') >10){
        localStorage.setItem('question', 0);
        localStorage.setItem('wrong', 0);
        localStorage.setItem('correct', 0);
        correct.innerText = localStorage.getItem(item);
        wrong.innerText = localStorage.getItem(item);
        question.innerText = localStorage.getItem(item);
    }
}
//to insert points in local storage
function setLocalStorage(item){
    
    let cp
    switch(item){
        case 'question':
        cp = localStorage.getItem(item);
        cp = + cp + 1;
        localStorage.setItem(item, cp);
        question.innerText = localStorage.getItem(item);
        break;
        case 'wrong':
        cp = localStorage.getItem(item);
        cp = + cp + 1;
        localStorage.setItem(item, cp);
        wrong.innerText = localStorage.getItem(item);
        break;
        case 'correct':
        cp = localStorage.getItem(item);
        cp = + cp + 1;
        localStorage.setItem(item, cp);
        correct.innerText = localStorage.getItem(item);
        break;
    } 
    endGame();

}
//to show points at the end of the game
function endGame(){
    if(localStorage.getItem('question') == 11 || counter === 60 ){
        const end_game_container = document.querySelector('.end-game-container');
        end_game_container.classList.remove('hidden');
        end_game_container.classList.add('showed');
        const wrongL = localStorage.getItem('wrong');
        const correctL = localStorage.getItem('correct');
        document.getElementById('correct-points').innerText = correctL;
        document.getElementById('wrong-points').innerText = wrongL;
        //localStorage.clear();
        correct.innerText = '';
        wrong.innerText = '';
        question.innerText = '';
    }
}

