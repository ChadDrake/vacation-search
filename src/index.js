import $ from 'jquery';

const apiKey = '0rMt3f6Fn76sQenA16HY2B8H6y0wc0TJ3a6zhh9q';
const url = 'https://developer.nps.gov/api/v1/parks?';

//https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=0rMt3f6Fn76sQenA16HY2B8H6y0wc0TJ3a6zhh9q

function getState() {
    let state = $('input[name=state]').val();
    $('input[name=state]').val('');
    //state = state.toUpperCase();
    let result = state.split(' ');
    console.log(result);
    return result;
}

function getMaxResult() {
    let maxResult = $('input[name=max-results]').val();
    $('input[name=max-results]').val('');
    return maxResult;
}

const options = {
    headers: new Headers({
    "X-Api-Key": apiKey,
    "accept": "application/JSON"
    })
  };

function returnResult(){
    let params =  {
        stateCode:getState(),
        limit:getMaxResult(),
    };
    let paramString = $.param(params);
    console.log(paramString);
    console.log(`${url}${paramString}&api_key=${apiKey}`);
    fetch(`${url}${paramString}&api_key=${apiKey}`)
    .then(result => console.log(result));
}

function handleSubmit() {
    $('main').on('submit', function (e) {
        e.preventDefault();
        returnResult();
    });
}



function main() {
    handleSubmit();
}

$(main);