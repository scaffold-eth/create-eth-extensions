import assert from "assert";
import { 
  TestHelpers,
  YourContract_GreetingChange
} from "generated";
const { MockDb, YourContract } = TestHelpers;

describe("YourContract GreetingChange event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for YourContract GreetingChange event
  const event = YourContract.GreetingChange.createMockEvent({
    greetingSetter: "0x1234567890123456789012345678901234567890",
    newGreeting: "Hello World!",
    premium: true,
    value: 1000n
  });

  it("YourContract_GreetingChange is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await YourContract.GreetingChange.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualGreetingChange = mockDbUpdated.entities.YourContract_GreetingChange.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedGreetingChange: YourContract_GreetingChange = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      greetingSetter: event.params.greetingSetter,
      newGreeting: event.params.newGreeting,
      premium: event.params.premium,
      value: event.params.value,
    };
    
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualGreetingChange, expectedGreetingChange, "Actual GreetingChange should be the same as the expected GreetingChange");
  });
});