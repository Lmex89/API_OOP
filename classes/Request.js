export default class Request {
    static getCategories() {
        return fetch('https://opentdb.com/api_category.php');
    }
    static getQuestions() {
        const result = this.getFilters();
        return fetch(
            `https://opentdb.com/api.php?amount=${result[0]}&category=${result[1]}&difficulty=${result[2]}&type=${result[3]}`
        );
    }
    static getFilters() {
        const totalQuestions = document.getElementById('total-questions').value;
        const category = document.getElementById('select-category').value;
        const difficulty = document.getElementById('select-dificulty').value;
        const type = document.getElementById('select-type').value;
        return [totalQuestions, category, difficulty, type];
    }
}