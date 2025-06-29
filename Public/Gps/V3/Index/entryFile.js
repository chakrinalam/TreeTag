function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}


import { StartFunc as StartFuncAddListeners } from "./AddListeners/entryFile.js";

const StartFunc = () => {
    StartFuncAddListeners();
};

StartFunc();

