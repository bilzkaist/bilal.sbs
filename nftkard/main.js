Moralis.initialize("PaClcWW3CtFlc141AaQM2AECASWAKoymybcvetWC");
Moralis.serverURL = "https://7mo2aen51dyh.usemoralis.com:2053/server";
const CONTRACT_ADDRESS = "0xBA8a989eD9108c9f208965Ed7f098b1A93918c1B";  

async function initializeApp(){
    let currentUser = Moralis.User.current();
    console.log(Moralis.User.current());
    console.log("Enter AUTH mode");
    console.log(currentUser.CONTRACT_ADDRESS)
    if(!currentUser)
    {
        currentUser =  await Moralis.Web3.authenticate();
        console.log("Enter AUTH is PASS");
    }
    alert("User is Signed In !!!")
}
 
initializeApp();