
var asset = "bitcoin"
function changeAsset(newAsset,decPlace){
    asset = newAsset;
    getPrice(asset,decPlace);
}

async function getPrice (asset, decPlace){
    url = 'https://api.coincap.io/v2/assets/' + asset;
    const response = await fetch(url);
    const myJson = response.json().then(data => {
        var data = Array(data);
        changePercent = data[0]['data']['changePercent24Hr'];
        var price = parseFloat(data[0]['data']['priceUsd']).toFixed(decPlace);
        if (changePercent < 0){
            var change = " <div style='color:red' class='fa fa-arrow-circle-down'> <span class='asset'>" + parseFloat(changePercent).toFixed(2) + "%" + "</span></div>";
        }
        else{
            var change = " <div style='color:green' class='fa fa-arrow-circle-up'> <span class='asset'>" + parseFloat(changePercent).toFixed(2) + "%" + "</span></div>";
        }
        document.getElementById("ticker").innerHTML = "$" + price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.getElementById("asset").innerHTML = asset + change;
    })
}

function startTimer() {
    timer = setInterval(function() {
        if (asset == 'dogecoin')
            decPlace = 4;
        else
            decPlace = 2;  
        getPrice(asset,decPlace);
    }, 5000);
}

function darkMode (){
    var checkBox = document.getElementById("checkbox");
    if (checkBox.checked == true){
        document.body.style.backgroundColor = "black";
        document.getElementById("ticker").style.color = "white";
        document.getElementById("asset").style.color = "white";
    }
    else{
        document.body.style.backgroundColor = "white"; 
        document.getElementById("ticker").style.color = "black";
        document.getElementById("asset").style.color = "black";
    }
}

getPrice(asset,2);
startTimer();