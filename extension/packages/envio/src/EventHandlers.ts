/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 * This file is auto-generated from scaffold-eth contracts
 */
import {
  YourContract,
  YourContract_GreetingChange,
} from "generated";

YourContract.GreetingChange.handler(async ({ event, context }) => {
  const entity: YourContract_GreetingChange = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    greetingSetter: event.params.greetingSetter,
    newGreeting: event.params.newGreeting,
    premium: event.params.premium,
    value: event.params.value,
  };

  context.YourContract_GreetingChange.set(entity);
});

