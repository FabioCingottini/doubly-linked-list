const {DoublyLinkedList} = require("./DoublyLinkedList");
const {Node} = require("../Node");

/**
 * Given an array of numbers creates a DoublyLinkedList with those values in the given order.
 *
 * @param {Array<number>} values - The values from which the linked list will be created.
 *
 * @return {DoublyLinkedList}
 */
const createTestList = (values) => {
  // arrange (a big one)
  const instance = new DoublyLinkedList();
  // eg: [10, 3, 2, 8, 4, 7]   --   10 <-> 3 <-> 2 <-> 8 <-> 4 <-> 7
  const nodes = values.map(val => new Node(val));
  // link the nodes
  for (let i = 0; i < nodes.length; i++) {
    if (i > 0) {
      nodes[i].prev = nodes[i - 1];
    }
    if (i < nodes.length - 1) {
      nodes[i].next = nodes[i + 1];
    }
  }
  // create the doubly linked list
  const dll = new DoublyLinkedList();
  dll.head = nodes[0];
  dll.tail = nodes[nodes.length - 1];
  return dll;
}

expect.extend({
  /**
   * @param {DoublyLinkedList} receivedDll
   * @param {Array<Number>} values
   */
  toBeValidLinkedList(receivedDll, values) {
    if (!receivedDll.head && !receivedDll.tail && !values.length) {
      return {pass: true}
    }
    if (receivedDll.head === receivedDll.tail && values.length === 1 && values[0] === receivedDll.head.value) {
      return {pass: true}
    }

    // head assertions
    if (receivedDll.head.value !== values[0]) {
      return {
        message: () => `Head does not correspond to the expected value. ${values[0]} expected, ${receivedDll.head.value} found.`,
        pass: false,
      };
    }
    if (receivedDll.head.next.value !== values[1]) {
      return {
        message: () => `Head next does not have the expected value. ${values[1]} expected, ${receivedDll.head.next.value} found.`,
        pass: false,
      };
    }
    // tail assertions
    if (receivedDll.tail.value !== values[values.length - 1]) {
      return {
        message: () => `Tail does not correspond to the expected value. ${values[values.length - 1]} expected, ${receivedDll.tail.value} found.`,
        pass: false,
      };
    }
    if (receivedDll.tail.prev.value !== values[values.length - 2]) {
      return {
        message: () => `Tail prev does not have the expected value. ${values[values.length - 2]} expected, ${receivedDll.tail.prev.value} found.`,
        pass: false,
      };
    }
    let current = receivedDll.head.next;
    let previous = receivedDll.head;
    let i = 1;
    while (current && current !== receivedDll.tail) {
      if (current.value !== values[i]) {
        return {
          message: () => `A node doesn't have the correct value. ${values[i]} expected at node ${i} (head is 0), ${current.value} found.`,
          pass: false,
        };
      }
      if (current.prev.value !== values[i - 1]) {
        return {
          message: () => `A node prev doesn't have the correct value. ${values[i - 1]} expected at node.prev ${i} (head is 0), ${current.prev.value} found.`,
          pass: false,
        };
      }
      if (current.next.value !== values[i + 1]) {
        return {
          message: () => `A node next doesn't have the correct value. ${values[i + 1]} expected at node.next ${i} (head is 0), ${current.next.value} found.`,
          pass: false,
        };
      }
      i++;
      previous = current;
      current = current.next;
    }
    return {
      pass: true,
    };
  }, /**
   * @param {DoublyLinkedList} receivedDll
   * @param {Node} head
   */
  toHaveHead(receivedDll, head) {
    if (receivedDll.head !== head) {
      return {
        message: () => `Head does not correspond to the expected value. ${head.value} expected, ${receivedDll.head.value} found.`,
        pass: false,
      };
    } else if (head.prev !== null) {
      return {
        message: () => `Head.prev should be null, ${head.prev.value} found.`,
        pass: false,
      };
    } else {
      return {pass: true};
    }
  },
  /**
   * @param {DoublyLinkedList} receivedDll
   * @param {Node} tail
   */
  toHaveTail(receivedDll, tail) {
    if (receivedDll.tail !== tail) {
      return {
        message: () => `Tail does not correspond to the expected value. ${tail.value} expected, ${receivedDll.tail.value} found.`,
        pass: false,
      };
    } else if (tail.next !== null) {
      return {
        message: () => `Tail.next should be null, ${tail.next.value} found.`,
        pass: false,
      };
    } else {
      return {pass: true};
    }
  }
});

describe('Test DoublyLinkedList/Constructor', () => {
  it("Should return an instance of DoublyLinkedList with head and tail set to null", () => {
    // act
    const instance = new DoublyLinkedList();

    // assert
    expect(instance).toBeInstanceOf(DoublyLinkedList);
    expect(instance).toHaveProperty("head", null);
    expect(instance).toHaveProperty("tail", null);
  });
});

