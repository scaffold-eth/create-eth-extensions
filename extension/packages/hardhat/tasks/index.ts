import { task } from "hardhat/config";

// In Hardhat 3, tasks are built and registered via the `tasks` array in
// `hardhat.config.ts`. We export the built task definition and add it there.
export const sayHelloTask = task("sayHello", "Prints 'Hello, World!'")
  .setInlineAction(async () => {
    console.log("Hello, World!");
  })
  .build();
