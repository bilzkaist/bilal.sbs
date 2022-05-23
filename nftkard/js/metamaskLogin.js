Moralis.initialize("PaClcWW3CtFlc141AaQM2AECASWAKoymybcvetWC"); // Application id from moralis.io
Moralis.serverURL = "https://7mo2aen51dyh.usemoralis.com:2053/server"; //Server url from moralis.io

const nft_contract_address = "0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431" //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.
/*
Available deployed contracts
Ethereum Rinkeby 0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431
Polygon Mumbai 0x351bbee7C6E9268A1BF741B098448477E08A0a53
BSC Testnet 0x88624DD1c725C6A95E223170fa99ddB22E1C6DDD
*/

console.log("mint scripts")
window.userWalletAddress = null;
var metaMaskAvailable = false;
var controlsDivBkp = null;
var controlsContainerBkp = null;
function setupLoginControls(controlsDiv){
    controlsDivBkp = controlsDiv;
    controlsContainerBkp = controlsDivBkp.parentNode;
    controlsDiv.remove();

    checkIfAlreadySignedIn();
}
async function LoginMetaMaskClick(){
    if (metaMaskAvailable)
        logout();
    else
        await login();
}
function checkIfAlreadySignedIn() {
    if (!window.ethereum) {
        MetaMaskLogin_Message.innerText = 'MetaMask is not installed'
        return false
    }
    else{
            metaMaskAvailable = true;
    }
    loginComplete();
}

window.addEventListener('DOMContentLoaded', () => {
  checkIfAlreadySignedIn()
});

const web3 = new Web3(window.ethereum);

//frontend logic

async function loginComplete()
{
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
  .catch((e) => {
      console.error(e.message)
      return
  })
    if (!accounts) { return }

  window.userWalletAddress = accounts[0];
  metaMaskAvailable = true;
  controlsContainerBkp.append(controlsDivBkp);
  MetaMaskLogin_Heading.innerText = 'MetaMask Connected!'
  MetaMaskLogin_Message.innerText = 'Signed in as '+ window.userWalletAddress.substring(0, 10)+"...";
  MetaMaskLogin_Login.innerText = 'Sign out'
  console.log("Signed in");
}
async function login(){
    Moralis.Web3.authenticate().then(function (user) {
    user.save();
    console.log("user saved");
    loginComplete();
    });
}
async function logout() {
    console.log("Logging out");
    window.userWalletAddress = null;
    MetaMaskLogin_Heading.innerText = 'Connect MetaMask'
    MetaMaskLogin_Message.innerText = "You need to login to your MetaMask in order to begin";
    MetaMaskLogin_Login.innerText = 'Connect MetaMask'
    metaMaskAvailable = false;
    await Moralis.User.logOut();
    var cons = controlsDivBkp;
    cons.remove();
}
