import { StartFunc as StartFuncDOMContentLoaded } from "./DOMContentLoaded/entryFile.js";

let StartFunc = () => {
    StartFuncDOMContentLoaded();
};

export { StartFunc };