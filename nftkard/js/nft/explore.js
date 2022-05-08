        var selectedChain = "";
        function SendOurRequest() {
	    contractElement = document.getElementById("contractAddress").innerHTML
	    fetchImageElement = document.getElementById('FetchedImage').innerHTML
	    imgLoaderElement = document.getElementById('ImgLoader').innerHTML
	    
            console.log("Selected network: " + selectedChain);
            if (selectedChain != "eth" && selectedChain != "rinkeby") {
                alert("Kindly select a valid chain");
                return;
            }
            var contractAddress = contractElement.value;
            if (contractAddress == "") {
                alert("Kindly enter a valid owner address");
                return;
            }

            console.log("Selected Address: " + contractAddress);
            var url = "https://deep-index.moralis.io/api/v2/" +
                contractAddress
                + "/nft?chain=" +
                selectedChain + "&format=decimal&limit=0";

            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);

            xhr.setRequestHeader("accept", "application/json");
            xhr.setRequestHeader("X-API-Key", "ln1zhc654Zogksf3kGog6Utj63TtLtngv5yKzqi53xt8mckxzrj3u5VDqTlP2QJV");

            fetchImageElement.style.display = "none";
            imgLoaderElement.style.display = "block";

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    try {
                        console.log(xhr.status);
                        console.log(xhr.responseText);
                        var mainObj = JSON.parse(xhr.responseText);
                        var imgParent = JSON.parse(mainObj.result[0].metadata);
                        var imageURL = imgParent.image;
                        document.getElementById('FetchedImage').src = imageURL;
                        document.getElementById('FetchedImage').style.display = "block";
                        console.log("Image URL: " + imageURL);
                    } catch {
                        alert("An error has occured. Either the address is incorrect Or there is no NFT Linked to this address!!!");
                    }
                    imgLoaderElement.style.display = "none";
                }
            };

            xhr.send();
        }