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

export default class UI {
    static printCategories(categories) {
        const container = document.getElementById('select-category');
        categories.forEach(category => {
            container.innerHTML += `<option value ="${category.id}" >${category.name}</option>`;
        });
    }
    static NoQuestions() {
        let DivNoQuestions = document.createElement('div');
        const container = document.getElementById('questions-container');
        DivNoQuestions.innerHTML =
            '<h3> <p class="text-center">' +
            'No hay suficientes preguntas de la Categoria' +
            ' ' +
            '</p>' +
            '</h3>';
        container.appendChild(DivNoQuestions);
    }
    static printQuestions_boolean(questions) {
        const container = document.getElementById('questions-container');
        container.innerHTML = '';
        let index = [1, 0];
        let rndom = getRndInteger(0, 2);
        let index_t = permute(index)[rndom];
        let contador = 0;

        questions.forEach(element => {
            let answers = {
                0: element.correct_answer,
                1: element.incorrect_answers[0],
            };
            contador += 1;

            container.innerHTML += `
                                    <div class="col-md-6 mt-3">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                ${element.question}
                                            </div>
                                            <div class="card-body" id ="question-box">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="${answers[index_t[0]] + contador}" id="${contador}+1" value  = "${answers[index_t[0]] === answers[0]}" required>
                                                    <label class="form-check-label" for="${contador}+1">
                                                        ${answers[index_t[0]]}
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                <input class="form-check-input" type="radio" name="${answers[index_t[0]] + contador}" id="${contador}" value ="${answers[index_t[1]] === answers[0]}" required >
                                                    <label class="form-check-label" for="${contador}">
                                                         ${answers[index_t[1]]}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
        });
        let btn = document.getElementById('score');

        if (btn.style.display == 'none') {
            btn.style.display = 'block';
        }
    }

    static printQuestions_multiple(questions) {
        const container = document.getElementById('questions-container');
        container.innerHTML = '';
        let index = [1, 0, 2, 3];
        let rndom = getRndInteger(0, 10);
        let index_t = permute(index)[rndom];
        let contador = 0;

        questions.forEach(element => {
            let answers = {
                0: element.correct_answer,
                1: element.incorrect_answers[0],
                2: element.incorrect_answers[1],
                3: element.incorrect_answers[2],
            };

            container.innerHTML += `<div class="col-md-6 mt-3">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            ${element.question}
                                        </div>
                                        <div class="card-body" id ="quesiton-box">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="${answers[index_t[0]] + contador}" id="${contador}" required>
                                                <label class="form-check-label" for="${contador}">
                                                    ${answers[index_t[0]]}
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="${answers[index_t[0]] + contador}" id="${contador}+10" requered>
                                                <label class="form-check-label" for="${contador}+10">
                                                    ${answers[index_t[1]]}
                                                </label>
                                            </div>

                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="${answers[index_t[0]] + contador}" id="${contador}+20" required >
                                                <label class="form-check-label" for="${contador}+20">
                                                     ${answers[index_t[2]]}
                                                </label>
                                            </div>

                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="${answers[index_t[0]] + contador}" id="$contador}+30" required>
                                                <label class="form-check-label" for="${contador}+30">
                                                     ${answers[index_t[3]]}
                                                </label>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>`;
            contador += 1;
        });

        let btn = document.getElementById('score');

        if (btn.style.display == 'none') {
            btn.style.display = 'block';
        }
    }
}