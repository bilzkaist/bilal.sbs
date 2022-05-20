/* globals Chart:false, feather:false */
//Add Moralis code here 
(async function(){
  const serverUrl = "https://7mo2aen51dyh.usemoralis.com:2053/server"
  const appId = "PaClcWW3CtFlc141AaQM2AECASWAKoymybcvetWC"
  await Moralis.start({serverUrl, appId})
})()

async function login() {
  await Moralis.authenticate();
  var elem = document.getElementById("btn-login");
  elem.innerHTML = "Connected";
}

async function logout() {
  await Moralis.User.logout();
}

async function transferNFT(){
  const address=document.getElementById('contractAddress').value;
  const contract=document.getElementById('recipientAddress').value;
  const id=document.getElementById('tokenID').value;
  // sending 0.5 ETH
  const options={
    type:"erc721",
    receiver:address,
    contractAddress: contract,
    tokenId: id
 }
 let transaction = await Moralis.transfer(options);
}

document.getElementById("btn-login").onclick  = login;
document.getElementById("btn-logout").onclick  = logout;
document.getElementById("transfer-nft").onclick  = transferNFT;

//Old bootstrap code
(() => {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })

  // Graphs
  const ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars

})()
