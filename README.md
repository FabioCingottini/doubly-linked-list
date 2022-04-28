# DoublyLinkedList

- [Description](#description)
- [API](#api)
- [Usage](#usage)
    - [Creating a node](#creating-a-node)
    - [Creating a doubly linked list](#creating-a-doubly-linked-list)
    - [Setting the head](#setting-the-head)
    - [Setting the tail](#setting-the-tail)
    - [Inserting a node before another node](#inserting-a-node-before-another-node)
    - [Inserting a node after another node](#inserting-a-node-after-another-node)
    - [Inserting a node in a specific position](#inserting-a-node-in-a-specific-position)
    - [Removing nodes with a certain values](#removing-nodes-with-a-certain-values)
    - [Removing a specific node](#removing-a-specific-node)
    - [Checking whether a value is contained in the list](#checking-whether-a-value-is-contained-in-the-list)

## Description

This npm repository exports:

- A class `DoublyLinkedList` with methods that permits to manage a linked list.
- A class `Node` that permits to create nodes than can be inserted in the linked list.

## API

| Method                                                                     | Description                                                                                                                                                                                                            |
|----------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Node.constructor(value: number)`                                          | Given a `value` of type `number`, create a linked list node                                                                                                                                                            |
| `DoublyLinkedList.construtor()`                                            | Create an empty linked list                                                                                                                                                                                            |
| `DoublyLinkedList.setHead(node: Node)`                                     | Given a `node` instance of class `Node`, set `node` ad the head of the linked list (it will be set also as tail in case of empty linked list ).                                                                        |
| `DoublyLinkedList.setTail(node: Node)`                                     | Given a `node` instance of class `Node`, set `node` ad the tail of the linked list (it will be set also as head in case of empty linked list ).                                                                        |
| `DoublyLinkedList.insertBefore(node: Node, nodeToInsert: Node)`           | Given a `node` and a `nodeToInsert` both instances of class `Node`, insert `nodeToInsert` before `node`. In case `nodeToInsert is already in the list, it will be moved.                                               |
| `DoublyLinkedList.insertAfter(node: Node, nodeToInsert: Node)`            | Given a `node` and a `nodeToInsert` both instances of class `Node`, insert `nodeToInsert` after `node`. In case `nodeToInsert is already in the list, it will be moved.                                                |
| `DoublyLinkedList.insertAtPosition(position: number, nodeToInsert: Node)` | Given a `position` of type `number` and a `nodeToInsert` as an instances of class `Node`, insert `nodeToInsert` at `position` (head is at position 1). In case `nodeToInsert is already in the list, it will be moved. |
| `DoublyLinkedList.removeNodesWithValue(value: number)`                     | Given a `value` of type `number`, remove all the nodes with that `value` from the list.                                                                                                                                |
| `DoublyLinkedList.remove(node: Node)`                                      | Given a `node` as an instance of class `Node`, remove it from the linked list                                                                                                                                          |
| `DoublyLinkedList.containsNodeWithValue(node: Node): boolean`              | Given a `node` as an instance of class `Node`, return a `boolean` representing whether the node is already present in the linked list.                                                                                 |

## Usage

#### Creating a node

```javascript
const {Node} = require("./doubly-linked-list");

const node = new Node(1000);
console.log(node); // Node { value: 100, prev: null, next: null }

`````

#### Creating a doubly linked list

```javascript
const {DoublyLinkedList} = require("./doubly-linked-list");

const dll = new DoublyLinkedList();
console.log(dll); // DoublyLinkedList { head: null, tail: null }

```

#### Setting the head

```javascript
const {Node, DoublyLinkedList} = require("./doubly-linked-list");

const dll = new DoublyLinkedList();
const newHead = new Node(100);
dll.setHead(newHead); // single linked list with a node value 100
// let's set another head
const anotherNewHead = new Node(900);
dll.setHead(newHead); // 900 <-> 100

```

#### Setting the tail

```javascript
const {Node, DoublyLinkedList} = require("./doubly-linked-list");

const dll = new DoublyLinkedList();
const newTail = new Node(100);
dll.setTail(newTail); // single linked list with a node value 100
// let's set another tail
const anotherNewTail = new Node(900);
dll.setTail(anotherNewTail); // 100 <-> 900

```

#### Inserting a node before another node

```javascript
const {Node, DoublyLinkedList} = require("./doubly-linked-list");

const dll = new DoublyLinkedList();
const newTail = new Node(100);
dll.setTail(newTail); // single linked list with a node value 100
// let's set another tail
const anotherNewTail = new Node(900);
dll.setTail(anotherNewTail); // 100 <-> 900
// let's set the new node before the tail
const nodeToInsert = new Node(400);
dll.insertBefore(anotherNewTail, nodeToInsert); // 100 <-> 400 <-> 900
// let's set another node before the previous one
const anotherNodeToInsert = new Node(2);
dll.insertBefore(nodeToInsert, anotherNodeToInsert); // 100 <-> 2 <-> 400 <-> 900

```

#### Inserting a node after another node

```javascript
const {Node, DoublyLinkedList} = require("./doubly-linked-list");
const {Node, DoublyLinkedList} = require("./doubly-linked-list");

const dll = new DoublyLinkedList();
const newHead = new Node(24);
dll.setHead(newHead); // single linked list with a node value 24
// let's set another head
const anotherNewHead = new Node(33);
dll.setTail(anotherNewHead); // 33 <-> 24
// let's set the new node after the head
const nodeToInsert = new Node(76);
dll.insertAfter(anotherNewHead, nodeToInsert); // 33 <-> 76 <-> 24
// let's set another node before the previous one
const anotherNodeToInsert = new Node(1);
dll.insertAfter(nodeToInsert, anotherNodeToInsert); // 33 <-> 76 <-> 1 <-> 24

```

#### Inserting a node in a specific position

```javascript
const {Node, DoublyLinkedList} = require("./doubly-linked-list");
const {Node, DoublyLinkedList} = require("./doubly-linked-list");

const dll = new DoublyLinkedList();
const newHead = new Node(11);
dll.setHead(newHead); // single linked list with a node value 11
// let's set another head
const anotherNewHead = new Node(2);
dll.setTail(anotherNewHead); // 2 <-> 11
// let's set the new node after the head
const nodeToInsert = new Node(12);
dll.insertAtPosition(2, nodeToInsert); // 2 <-> 12 <-> 11
// let's set another node after the previous one
const anotherNodeToInsert = new Node(9);
dll.insertAtPosition(3, anotherNodeToInsert); // 2 <-> 12 <-> 9 <-> 11

```

#### Removing nodes with a certain values

```javascript
const {Node, DoublyLinkedList} = require("./doubly-linked-list");
const {Node, DoublyLinkedList} = require("./doubly-linked-list");

const dll = new DoublyLinkedList();
const newHead = new Node(11);
dll.setHead(newHead); // single linked list with a node value 11
// let's set another head
const anotherNewHead = new Node(2);
dll.setTail(anotherNewHead); // 2 <-> 11
// let's set the new node after the head
const nodeToInsert = new Node(12);
dll.insertAtPosition(2, nodeToInsert); // 2 <-> 12 <-> 11
// let's set another node after the previous one
const anotherNodeToInsert = new Node(12);
dll.insertAtPosition(3, anotherNodeToInsert); // 2 <-> 12 <-> 12 <-> 11
// let's remove nodes with values 12
dll.removeNodesWithValue(12); // 2 <-> 11

```

#### Removing a specific node

```javascript
const {Node, DoublyLinkedList} = require("./doubly-linked-list");
const {Node, DoublyLinkedList} = require("./doubly-linked-list");

const dll = new DoublyLinkedList();
const newHead = new Node(3);
dll.setHead(newHead); // single linked list with a node value 3
// let's set another head
const anotherNewHead = new Node(2);
dll.setTail(anotherNewHead); // 2 <-> 3
// let's set the new node after the head
const nodeToInsert = new Node(11);
dll.insertAtPosition(2, nodeToInsert); // 2 <-> 11 <-> 3
// let's set another node after the previous one
const anotherNodeToInsert = new Node(13);
dll.insertAtPosition(3, anotherNodeToInsert); // 2 <-> 11 <-> 13 <-> 3
// let's remove the first inserted node
dll.remove(nodeToInsert); // 2 <-> 13 <-> 3
// let's remove the second inserted node
dll.remove(anotherNodeToInsert); // 2 <->  3

```

#### Checking whether a value is contained in the list

```javascript
const {Node, DoublyLinkedList} = require("./doubly-linked-list");
const {Node, DoublyLinkedList} = require("./doubly-linked-list");

const dll = new DoublyLinkedList();
const newHead = new Node(3);
dll.setHead(newHead); // single linked list with a node value 3
// let's set another head
const anotherNewHead = new Node(2);
dll.setTail(anotherNewHead); // 2 <-> 3
// let's set the new node after the head
const nodeToInsert = new Node(11);
dll.insertAtPosition(2, nodeToInsert); // 2 <-> 11 <-> 3
// let's set another node after the previous one
const anotherNodeToInsert = new Node(13);
dll.insertAtPosition(3, anotherNodeToInsert); // 2 <-> 11 <-> 13 <-> 3
// let's check if few nodes are included
const is2Contained = dll.containsNodeWithValue(2); // true
const is13Contained = dll.containsNodeWithValue(13); // true`
const is200Contained = dll.containsNodeWithValue(200); // false
const is5Contained = dll.containsNodeWithValue(5); // false

```
