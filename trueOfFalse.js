const trueOrFalseItem = document.querySelector(".true-or-false-content__item");
const item = document.querySelector(".true-or-false-content__item");
const currentQuestionShow = document.querySelector(
    ".trueOfFalse__current-question"
);
const btnTrue = document.querySelector(".true");
const btnFalse = document.querySelector(".false");
const result = document.querySelector(".result");
const resultScore = document.querySelector(".result__score");
const content = document.querySelector(".content");
const restartBtn = document.querySelector(".restart");
// пары слов
const storagePairs = localStorage.getItem("words");
let pairs = storagePairs === null ? [] : JSON.parse(storagePairs);

export const exirciseTrueOrFalse = (pairs) => {
    const selected = pairs.sort(() => 0.5 - Math.random()).slice(0, 10); // тут взяли 10 слов из общего количества в словаре
    const randomWordsUk = pairs.sort(() => 0.5 - Math.random()).slice(0, 10); // просто рандомные пары слов

    let currentQuestion = 0; // номер текущего вопроса, начиная с 0
    let score = 0; //количество правильных ответов
    let randomUk = ""; // правильная либо неправильная форма перевода, в зависимости от того как отработал рандом

    content.style.display = "block";
    result.style.display = "none";

    const showWords = (i) => {
        //отрисовка номера вопроса и пары слов, перевод зависет от рандома или монетки
        const en = selected[i]["enWord"];
        randomUk =
            Math.random() > 0.5 //монетка в JS
                ? selected[i]["ukWord"]
                : randomWordsUk[i]["ukWord"];
        item.textContent = `${en} = ${randomUk}`;
        currentQuestionShow.textContent = `current question: ${i + 1} / 10`; //номер вопроса начиная с 1
    };

    const handleAnswer = (answer, i) => {
        //обработка ответа юзера
        const correctAnswer = selected[i]["ukWord"] === randomUk; //задумка вопроса, правильный ответ
        if (answer === correctAnswer) {
            score += 1;
        }
    };

    const finish = () => {
        content.style.display = "none";
        result.style.display = "block";
        resultScore.textContent = `your result: ${score} / 10`;
    };

    btnFalse.onclick = () => {
        //попробовать рефакторинг, одинаковые функции для двух кнопок
        handleAnswer(false, currentQuestion);
        currentQuestion++;
        if (currentQuestion < 10) {
            showWords(currentQuestion);
        } else {
            finish();
        }
    };

    btnTrue.onclick = () => {
        handleAnswer(true, currentQuestion);
        currentQuestion++;
        if (currentQuestion < 10) {
            showWords(currentQuestion);
        } else {
            finish();
        }
    };

    showWords(currentQuestion); //отрисовка первого вопроса при загрузке нашей игры
};

restartBtn.onclick = () => {
    exirciseTrueOrFalse(pairs);
};
// 10 вынети в конст и сделать функционал для изменени кол-ва слов
