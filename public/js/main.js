const server = 'http://localhost:8080';

document.querySelector('form').addEventListener('submit', (e) => {
    console.log("xxxx");
    weightinput = document.getElementById('weight').value;
    heightinput = document.getElementById('height').value;
    console.log("weightinput", weightinput);
    console.log("heightinput", heightinput);

    bmiValue = parseFloat(weightinput)/(parseFloat(heightinput) * parseFloat(heightinput));
    console.log("bmiValue", bmiValue);
    
    document.getElementById('bmi-result').value = bmiValue;

    if(bmiValue < 18.5){
        document.getElementById('bmi-prediction').innerHTML = "You're in the underweight range!";
    }
    else if(bmiValue <= 24.9){
        document.getElementById('bmi-prediction').innerHTML = "You're in the healthy weight range!";
    }
    else if(bmiValue <= 29.9){
        document.getElementById('bmi-prediction').innerHTML = "You're in the overweight range!";
    }
    else{
        document.getElementById('bmi-prediction').innerHTML = "You're in the obese range!";
    }

    addBmiRecord(bmiValue);

    e.preventDefault();
});



async function addBmiRecord(bmiValue) {
    const url = server + '/records';
    const record = {bmi: bmiValue};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(record)
    }
    const response = await fetch(url, options);
}

async function fetchReport() {
    let sum = 0;

    const url = server + '/records';
    const options = {
        method: 'GET',
        headers: {
            'Accept' : 'application/json'
        }
    }
    const response = await fetch(url, options);
    const records = await response.json();
    console.log("records", records);

    displayEntries(records);
}

function displayEntries(records) {
    let length = records.length;
    let sum = 0;
    var table = document.getElementById('entries');
    table.innerHTML = "<tr><th>Body Mass Index</th></tr>";

    records.forEach(record => {
        var row = document.createElement('tr');
        var dataId = document.createElement('td');
        var textId = document.createTextNode(record.bmi);
        sum = sum + record.bmi;
        dataId.appendChild(textId);
        row.appendChild(dataId);
        table.appendChild(row);
    });

    let average = sum/length
    console.log("average", average);
    document.getElementById('bmi-average').innerHTML = "Average: " + average;
}