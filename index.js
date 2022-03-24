// Source code to interact with smart contract

// web3 provider with fallback for old version
window.addEventListener("load", async () => {
  // New web3 provider
  if (window.ethereum) {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    console.log(account);
    try {
      // ask user for permission
      await ethereum.enable();
      // user approved permission
    } catch (error) {
      // user rejected permission
      console.log("user rejected permission");
    }
  }
  //   Old web3 provider
  else if (window.web3) {
    // window.web3 = new Web3(web3.currentProvider);
    // no need to ask for permission
  }
  // No web3 provider
  else {
    console.log("No web3 provider detected");
  }
});
console.log(window.web3.currentProvider);
const stake = document.querySelector(".create-stake");
const token = document.querySelector(".token");
const modify = document.querySelector(".modify");
const reward = document.querySelector(".reward");

// contractAddress and abi are setted after contract deploy
var contractAddress = "0x9EB82596653E275F0d583d3cA49C70ff3f04b5Ac";
var abi = JSON.parse(
  '[{"inputs":[{"internalType":"uint256","name":"_supply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensPurchased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"_stakeholder","type":"address"}],"name":"addStakeholder","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"user","type":"address"},{"components":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"since","type":"uint256"}],"internalType":"struct Stakes.Stake[]","name":"address_stakes","type":"tuple[]"}],"internalType":"struct Stakes.Stakeholder","name":"_stakeholder","type":"tuple"}],"name":"calculateReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_stake","type":"uint256"}],"name":"createStake","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"modifyTokenBuyPrice","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract Token","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withDrawRewards","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
);

//contract instance
var web3 = new Web3(window.ethereum);
contract = new web3.eth.Contract(abi, contractAddress);

// Accounts
var account;

web3.eth.getAccounts(function (err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    return;
  }
  if (accounts.length == 0) {
    alert(
      "No account found! Make sure the Ethereum client is configured properly."
    );
    return;
  }
  account = accounts[0];
  console.log("Account: " + account);
  web3.eth.defaultAccount = account;
});

stake.addEventListener("click", createStake);
token.addEventListener("click", buyToken);
modifyToken.addEventListener("click", modifyTokenBuyPrice);
reward.addEventListener("click", obtainRewards);

//Smart contract functions
function createStake() {
  info = document.querySelector("#stakeInfo").value;
  contract.methods
    .createStake(info)
    .send({ from: account })
    .then(function (tx) {
      console.log("Transaction: ", tx);
    });
  info.value = "";
  alert("A stake has been made successfully");
}

function buyToken() {
  contract.methods
    .buyToken()
    .send({ from: account })
    .then(function (info) {
      console.log("info: ", info);
      document.getElementById("tokenInfo").innerHTML =
        "Token Bought Successfully";
    });
}

function modifyTokenBuyPrice() {
  amount = document.querySelector(".changeTokenPrice").value;
  contract.methods
    .modifyTokenBuyPrice(amount)
    .send({ from: account })
    .then(function (info) {
      console.log("info: ", info);
      document.getElementById("modifyToken").innerHTML =
        "Token amount updated successfully";
    });
}

function obtainRewards() {
  contract.methods
    .withDrawRewards()
    .send({ from: account })
    .then(function (info) {
      console.log("info: ", info);
      document.getElementById("rewards").innerHTML = "Rewards reclaimed";
    });
}
