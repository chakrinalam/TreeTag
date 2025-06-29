import getUrlJson from './getUrl.json' with {type: 'json'};
import { StartFunc as StartFuncFetchHeaders } from "./FetchHeaders/entryFile.js";

let StartFunc = async ({ inLatitude, inLongitude, inTreeName }) => {
    let jVarLocalFetchUrl = getUrlJson.GetEndPoint;

    let jVarLocalFetchHeaders = StartFuncFetchHeaders({ inLatitude, inLongitude, inTreeName });

    let response = await fetch(jVarLocalFetchUrl, jVarLocalFetchHeaders);

    return await response;
};

export { StartFunc };

