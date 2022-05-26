
//..........................create.js code here.....

const btn1 = document.querySelector(".sbmtButton");
const loader = document.querySelector("#loading");
btn1.addEventListener("click",deletePrevious);
btn1.addEventListener("click",addNew);
btn1.addEventListener("click",findID);
let numberOfImages = document.getElementById("numberOfImages").value;
const divContainer = document.getElementById("pictures");

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

    btn1.disabled = true;

    let uri = 'http://143.248.56.39:50000/vqgan_generator'
    fetch(uri, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      loadNFTImages(data);
    })
   .finally(() => (btn1.disabled = false));

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