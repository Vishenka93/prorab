import { exirciseTrueOrFalse } from "./trueOfFalse.js";

const inputUk = document.querySelector(".wrapper__input_uk");
const inputEn = document.querySelector(".wrapper__input_en");
const btn = document.querySelector(".button-wrapper__button");
const items = document.querySelector(".wrapper__item");
const toolbarBtnWords = document.querySelector(".toolbar__words");
const toolbarBtnTrueOrFalse = document.querySelector(
    ".exercises__true-of-false"
);
const toolbarBtnQuiz = document.querySelector(".exercises__quiz");
const contentWords = document.querySelector(".wrapper-content");
const contentTrueOrFalse = document.querySelector(".true-or-false-content");
const contentQuiz = document.querySelector(".quiz");
const storagePairs = localStorage.getItem("words");
let pairs = storagePairs === null ? [] : JSON.parse(storagePairs);

const defaultTabName = "words";

const toolbarBtns = [toolbarBtnWords, toolbarBtnTrueOrFalse, toolbarBtnQuiz];
const toolbarContents = [contentWords, contentTrueOrFalse, contentQuiz];

const pair = {
    id: null,
    ukWord: "",
    enWord: "",
};

btn.disabled = true;

const displayPairs = () => {
    items.innerHTML = "";
    pairs.forEach(({ enWord, ukWord, id }) => {
        const div = document.createElement("div");
        div.classList.add("pair-word");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "delete";
        deleteBtn.classList.add("delete");

        deleteBtn.onclick = () => {
            pairs = pairs.filter((pair) => pair.id !== id);

            localStorage.setItem("words", JSON.stringify(pairs));
            displayPairs();
        };

        const p = document.createElement("p");
        p.textContent = `${ukWord} - ${enWord}`;

        div.appendChild(p);
        div.appendChild(deleteBtn);
        items.appendChild(div);
    });
};

inputUk.oninput = (e) => {
    pair["ukWord"] = e.target.value;
    btn.disabled = Object.values(pair).some((str) => str === "");
};

inputEn.oninput = (e) => {
    pair["enWord"] = e.target.value;
    btn.disabled = Object.values(pair).some((str) => str === "");
};

btn.onclick = () => {
    pairs.push({ ...pair, id: pairs.length });
    localStorage.setItem("words", JSON.stringify(pairs));

    inputUk.value = "";
    inputEn.value = "";
    btn.disabled = true;
    displayPairs();
};

displayPairs();

const handleClickTab = (tabName) => {
    toolbarContents.forEach((content) => {
        content.style.display =
            content.dataset.name === tabName ? "block" : "none";
    });
    toolbarBtns.forEach((button) => {
        if (button.dataset.name === tabName) {
            button.classList.add("selected-tab");
        } else {
            button.classList.remove("selected-tab");
        }
    });
};
toolbarBtns.forEach((btn) => {
    btn.onclick = (e) => {
        const tabName = e.target.dataset.name;

        handleClickTab(tabName);
        if (tabName === "true-or-false") {
            exirciseTrueOrFalse(pairs);
        }
    };
});

handleClickTab(defaultTabName);