describe('Test DoublyLinkedList/setHead', () => {
  it('Should be able to move a node already present in the linked list', function () {
    // arrange
    const values = [10, 3, 2, 11, 4];
    const expectedValues = [2, 10, 3, 11, 4];
    const dll = createTestList(values);
    const alreadyInsertedNode = dll.head.next.next; // is 2

    // act
    dll.setHead(alreadyInsertedNode);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
    expect(dll).toHaveHead(alreadyInsertedNode);
  });

  it('Should set the given node both as the new head and as the new tail for an empty list', () => {
    // arrange
    const values = [];
    const expectedHead = new Node(100);
    const expectedValues = [100, ...values];
    const dll = createTestList(values);
    // act
    dll.setHead(expectedHead);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
    expect(dll).toHaveHead(expectedHead);
    expect(dll).toHaveTail(expectedHead);
  });

  it('Should set the given node as the new head for a filled list ', () => {
    // arrange
    const values = [10, 3, 2, 11, 4];
    const expectedHead = new Node(100);
    const expectedValues = [100, ...values];
    const dll = createTestList(values);

    // act
    dll.setHead(expectedHead);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
    expect(dll).toHaveHead(expectedHead);
  });
});

describe("Test DoublyLinkedList/setTail", () => {
  it('Should be able to move a node already present in the linked list', function () {
    // arrange
    const values = [10, 3, 2, 11, 4];
    const expectedValues = [10, 3, 11, 4, 2];
    const dll = createTestList(values);
    const alreadyInsertedNode = dll.head.next.next; // is 2

    // act
    dll.setTail(alreadyInsertedNode);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
    expect(dll).toHaveTail(alreadyInsertedNode);
  });

  it('Should set the given node both as the new tail and as the new head for an empty list', () => {
    // arrange
    const values = [];
    const expectedTail = new Node(100);
    const expectedValues = [100, ...values];
    const dll = createTestList(values);
    // act
    dll.setTail(expectedTail);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
    expect(dll).toHaveTail(expectedTail);
    expect(dll).toHaveHead(expectedTail);
  });

  it('Should set the given node as the new head for a filled list ', () => {
    // arrange
    const values = [10, 3, 2, 11, 4];
    const expectedTail = new Node(100);
    const expectedValues = [...values, 100];
    const dll = createTestList(values);

    // act
    dll.setTail(expectedTail);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
    expect(dll).toHaveTail(expectedTail);
  });
});

describe("Test DoublyLinkedList/insertBefore", () => {
  it('Should be able to move a node already present in the linked list', function () {
    // arrange
    const values = [10, 3, 2, 11, 4];
    const expectedValues = [10, 2, 3, 11, 4];
    const dll = createTestList(values);
    const alreadyInsertedNode = dll.head.next.next; // is 2

    // act
    dll.insertBefore(dll.head.next, alreadyInsertedNode); // is 3

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
  });

  it('Should be able insert the node before the head for a big list', function () {
    // arrange
    const values = [10, 3, 2, 11, 4];
    const expectedHead = new Node(100);
    const expectedValues = [100, ...values];
    const dll = createTestList(values);

    // act
    dll.insertBefore(dll.head, expectedHead);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
    expect(dll).toHaveHead(expectedHead);
  });

  it('Should be able insert the node before the tail for a big list', function () {
    // arrange
    const values = [10, 3, 2, 11, 4];
    const node = new Node(100);
    const expectedValues = [10, 3, 2, 11, 100, 4];
    const dll = createTestList(values);
    const oldTail = dll.tail;

    // act
    dll.insertBefore(dll.tail, node);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
    expect(dll).toHaveTail(oldTail);
  });

  it('Should be able insert the node before the head for a single node list', function () {
    // arrange
    const values = [10];
    const newHead = new Node(100);
    const expectedValues = [100, 10];
    const dll = createTestList(values);
    const oldTail = dll.tail;

    // act
    dll.insertBefore(dll.head, newHead);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
    expect(dll).toHaveHead(newHead);
    expect(dll).toHaveTail(oldTail);
  });

  it('Should be able insert the node before the tail for a single node list', function () {
    // arrange
    const values = [10];
    const newHead = new Node(100);
    const expectedValues = [100, 10];
    const dll = createTestList(values);
    const oldTail = dll.tail;

    // act
    dll.insertBefore(dll.tail, newHead);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
    expect(dll).toHaveHead(newHead);
    expect(dll).toHaveTail(oldTail);
  });

  it('Should be able insert the node in specific position', function () {
    // arrange
    const values = [10, 40, 33, 22, 11, 0, 2];
    const node = new Node(100);
    const expectedValues = [10, 40, 33, 22, 100, 11, 0, 2];
    const dll = createTestList(values);

    // act
    dll.insertBefore(dll.head.next.next.next.next, node); // is 11

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
  });
});

