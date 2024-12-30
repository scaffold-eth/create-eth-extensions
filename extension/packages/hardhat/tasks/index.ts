import { task } from "hardhat/config";

task("sayHello", "Prints 'Hello, World!'").setAction(async () => {
  console.log("Hello, World!");
});
