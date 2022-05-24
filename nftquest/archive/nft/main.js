Moralis.initialize("zUAslaQCPxdWxFtnIAPVbkc9LUNAjoON8eMCKgTw");
Moralis.serverURL="https://suwkhta9idij.usemoralis.com:2053/server";
const CONTRACT_ADDRESS = "0xfa59f3270bf5e9c6863f778bde7680e55915ffe";
let currentUser;

function fetchNFTMetadata(NFTS){
    let promises=[];
    for (leti=0;i<NFTS.length; i++){
        let nft=NFTS[i];
        let id=nft.token_id;
        //Call Moralis Cloud function -> Static JSON file
        promises.push(fetch("https://suwkhta9idij.usemoralis.com:2053/server/functions/getNFT?_ApplicationId=zUAslaQCPxdWxFtnIAId=" + id)
       .then (res => res.json())
        .then(res => JSON.parse(res.result))
       .then (res => {nft.metadata=res}))
       .then (res =>{
        const options={address: CONTRACT_ADDRESS, token_id: id, chain: "rinkeby" };
        return Moralis.Web3API.token.getTokenIdOwners(options)
        })
        .then( (res) => {
            nft.owners= [];
            res.result.forEach (element =>{
                nft.owners.pùsh(element.owner_of);
            });
            return nft;
        })
    }
    return Promise.all(promises);
}

function renderInventory(NFTS, ownerData){
    const parent = document.getElementById("app");
    for (let  i=0;i<NFTS.length; i++){
        const nft= NFTS[i];
        let htmlString= '
        
        <div class="card">
            <img class="card-img-top" src="${nft.metadata.image}" alt="Card image cap">
            <div class="card-body">
                 <h5 class="card-title">${nft.metadata.name}</h5>
                 <p class="card-text">${nft.metadata.description}</p>
                 <p class="card-text">Amount: ${nft.amount}</p>
                <p class="card-text">Number of Owners: ${nft.owners.length}</p>
                <p class="card-text">Your balance: ${ownerData[nft.token_id]}</p>
                <a href="/mint.html?nftId=${nft.token_id}" class="btn btn-primary">Mint</a>
                <a href="/transfer.html?nftId=${nft.token_id}" class="btn btn-primary">Transfer</a>
            </div>
        </div>
        '
        let col=document.createElement("div");
        col.className="col col-md-4" 
        col.innerHTML = htmlString; 
        parent.appendChild(col);
    }
}

async function getOwnerData() {
    let accounts = currentUser.get("accounts");
    const options = {chain: 'rinkeby', address: accounts[0], token_address: CONTRACT_ADDRESS};
    return Moralis.Web3API.account.getNFTsForContract(options).then((data) => {
        let result = data.result.reduce((object , currentElement) => {
            object[currentElement.token_id] = currentElement.amount;
            return object;
        }, {} )
        return result;
    }
}

async function initializeApp(){
    let currentUser=Moralis.User.current();
    if(!currentUser){
        currentUser=await Moralis.Web3.authenticate();
    }
    const options={address: CONTRACT_ADDRESS, chain: "rinkeby" };
    let NFTS=await Moralis.WEB3API.token.getAllTokenIds (options);
    let NFTWithMetadata=await fetchNFTMetadata(NFTS.result);
    let ownerData = await getOwnerData();
    renderInventory(NFTWithMetadata, ownerData);

}
initializeApp();