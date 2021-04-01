var asset = "bitcoin"
function changeAsset(newAsset){
    asset = newAsset;
    getPrice(asset);
    console.log(asset);
}
async function getPrice (asset){
    url = 'https://api.coincap.io/v2/assets/' + asset;
    const response = await fetch(url);
    const myJson = response.json().then(data => {
        var data = Array(data);
        changePercent = data[0]['data']['changePercent24Hr'];
        var price = parseFloat(data[0]['data']['priceUsd']).toFixed(2);
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
        getPrice(asset);
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

getPrice(asset);
startTimer();