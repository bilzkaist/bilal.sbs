/*
Available deployed contracts
Ethereum Rinkeby 0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431
Polygon Mumbai 0x351bbee7C6E9268A1BF741B098448477E08A0a53
BSC Testnet 0x88624DD1c725C6A95E223170fa99ddB22E1C6DDD
*/

onMetaMaskLoginComplete = () => {
  console.log("Connected event called")
  contract_address_input.value = nft_contract_address;
  owner_address_input.value = window.userWalletAddress;
};

var respJson = null;
function Explore(){
  var url = "https://deep-index.moralis.io/api/v2/"
  + owner_address_input.value 
  + "/nft/"
  + contract_address_input.value
  + "?chain=rinkeby&format=hex&limit=0";

  
  var getNftListXhr = new XMLHttpRequest();
  getNftListXhr.open("GET", url);

  getNftListXhr.setRequestHeader("accept", "application/json");
  getNftListXhr.setRequestHeader("X-API-Key", "ln1zhc654Zogksf3kGog6Utj63TtLtngv5yKzqi53xt8mckxzrj3u5VDqTlP2QJV");

  getNftListXhr.onreadystatechange = function () {
    if (getNftListXhr.readyState === 4) {

        console.log(getNftListXhr.status);
        console.log(getNftListXhr.responseText);
        respJson = JSON.parse(getNftListXhr.responseText);
        console.log(respJson.total);
        console.log(respJson.result.length);
        totalItems = respJson.result.length;
        results = respJson.result;
        
        
        var columns = Math.round(window.innerWidth / 300);
        if(columns > 6)
          columns = 6;
        else if(columns > 4)
          columns = 4;
        else if(columns > 3)
            columns = 3;
        else if(columns > 2)
            columns = 2;
        var colClass = (12 / columns)
        var totalToAdd = totalItems;
        var totalAdded = 0;
        while (totalAdded < totalToAdd){
            var toAddInThisRow = columns;
            if (totalAdded + toAddInThisRow > totalToAdd)
                toAddInThisRow = totalToAdd - totalAdded;
            var rowString = "<div class='row'>";
            for (var j =0; j < toAddInThisRow; j++){
              
              var result = results[totalAdded + j];
              console.log("index: " + (totalAdded + j));
              var metaData = JSON.parse(result.metadata);

              var imageUri = metaData.image;
              // result.token_id;
              // result.token_address;
              // result.owner_of;
              // result.block_number;
              // result.block_number_minted;
              // result.token_hash;
              // result.amount;
              // result.contract_type;
              // result.name;
                rowString += '<div class="col-md-'+colClass+'" id="cardTemplate">'
                + '<div class="card-background">'
                + '<img class="card-img-top" src="'
                + imageUri
                +'" alt="Card image cap">'
                + '<div class="card-body">'
                + '<p class="card-text">'
                +'Amount: ' + result.amount
                +'</p>'
                + '<h5 class="card-title atomizeNFTCardHeading">'
                + result.name
                +'</h5>'
                + 'Some more details'
                + '<div class="row">'
                + '<div class="col-6">'
                + '<button class="atomizeButton3">Etherscan </button>'
                + '</div>'
                + '<div class="col-6">'
                + '<button class="atomizeButton4">Opensea </button>'
                + '</div>'
                + '</div>'
                + '<button class="atomizeButton1">Transfer </button>'
                + '</div>'
                + '</div>'
                + '</div>';
            }
            
            rowString += "</div";
            var elem = document.createElement('div');
            nftCardContainer.append(elem);
            elem.outerHTML = rowString;
            totalAdded += toAddInThisRow;
        }

    }
  };
  getNftListXhr.send();
}