describe("Test DoublyLinkedList/insertAfter", () => {
  it('Should be able to move a node already present in the linked list', function () {
    // arrange
    const values = [10, 3, 2, 11, 4];
    const expectedValues = [10, 2, 11, 3, 4];
    const dll = createTestList(values);
    const alreadyInsertedNode = dll.head.next; // is 3

    // act
    dll.insertAfter(dll.head.next.next.next, alreadyInsertedNode); // is 11

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
  });

  it('Should be able insert the node after the head for a big list', function () {
    // arrange
    const values = [10, 3, 2, 11, 4];
    const expectedHead = new Node(100);
    const expectedValues = [10, 100, 3, 2, 11, 4];
    const dll = createTestList(values);
    const oldHead = dll.head;

    // act
    dll.insertAfter(dll.head, expectedHead);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
    expect(dll).toHaveHead(oldHead);
  });

  it('Should be to able insert the node after the tail for big list', function () {
    // arrange
    const values = [10, 3, 2, 11, 4];
    const expectedTail = new Node(100);
    const expectedValues = [...values, 100];
    const dll = createTestList(values);

    // act
    dll.insertAfter(dll.tail, expectedTail);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
    expect(dll).toHaveTail(expectedTail);
  });

  it('Should be able to insert the node after the tail for single node list', function () {
    // arrange
    const values = [10];
    const expectedTail = new Node(100);
    const expectedValues = [...values, 100];
    const dll = createTestList(values);
    const oldHead = dll.head;

    // act
    dll.insertAfter(dll.tail, expectedTail);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
    expect(dll).toHaveHead(oldHead);
    expect(dll).toHaveTail(expectedTail);
  });

  it('Should be able insert the node after the head for single node list', function () {
    // arrange
    const values = [10];
    const expectedTail = new Node(100);
    const expectedValues = [...values, 100];
    const dll = createTestList(values);
    const oldTail = dll.tail;

    // act
    dll.insertAfter(dll.tail, expectedTail);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
    expect(dll).toHaveHead(oldTail);
    expect(dll).toHaveTail(expectedTail);
  });

  it('Should be able insert the node in specific position', function () {
    // arrange
    const values = [10, 2, 3, 4, 222, 33, 2, 78, 1000];
    const node = new Node(100);
    const expectedValues = [10, 2, 3, 4, 222, 33, 100, 2, 78, 1000];
    const dll = createTestList(values);

    // act
    dll.insertAfter(dll.head.next.next.next.next.next, node); // is 33

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
  });
});

describe("Test DoublyLinkedList/insertAtPosition", () => {
  it('Should be able to move a node already present in the linked list', function () {
    // arrange
    const values = [10, 3, 2, 11, 4];
    const expectedValues = [10, 2, 3, 11, 4];
    const dll = createTestList(values);
    const position = 4; // element will be between 2 and 11
    const alreadyInsertedNode = dll.head.next; // is 3

    // act
    dll.insertAtPosition(position, alreadyInsertedNode);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
  });

  it('Should be able to set new head for single node list', function () {
    // arrange
    const values = [10];
    const expectedHead = new Node(100);
    const expectedValues = [100, 10];
    const dll = createTestList(values);
    const oldTail = dll.head;

    // act
    dll.insertAtPosition(1, expectedHead);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
    expect(dll).toHaveHead(expectedHead);
    expect(dll).toHaveTail(oldTail);
  });

  it('Should not try to set the same head for a single node list', function () {
    // arrange
    const values = [10];
    const expectedValues = [10];
    const dll = createTestList(values);
    const head = dll.head;

    // act
    dll.insertAtPosition(1, head);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
    expect(dll).toHaveHead(head);
    expect(dll).toHaveTail(head);
  });

  it('Should be able to set new head and already present node for a big list', function () {
    // arrange
    const values = [10, 3, 2, 11, 4];
    const expectedValues = [2, 10, 3, 11, 4];
    const dll = createTestList(values);
    const alreadyInsertedNode = dll.head.next.next; // is 2

    // act
    dll.insertAtPosition(1, alreadyInsertedNode);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
    expect(dll).toHaveHead(alreadyInsertedNode);
  });

  it('Should be able to set node at specific position', function () {
    // arrange
    const values = [10, 3, 2, 11, 4];
    const node = new Node(100);
    const expectedValues = [10, 3, 100, 2, 11, 4];
    const dll = createTestList(values);

    // act
    dll.insertAtPosition(3, node);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
  });
});

