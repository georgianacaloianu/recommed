function applyRecommOnInput() {

    // get user input from html
    const val = document.getElementById('idInput').value;
    console.log(val);
    console.log(typeof(val));

    // maybe add some hint errors under the input field so that no empty / no under 10 words are processed
    if(!val || val.trim().length > 10) {
        console.log("Hint error should be displayed!");
        const p = document.getElementById("idHintError");
        console.log(p);
    }

    // make request to obtain keywords for input

    // maybe add the extra keywords from the user

    // maybe output keywords found ?

    // maybe write input keywords in some .json file for recommend.js to work on them ?
}

function makeMonkeyLearnReq() {
    const MonkeyLearn = require('monkeylearn')

    const ml = new MonkeyLearn('[YOUR_API_KEY]')
    let model_id = '[MODEL_ID]'
    let data = ['First text', {text: 'the meeting is at 10 AM', external_id: 'ANY_ID'}, '']
    ml.extractors.extract(model_id, data).then(res => {
        console.log(res.body)
    })
}