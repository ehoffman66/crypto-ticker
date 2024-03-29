
/**
 * When a user clicks a button this function will be called to get and
 * display the most recent price. This function is also used when a user
 * clicks to change the displayed crypto
 * @param  {character} crypto Crypto name to show on the screen
 * @param  {integer}   decPlace Number of decimal places to show
 */
async function getPrice (crypto, decPlace){
    asset = crypto;
    url = 'https://api.coincap.io/v2/assets/' + asset;
    const response = await fetch(url);
    const myJson = response.json().then(data => {
        var data = Array(data);
        changePercent = data[0]['data']['changePercent24Hr'];
        var price = parseFloat(data[0]['data']['priceUsd']).toFixed(decPlace);
        if (changePercent < 0){
            var change = " <div style='color:red' class='fa fa-arrow-circle-down'> <span class='asset'>" + 
                        parseFloat(changePercent).toFixed(2) + "%" + "</span></div>";
        }
        else{
            var change = " <div style='color:green' class='fa fa-arrow-circle-up'> <span class='asset'>" + 
                        parseFloat(changePercent).toFixed(2) + "%" + "</span></div>";
        }
        document.getElementById("ticker").innerHTML = "$" + price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.getElementById("asset").innerHTML = asset + change;
    })
    if (count === 0){
        setMode();
    }
}

/**
 * This function uses Set interval to call getPrice function every
 * 5 seconds.
 */
function startTimer() {
    timer = setInterval(function() {
        if (asset == 'dogecoin')
            decPlace = 3;
        else
            decPlace = 2;  
        getPrice(asset,decPlace);
        count = count+1;
    }, 5000);
}

/**
 * This function checks to see if the toggle for Dark Mode is checked or
 * unchecked and changes the ticker and asset styling
 */
function darkMode (){
    var checkBox = document.getElementById("checkbox");
    if (checkBox.checked === true){
        document.body.style.backgroundColor = "black";
        document.getElementById("ticker").style.color = "white";
        document.getElementById("asset").style.color = "white";
        localStorage['darkMode'] = true;
    }
    else{
        document.body.style.backgroundColor = "white"; 
        document.getElementById("ticker").style.color = "black";
        document.getElementById("asset").style.color = "black";
        localStorage['darkMode'] = false;
    }
}

/**
 * This function gets the current time
 * @return character dateTime Current time
 */
function getDateTime (){
    var d = new Date();
    dateTime = d.getHours() + ":" + (d.getMinutes()<10?'0':'') + d.getMinutes()+ ":" + d.getSeconds();
    return dateTime;
}

/**
 * This function checks localStorage and gets the users perferences 
 * for darkmode.
 */
function setMode(){
    var checkBox = document.getElementById("checkbox");
    if (localStorage['darkMode'] == "true"){
        checkBox.checked = true;
        document.body.style.backgroundColor = "black";
        document.getElementById("ticker").style.color = "white";
        document.getElementById("asset").style.color = "white";
    }
    else{
        checkBox.checked = false;
        document.body.style.backgroundColor = "white"; 
        document.getElementById("ticker").style.color = "black";
        document.getElementById("asset").style.color = "black";
    }
    
    if (localStorage['zipCode']){
        document.getElementById("zipCode").value = localStorage['zipCode'];
    }
}

function openNav() {
    document.getElementById("myNav").style.width = "60%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

function clearValue(input){
    document.getElementById(input).value = "";
}

function addZip(data){
    document.getElementById("zipCode").value = document.getElementById("zipCode").value + data.id;
}

function saveSettings(){
    localStorage['zipCode'] = document.getElementById("zipCode").value;
    alert("saved");
}

function getWeather(){

}

var count = 0;
var asset = "bitcoin"
getPrice(asset,2);
startTimer();