describe("Test DoublyLinkedList/remove", () => {
  it('should be able to empty the list in case of a single node list', function () {
    // arrange
    const values = [10];
    const expectedValues = [];
    const dll = createTestList(values);

    // act
    dll.remove(dll.head);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
  });

  it('should be able to remove the head in a double node list', function () {
    // arrange
    const values = [10, 43];
    const expectedValues = [43];
    const dll = createTestList(values);
    const oldTail = dll.tail;

    // act
    dll.remove(dll.head);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
    expect(dll).toHaveHead(oldTail);
    expect(dll).toHaveTail(oldTail);
  });

  it('should be able to remove the tail in a double node list', function () {
    // arrange
    const values = [10, 43];
    const expectedValues = [10];
    const dll = createTestList(values);
    const oldHead = dll.head;

    // act
    dll.remove(dll.tail);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
    expect(dll).toHaveHead(oldHead);
    expect(dll).toHaveTail(oldHead);
  });

  it('should be able to remove the head', function () {
    // arrange
    const values = [10, 43, 3, 2, 444, 2];
    const expectedValues = values.slice(1);
    const dll = createTestList(values);

    // act
    dll.remove(dll.head);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
  });

  it('should be able to remove the tail', function () {
    // arrange
    const values = [10, 43, 3, 2, 444, 2];
    const expectedValues = values.slice(0, -1);
    const dll = createTestList(values);

    // act
    dll.remove(dll.tail);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
  });

  it('should be able to remove a node', function () {
    // arrange
    const values = [10, 43, 3, 2, 444, 2];
    const expectedValues = [10, 43, 3, 444, 2];
    const dll = createTestList(values);

    // act
    dll.remove(dll.head.next.next.next); // is 2

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
  });
});

describe("Test DoublyLinkedList/removeNodesWithValue", () => {
  it("should be able to empty the list in case of a single node list", () => {
    // arrange
    const values = [10];
    const expectedValues = [];
    const dll = createTestList(values);

    // act
    dll.removeNodesWithValue(values[0]);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
  });

  it('should be able to empty the list in a double node list', () => {
    // arrange
    const values = [10, 10];
    const expectedValues = [];
    const dll = createTestList(values);

    // act
    dll.removeNodesWithValue(values[0]);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
  });

  it('should be able to empty the list in a multi node list', () => {
    // arrange
    const values = [10, 10, 10];
    const expectedValues = [];
    const dll = createTestList(values);

    // act
    dll.removeNodesWithValue(values[0]);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
  });

  it('should be able to remove the head from a double node list', () => {
    // arrange
    const values = [10, 21];
    const expectedValues = [21];
    const dll = createTestList(values);

    // act
    dll.removeNodesWithValue(values[0]);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
  });

  it('should be able to remove the tail from a double node list', () => {
    // arrange
    const values = [10, 21];
    const expectedValues = [10];
    const dll = createTestList(values);

    // act
    dll.removeNodesWithValue(values[1]);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
  });

  it('should be able to remove a node', () => {
    // arrange
    const values = [10, 21, 37, 33, 22, 11];
    const expectedValues = [10, 21, 37, 22, 11];
    const dll = createTestList(values);

    // act
    dll.removeNodesWithValue(33);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
  });

  it('should be able to remove multiple nodes', () => {
    // arrange
    const values = [10, 33, 37, 33, 22, 33];
    const expectedValues = [10, 37, 22];
    const dll = createTestList(values);

    // act
    dll.removeNodesWithValue(33);

    // assert
    expect(dll).toBeValidLinkedList(expectedValues);
  });
});

describe("Test DoublyLinkedList/containsNodeWithValue", () => {
  it('should return true if node is contained in a single node list', function () {
    // arrange
    const dll = createTestList([10]);

    // act and assert
    expect(dll.containsNodeWithValue(10)).toBeTruthy()
  });

  it('should return false if node is not contained in a single node list', function () {
    // arrange
    const dll = createTestList([10]);

    // act and assert
    expect(dll.containsNodeWithValue(11)).toBeFalsy()
  });

  it('should return true if node is contained in a double node list', function () {
    // arrange
    const dll = createTestList([11, 10]);

    // act and assert
    expect(dll.containsNodeWithValue(10)).toBeTruthy()
  });

  it('should return false if node is not contained in a double node list', function () {
    // arrange
    const dll = createTestList([21, 11]);

    // act and assert
    expect(dll.containsNodeWithValue(10)).toBeFalsy()
  });

  it('should return true if node is contained in a multi node list', function () {
    // arrange
    const dll = createTestList([10, 3, 6, 3, 222, 44, 3]);

    // act and assert
    expect(dll.containsNodeWithValue(222)).toBeTruthy()
  });

  it('should return false if node is not contained in a multi node list', function () {
    // arrange
    const dll = createTestList([10, 3, 6, 3, 222, 44, 3]);

    // act and assert
    expect(dll.containsNodeWithValue(Math.SQRT2)).toBeFalsy();
  });
});
