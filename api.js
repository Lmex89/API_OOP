// Custom Function to perform get Random index
// Custom Function to permute index of questions
// Global variable to identify True : True/False questions
// False: Multiplue choice
let flag = -1;

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function permute(nums) {
    let result = [];
    if (nums.length === 0) return [];
    if (nums.length === 1) return [nums];
    for (let i = 0; i < nums.length; i++) {
        const currentNum = nums[i];
        const remainingNums = nums.slice(0, i).concat(nums.slice(i + 1));
        const remainingNumsPermuted = permute(remainingNums);
        for (let j = 0; j < remainingNumsPermuted.length; j++) {
            const permutedArray = [currentNum].concat(remainingNumsPermuted[j]);
            result.push(permutedArray);
        }
    }
    return result;
}

// Custom fucntion to get response from API
// Get Categories function
function getCategories() {
    const url = 'https://opentdb.com/api_category.php';
    fetch(url)
        .then(response => response.json())
        .then(data => printCategories(data.trivia_categories));
}

function getQuestions() {
    //https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=boolean
    const totalQuestions = document.getElementById('total-questions').value;
    const category = document.getElementById('select-category').value;
    const dificulty = document.getElementById('select-Dificulty').value;
    const type = document.getElementById('select-type').value;

    fetch(
            `https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&difficulty=${dificulty}&type=${type}`
        )
        .then(response => response.json())
        .then(data => printData(data));
}

function printData(data) {
    let container = document.getElementById('questions-container');
    let bnt = document.getElementById('score');

    // esta parte es super importante para que se refresque,
    // es como la suma = 0; los elementos que se quedaron arriba
    // se quedan al principio,
    container.innerHTML = '';
    // Aqui encontramos si el response de la API esta vacia.
    if (!Object.keys(data.results).length) {
        let DivNoQuestions = document.createElement('div');
        DivNoQuestions.innerHTML =
            '<h3> <p class="text-center">' +
            'No hay suficientes preguntas de la Categoria' +
            ' ' +
            '</p>' +
            '</h3>';
        container.appendChild(DivNoQuestions);
        return 0;
    }
    // Aqui comienza el despliegue de las preguntas
    if (data.results[0].type === 'boolean') {
        bnt.style.display = 'block';

        flag = true;
        data.results.forEach(element => {
            container.innerHTML += `<div class="col-md-6 mt-3">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            ${element.question}
                                        </div>
                                        <div class="card-body" id ="quesiton-box">
                                        <select class="form-question">
                                        <option value="select" >Selecciona una respuesta </option>; 
                                        <option value ="correct_answer" id="select-answer1">${element.correct_answer}</option>
                                        <option value="incorrect_answer"id="select-answer2">${element.incorrect_answers[0]}</option>;
                                        </select>
                                        </div>
                                    </div>
                                </div>`;
        });
    }
    // Aqui obtenemso los indeces de manera aleatoria
    // con las funciones geRnInteger
    // y las permutaciones de los index
    let index = [0, 1, 2];
    let rndom = getRndInteger(0, 5);
    let index_t = permute(index)[rndom];
    //console.log(index_t)

    if (data.results[0].type == 'multiple') {
        flag = false;
        bnt.style.display = 'block';

        data.results.forEach(element => {
            container.innerHTML += `<div class="col-md-6 mt-3">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            ${element.question}
                                        </div>
                                         <div class="card-body">
                                        <select class="form-question", id="question-box">
                                        <option value="select">Selecciona una respuesta </option>; 
                                        <option value="correct_answer">${element.correct_answer}</option>
                                        <option value="incorrect_answer">${element.incorrect_answers[index_t[0]]}</option>;
                                        <option value="incorrect_answer">${element.incorrect_answers[index_t[1]]}</option>;
                                        <option value="incorrect_answer">${element.incorrect_answers[index_t[2]]}</option>;
                                        </select>
                                        </div>
                                    </div>
                                </div>`;
        });
    }
}

function printCategories(categories) {
    let categoriesContainer = document.getElementById('select-category');
    let categ = [];
    categories.forEach(category => {
        categoriesContainer.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    });
}
getCategories();

function getScorebtn() {
    const totalQuestions = document.getElementById('total-questions').value;

    select_answers = {
        select: 0,
        correct_answer: 1,
        incorrect_answer: -1,
    };

    const container = document.querySelectorAll('.form-question');
    const resultbox = document.getElementById('results-box');
    let score = 0;
    container.forEach(elemnt => {
        score += select_answers[elemnt.value];
    });
    let TotalScore = score / totalQuestions * 100;
    let DivNoQuestions = document.createElement('div');
    DivNoQuestions.innerHTML =
        '<h3> <p class="text-center">' +
        'Tu Score es ' +
        TotalScore +
        ' ' +
        '</p>' +
        '</h3>';
    resultbox.innerHTML = '';
    resultbox.appendChild(DivNoQuestions);
    console.log(TotalScore);
}

let btn = document.getElementById('score');
if (btn.addEventListener) {
    btn.addEventListener('click', getScorebtn, false);
} else if (btn.attachEvent) {
    btn.attachEvent('onclick', getScorebtn);
}