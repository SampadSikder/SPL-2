async function main() {
    const ContractFactory = await ethers.getContractFactory("stocktech");
    const myContract = await ContractFactory.deploy();   
    console.log("Contract deployed to address:", myContract.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });