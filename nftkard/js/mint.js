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
const loginButton = document.getElementById('loginButton');

async function LoginMetaMaskClick(){
    if (!metaMaskAvailable)
    return;
    await login();
}
function toggleButton() {
    if (!window.ethereum) {
        loginButton.innerText = 'MetaMask is not installed'
        return false
    }
    else
        metaMaskAvailable = true;

    loginButton.addEventListener('click', loginWithMetaMask)
}


window.addEventListener('DOMContentLoaded', () => {
    toggleButton()
});

const web3 = new Web3(window.ethereum);

//frontend logic

async function login(){
  document.getElementById('loginButton').setAttribute("disabled", null);
  Moralis.Web3.authenticate().then(function (user) {
      user.save();
      console.log("user saved");
      metaMaskLoginControls.remove();
      controlsContainer.append(uploadControlsBkp);
      console.log("controls changed");
  })
}

openFileChild = null;
var selectedFile = null;

function FormOpenFileCallBack(event) {
  try{
  document.body.removeChild(openFileChild);
}catch{}
  openFileCallBack(event.target.files);
  //new OpenFileDialogResult(event, (res) => { openFileCallBack(res); });
}
function OpenFile(callback, filter) 
{
  if (filter == null)
    filter = accept = "*";
  var container = document.createElement('div');
  openFileCallBack = null;
  container.id = "openFileInput";
  $('body').append(container);
  var html = "<input type='file' style='display: none' accept='" + filter + "' id='formFileInput' onchange='FormOpenFileCallBack(event)'/>";
  //log(html);
  $('#openFileInput').append(html);
  document.body.append("");
  openFileChild = container;


  openFileCallBack = callback;
  $("input").trigger("click");
  }
function loadImage(){

  OpenFile((s) => {
    //console.log("call back!: " + URL.createObjectURL(s[0]));
      imgPreviewDiv.src = URL.createObjectURL(s[0]);
      //console.log(imgPreviewDiv.src);
      selectedFile=s[0];
      document.getElementById("uploadButton").innerHTML = "Mint";
    });
    return;
  }

var etherscanLink = null;
var openseaLink = null;
function openOnOpenSea()
{
  window.open(openseaLink, '_blank').focus();
}
async function upload()
{
  if (etherscanLink != null)
  {
    window.open(etherscanLink, '_blank').focus();
    return;
  }
  if (selectedFile == null)
  {
    loadImage();
    return;
  }
  document.getElementById("imgPreview").setAttribute("disabled", null);
  document.getElementById("uploadButton").setAttribute("disabled", null);
  document.getElementById("uploadButton").innerHTML = "Minting...";
  console.log("Uploading now")
  const data = selectedFile;
  const imageFile = new Moralis.File(data.name, data);
  await imageFile.saveIPFS();
  const imageURI = imageFile.ipfs();
  const metadata = {
    "name":document.getElementById("imagename").value,
    "description":document.getElementById("imagedescription").value,
    "image":imageURI
  }
  const metadataFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
  console.log("Made json: " + metadata);
  await metadataFile.saveIPFS();
  const metadataURI = metadataFile.ipfs();
  const txt = await mintToken(metadataURI).then(notify)

//   const fileInput = document.getElementById("file");
//   const data = fileInput.files[0];
//   const imageFile = new Moralis.File(data.name, data);
//   document.getElementById('upload').setAttribute("disabled", null);
//   document.getElementById('file').setAttribute("disabled", null);
//   document.getElementById('name').setAttribute("disabled", null);
//   document.getElementById('description').setAttribute("disabled", null);
//   await imageFile.saveIPFS();
//   const imageURI = imageFile.ipfs();
//   const metadata = {
//     "name":document.getElementById("name").value,
//     "description":document.getElementById("description").value,
//     "image":imageURI
//   }
//   const metadataFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
//   await metadataFile.saveIPFS();
//   const metadataURI = metadataFile.ipfs();
//   const txt = await mintToken(metadataURI).then(notify)
}

async function mintToken(_uri){
  const encodedFunction = web3.eth.abi.encodeFunctionCall({
    name: "mintToken",
    type: "function",
    inputs: [{
      type: 'string',
      name: 'tokenURI'
      }]
  }, [_uri]);

  const transactionParameters = {
    to: nft_contract_address,
    from: ethereum.selectedAddress,
    data: encodedFunction
  };
  const txt = await ethereum.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters]
  });
  return txt
}

async function notify(responseHashID){
  console.log("Got Hash: " + responseHashID);
  etherscanLink = "https://rinkeby.etherscan.io/tx/" + responseHashID;

  document.getElementById("uploadButton").removeAttribute("disabled");
  document.getElementById("uploadButton").innerHTML = "View on etherscan";
  
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
  .catch((e) => {
      console.error(e.message)
      return
  });
  openseaLink = "https://testnets.opensea.io/" + accounts[0];
  console.log("openseaLink: " + openseaLink);
  document.getElementById("uploadControlsDiv").append(openSeaLinkButtonBkp);
} 