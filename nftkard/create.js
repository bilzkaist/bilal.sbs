const btn = document.querySelector(".createButton");
//btn.addEventListener("click",deletePrevious);
btn.addEventListener("click",addNew);
btn.addEventListener("click",findID);
btn.addEventListener("click",getTextInput);
btn.addEventListener("click",alerMessage);
let divContainer = document.getElementById("pictures");
let foot = document.getElementById("footerPart");
let textInput = "";



function deletePrevious(){
    divContainer.innerHTML = "hello";
}

function getTextInput(){
    textInput = document.getElementById("to_address_input").value;
}

function alerMessage(){
    alert(textInput);
}

function addNew(){

let requestOptions = {
      method: 'POST',
      headers : {'Content-Type': 'application/json'},
  };

    let uri = 'http://143.248.56.39:50000/ai_generator'
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
console.log(imageItems)
for(var i = 0; i < imageItems.length; i++) {

        
        let pictureURL = imageItems[i].address;
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