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
//..........................create.js code here.....

function createAIImage(){
    const textAI =document.getElementById('createAIText').value;
    console.log(textAI);
    alert("Omer Alert !!!" + " " +textAI);

}

const btn = document.querySelector(".sbmtButton");
const loader = document.querySelector("#loading");
btn.addEventListener("click",deletePrevious);
btn.addEventListener("click",addNew);
btn.addEventListener("click",findID);
let numberOfImages = document.getElementById("numberOfImages").value;
const divContainer = document.getElementById("pictures");
const foot = document.getElementById("footerPart");

function getSelectedValue(){
    return document.getElementById("numberOfImages").value;
}

function deletePrevious(){
    divContainer.innerHTML = "";
}

function displayLoading() {
    loader.classList.add("display");
}

// hiding loading 
function hideLoading() {
    loader.classList.remove("display");
}


function addNew(){
     if (window.userWalletAddress == null){
     alert("Please log in to your metamask wallet");
     return;
    }
    if(getSelectedValue() == 0) {
        alert("Please choose number of images you want to generate");
        return;
    }
    
    let keywordss = document.getElementById("keywords").value;
    if(keywordss.length == 0) {
      alert("Please enter your search keywords");
      return;
    }


   displayLoading();

    userAccount = window.userWalletAddress
    let numbOfImages = parseInt(getSelectedValue());
    document.getElementById("footerPart").style.marginTop = "0px"

let requestOptions = {
      method: 'POST',
      headers : {'Content-Type': 'application/json'},
      body: JSON.stringify({ search:  keywordss, account: userAccount, count:  getSelectedValue()})
  };

    btn.disabled = true;

    let uri = 'http://143.248.56.39:50000/vqgan_generator'
    fetch(uri, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      loadNFTImages(data);
    })
   .finally(() => (btn.disabled = false));

}



function findID(clickedID){
    return clickedID.id;
}

function listBtn(btnId) {
	console.log(btnId)
}


const loadNFTImages = async (data) => { 

hideLoading();

console.log(data)
imageItems = data.items
console.log(imageItems)
for(var i = 0; i < imageItems.length; i++) {

        
        let pictureURL = imageItems[i].img;
        let divOfPicture = document.createElement("div");
        let NFTimage = document.createElement("img");
        let imgID = (i+1).toString() + "NFT";
        NFTimage.setAttribute("src",pictureURL);
        NFTimage.setAttribute("alt","snake");
        NFTimage.setAttribute("id",imgID);
        NFTimage.setAttribute("onclick","findID(this)");
        divContainer.append(divOfPicture);
        divOfPicture.append(NFTimage);

        let buttonName = "buttonNFT" + (i+1).toString();
        let button = document.createElement("button");
        button.innerHTML = "Add to list";
        divOfPicture.append(document.createElement('br'));
        divOfPicture.append(button);
        button.setAttribute("class","buybutton");
        button.setAttribute("id",buttonName);

	let jsonURL = imageItems[i].json

	button.addEventListener("click", function(){listBtn(jsonURL)});

       
    }
    if(imageItems.length > 0 && imageItems.length <= 10)document.getElementById("footerPart").style.marginTop = "20px";
}