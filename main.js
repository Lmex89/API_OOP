import Request from './classes/Request.js';
import UI from './classes/UI.js';

function getScorebtn(e) {
    e.preventDefault();
    const totalQuestions = document.getElementById('total-questions').value;
    console.log(totalQuestions);
    const container = document.querySelectorAll('.form-question');
    console.log(container);
    const resultbox = document.getElementById('results-box');
    let score = 0;
    select_answers = {
        true: 1,
        false: -1,
    };

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

const form = document.querySelector('#form-questions');
form.addEventListener('submit', event => {
    event.preventDefault();
    Request.getQuestions().then(response => response.json()).then(data => {
        data;
        if (!Object.keys(data.results).length) {
            UI.NoQuestions();
        } else if (data.results[0].type == 'multiple') {
            UI.printQuestions_multiple(data.results);
        } else if (data.results[0].type == 'boolean') {
            UI.printQuestions_boolean(data.results);
        }
    });
});

Request.getCategories()
    .then(response => response.json())
    .then(data => UI.printCategories(data.trivia_categories));