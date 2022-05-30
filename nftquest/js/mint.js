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
  const message = document.getElementById("p01");
  message.innerHTML = "";
  while(1){
    try{
      console.log("here");
      document.getElementById("imgPreview").setAttribute("disabled", null);
      document.getElementById("uploadButton").setAttribute("disabled", null);
      document.getElementById("uploadButton").innerHTML = "Minting...";
      console.log("Uploading now");
      const data = selectedFile;
      let name = data.name.replace(/[^.a-zA-Z]/g, '');
      console.log(name);
      const imageFile = new Moralis.File(name, {base64 : btoa(JSON.stringify(data))});
      await imageFile.saveIPFS({useMasterKey:true});
      const imageURI = imageFile.ipfs();
      const metadata = {
      "name":document.getElementById("imagename").value,
      "description":document.getElementById("imagedescription").value,
      "image":imageURI
      }
      const metadataFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
      console.log("Made json: " + metadata);
      await metadataFile.saveIPFS({useMasterKey:true});
      const metadataURI = metadataFile.ipfs();
      const txt = await mintToken(metadataURI).then(notify);
      message.innerHTML = "";
      break;
    }
    catch(error){
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Request rejected by user.');
        message.innerHTML = "You rejected the request. Please refresh the page and try again.";
        break;
      } else {
        console.error(error);
      }
      document.getElementById("uploadButton").innerHTML = "Mint";
      message.innerHTML = "Please give name and description in English!";
    }
  }


  
    
    
  

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