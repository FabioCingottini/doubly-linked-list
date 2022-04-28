const {Node} = require("./Node");

describe('Test Node/constructor', () => {
  it("Should return an instance of a Node class with the value property equal to the given one", () => {
    // arrange
    const expectedValue = 10;

    // act
    const node = new Node(expectedValue);

    // assert
    expect(node).toHaveProperty("value", expectedValue);
  });
});
