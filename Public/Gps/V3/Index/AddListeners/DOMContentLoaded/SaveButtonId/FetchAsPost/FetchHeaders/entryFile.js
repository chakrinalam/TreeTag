import KeysJson from './keys.json' with { type: 'json' };

let StartFunc = ({ inLatitude, inLongitude, inTreeName }) => {
    let jVarLocalBody = {};

    jVarLocalBody.Longitude = inLongitude;
    jVarLocalBody.Latitude = inLatitude;
    jVarLocalBody.TreeName = inTreeName;
    jVarLocalBody.DateTime = new Date();
    jVarLocalBody.UserName = jFLocalUserNameId();

    KeysJson.body = JSON.stringify(jVarLocalBody);

    return KeysJson;
};

let jFLocalUserNameId = () => {
    let jVarLocalUserNameId = 'UserNameId'
    let jVarLocalHtmlId = document.getElementById(jVarLocalUserNameId);

    if (jVarLocalHtmlId === null === false) {
        return jVarLocalHtmlId.value.trim();
    };
};

export { StartFunc };
