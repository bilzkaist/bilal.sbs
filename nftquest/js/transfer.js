/* globals Chart:false, feather:false */
//Add Moralis code here 
/*
onMetaMaskLoginComplete = () => {
  console.log("Connected event called")
  //owner_address_input.value = window.userWalletAddress;
  sender_address_input.value = window.userWalletAddress;
  contract_address_input.value = nft_contract_address;
  recipient_address_input.value = window.userWalletAddress;
  token_id_input.value = 0;
};*/

onMetaMaskLoginComplete = () => {
  console.log("Connected event called")
  contract_address_input.value = nft_contract_address;
  recipient_address_input.value = "0xAc2AF01Cec3519C4164A926dAafE48620BbFECB2";//window.userWalletAddress;
  token_id_input.value = 0;
};


(async function(){
    const serverUrl = "https://7mo2aen51dyh.usemoralis.com:2053/server"
    const appId = "PaClcWW3CtFlc141AaQM2AECASWAKoymybcvetWC"
    await Moralis.start({serverUrl, appId})
  })()
  
  /*
  async function login() {
    await Moralis.authenticate();
    var elem = document.getElementById("btn-login");
    elem.innerHTML = "Connected";
  }
  
  async function logout() {
    await Moralis.User.logout();
  }
  
  */
  async function transferNFT(){
    const web3 = await Moralis.enableWeb3();
    const address=document.getElementById('recipient_address_input').value;
    const contract=document.getElementById('contract_address_input').value;
    const id=document.getElementById('token_id_input').value;
    console.log(address);
    console.log(contract);
    console.log(id);
    // sending 0.5 ETH
    const options={
      type:"erc721",
      receiver:address,
      contractAddress: contract,
      tokenId: id
   }
   let transaction = await Moralis.transfer(options);
   var elem = document.getElementById("transfer-nft");
   elem.innerHTML = "Transfer is done!";
  }
  
 /*

  document.getElementById("loginButton").onclick  = login;
  //document.getElementById("btn-logout").onclick  = logout;
  document.getElementById("transfer-nft").onclick  = transferNFT;
  */
  //Old bootstrap code
  (() => {
    'use strict'
  
    feather.replace({ 'aria-hidden': 'true' })
  
    // Graphs
    const ctx = document.getElementById('myChart')
    // eslint-disable-next-line no-unused-vars
  
  })()