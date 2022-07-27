const ethers = require("ethers");
// import { ethers } from "ethers"; //another way to import things
const fs = require("fs-extra");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "HTTP://172.27.224.1:7545"
  );
  console.log("just checking connection", provider);
  const wallet = new ethers.Wallet(
    "8543deda47df4ccc227417e3a90eda92b3639d29cd4fdfae2ebf1d250bac60ce",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  const contract = await contractFactory.deploy();
  console.log("we just deployed our contract object here", contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
