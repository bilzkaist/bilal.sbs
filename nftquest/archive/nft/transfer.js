Moralis.initialize("zUAslaQCPxdWxFtnIAPVbkc9LUNAjoON8eMCKgTw");
Moralis.serverURL="https://suwkhta9idij.usemoralis.com:2053/server";
const CONTRACT_ADDRESS = "0xfa59f3270bf5e9c6863f778bde7680e55915ffe";

async function init(){
    let currentUser = Moralis.user.current();
    if(!currentUser){
        window.location.pathname = "/index.html";
    }


    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
    document.getElementById("token_id_input").value = nftId;
}

async function transfer(){
    let tokenId = parseInt(document.getElementById("token_id_input"))
    let address = document.getElementById("address_input").value
    let amount = parseInt(document.getElementById("amount_input").value)

    // sending 15 tokens with token id = 1
const options = {
    type: "erc1155",
    receiver: address,
    contractAddress: CONTRACT_ADDRESS,
    tokenId: tokenId,
    amount: amount,
  }
  let result = await Moralis.transfer(options);
}

document.getElementById("submit_transfer").onclick = transfer;

init();