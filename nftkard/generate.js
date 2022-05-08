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
    if(getSelectedValue() == 0) alert("Please choose number of images you want to generate");
    let numbOfImages = parseInt(getSelectedValue());
    document.getElementById("footerPart").style.marginTop = "0px"
    for(let i = 0; i < numbOfImages; i++){
        
        let pictureURL = "http://143.248.56.39:5000/imgs/NFT" + (i+1).toString();
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

       
    }
    if(numbOfImages > 0 && numbOfImages <= 10)document.getElementById("footerPart").style.marginTop = "20px";
}

function findID(clickedID){
    return clickedID.id;
}