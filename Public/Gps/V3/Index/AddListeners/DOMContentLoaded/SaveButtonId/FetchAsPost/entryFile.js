import { StartFunc as StartFuncFetchFuncs } from './fetchFuncs.js';
import { StartFunc as afterFetch } from './afterFetch/entryFile.js';

const StartFunc = async ({ inLatitude, inLongitude, inTreeName }) => {
    let localResponse = await StartFuncFetchFuncs({ inLatitude, inLongitude, inTreeName });

    afterFetch({ inResponse: localResponse });
};

export { StartFunc };
