

const btn = document.querySelector(".sbmtButton");
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

function addNew(){
     if (window.userWalletAddress == null){
     alert("Please log in to your metamask wallet");
     return;
    }
    if(getSelectedValue() == 0) {
        alert("Please choose number of images you want to generate");
        return;
    }
    let numbOfImages = parseInt(getSelectedValue());
   

userAccount = window.userWalletAddress
    console.log(userAccount)
    

let requestOptions = {
      method: 'POST',
      headers : {'Content-Type': 'application/json'},
      body: JSON.stringify({ count:  getSelectedValue(), account: userAccount, description: 'desc'})
  };

    let uri = 'http://143.248.56.39:50000/generator'
    fetch(uri, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      loadNFTImages(data);
    });
    
    
}

function findID(clickedID){
    return clickedID.id;
}

function listBtn(btnId) {
	console.log(btnId)
}


const loadNFTImages = async (data) => { 

console.log(data)
imageItems = data.items
let divOfPictureAndButton = new Array(imageItems.length);
let divOfButton = new Array(imageItems.length);
console.log(imageItems)
for(var i = 0; i < imageItems.length; i++) {

        divOfPictureAndButton[i] = document.createElement("div");
        let pictureURL = imageItems[i].img;
        let divOfPicture = document.createElement("div");
        let NFTimage = document.createElement("img");
        let imgID = (i+1).toString() + "NFT";
        NFTimage.setAttribute("src",pictureURL);
        NFTimage.setAttribute("alt","snake");
        NFTimage.setAttribute("class","nftPictures");
        NFTimage.setAttribute("id",imgID);
        NFTimage.setAttribute("width","450px");
        NFTimage.setAttribute("onclick","findID(this)");
        divContainer.append(divOfPictureAndButton[i]);
        divOfPictureAndButton[i].append(divOfPicture);
        divOfPicture.append(NFTimage);

        divOfButton[i] = document.createElement("div");
        divOfPictureAndButton[i].append(divOfButton[i]);
        let buttonID = "buttonNFT" + (i+1).toString();
        let buttonName = "NFT " + (i+1).toString();
        let button = document.createElement("button");
        button.innerHTML = buttonName;
        divOfPicture.append(document.createElement('br'));
        divOfButton[i].append(button);
        divOfButton[i].setAttribute("class","listButtons");
        button.setAttribute("class","buybutton");
        button.setAttribute("id",buttonID);

	let jsonURL = imageItems[i].json

	button.addEventListener("click", function(){listBtn(jsonURL)});

       
    }
    //if(imageItems.length > 0 && imageItems.length <= 10)document.getElementById("footerPart").style.marginTop = "20px";
}