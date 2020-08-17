import $ from 'jquery';

const apiKey = '0rMt3f6Fn76sQenA16HY2B8H6y0wc0TJ3a6zhh9q';
const url = 'https://developer.nps.gov/api/v1/parks?';

//https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=0rMt3f6Fn76sQenA16HY2B8H6y0wc0TJ3a6zhh9q

function getState() {
    let state = $('input[name=state]').val();
    $('input[name=state]').val('');
    state = state.toUpperCase();
    //let result = state.split(',');
    console.log(state);
    return state;
}

function getMaxResult() {
    let maxResult = $('input[name=max-results]').val();
    $('input[name=max-results]').val('');
    return maxResult;
}

// const options = {
//     headers: new Headers({
//     "X-Api-Key": apiKey,
//     "accept": "application/JSON"
//     })
//   };

function returnResult(){
    let params =  {
        stateCode:getState(),
        limit:getMaxResult(),
    };
    let name = [];
    let description = [];
    let webUrl = [];
    let paramString = $.param(params);
    fetch(`${url}${paramString}&api_key=${apiKey}`)
    .then(result => result.json())
    .then(resultJson => getParks(resultJson));
}

function getParks(result) {
    let name =[];
    let description=[];
    let webUrl =[];
    for(let i = 0; i < result.data.length; i++) {
        name.push(result.data[i].fullName);
        description.push(result.data[i].description);
        webUrl.push(result.data[i].url);
    } generateHtml(name, description, webUrl);
}

function generateHtml(name, description, webUrl) {
    $('ul').html('');
    for(let i = 0; i<name.length; i++){
        $('ul').append(`<li>${name[i]}</li>
        <li>${description[i]}</li>
        <li><a href="${webUrl[i]}">${webUrl[i]}</a></li>`);
    }
    
}

function handleSubmit() {
    $('main').on('submit', function (e) {
        e.preventDefault();
        returnResult();
        getParks();
    });
}



function main() {
    handleSubmit();
}

$(main);