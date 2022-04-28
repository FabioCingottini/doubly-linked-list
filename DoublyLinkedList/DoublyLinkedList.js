/**
 * @typedef {import('../Node/Node').Node} Node
 */

/**
 * A class representing a doubly linked list.
 *
 * @property {Node | null} head - A reference to the head as an instance of the class Node of the curren linked list.
 * @property {Node | null} tail - A reference to the tail as an instance of the class Node of the curren linked list.
 */
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  /**
   * Given a node, set it as the head of the linked list.
   *
   * @param {Node} node - The node to set as the new linked list head.
   */
  setHead(node) {
    if (this.#checkNodeIsAlreadyThere(node)) {
      this.remove(node);
      node.prev = null;
    }

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      const oldHead = this.head;
      oldHead.prev = node
      node.next = oldHead;
      this.head = node;
    }
  }

  /**
   * Given a node, set it as the tail of the linked list.
   *
   * @param {Node} node - The node to set as the new linked list tail.
   */
  setTail(node) {
    if (this.#checkNodeIsAlreadyThere(node)) {
      this.remove(node);
      node.next = null;
    }

    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      const oldTail = this.tail;
      oldTail.next = node
      node.prev = oldTail;
      this.tail = node;
    }
  }

  /**
   * Given a node a nodeToInsert, insert the nodeToInsert before the node.
   *
   * @param {Node} node - The node that will be before the nodeToInsert.
   * @param {Node} nodeToInsert  - The node that will be after the node.
   */
  insertBefore(node, nodeToInsert) {
    if (this.#checkNodeIsAlreadyThere(nodeToInsert)) {
      this.remove(nodeToInsert);
    }

    if (this.head === node) {
      this.setHead(nodeToInsert);
    } else {
      nodeToInsert.prev = node.prev;
      nodeToInsert.next = node;
      node.prev.next = nodeToInsert;
      node.prev = nodeToInsert;
    }
  }

  /**
   * Given a node a nodeToInsert, insert the nodeToInsert after the node.
   *
   * @param {Node} node - The node that will be after the nodeToInsert.
   * @param {Node} nodeToInsert  - The node that will be before the node.
   */
  insertAfter(node, nodeToInsert) {
    if (this.#checkNodeIsAlreadyThere(nodeToInsert)) {
      this.remove(nodeToInsert);
    }

    if (this.tail === node) {
      this.setTail(nodeToInsert);
    } else {
      nodeToInsert.next = node.next;
      nodeToInsert.prev = node;
      node.next.prev = nodeToInsert;
      node.next = nodeToInsert
    }
  }

  /**
   * Given a node, return whether that node is already contained in the linked list.
   *
   * @param {Node} node - The node to check if is already in the list.
   *
   * @return {boolean} isAlreadyThere - Whether that node is already contained in the linked list.
   */
  #checkNodeIsAlreadyThere(node) {
    let current = this.head;
    while (current) {
      if (node === current) {
        return true;
      }
      current = current.next
    }
    return false;
  }

  /**
   * Given position number starting from 1 and a node instance, insert the node in the given position.
   *
   * @param {number} position - The position at which the node have to be inserted in the linked list, starting from 1.
   * @param {Node} nodeToInsert - The node to insert.
   */
  insertAtPosition(position, nodeToInsert) {
    const nodeIsAlreadyThere = this.#checkNodeIsAlreadyThere(nodeToInsert)
    if (position === 1) {
      this.setHead(nodeToInsert);
    } else {
      let nodeAfterTargetPosition;
      let current = this.head.next;
      let currentPosition = 2;
      while (current) {
        if (currentPosition === position) {
          nodeAfterTargetPosition = current
        }
        currentPosition++;
        current = current.next;
      }
      if (nodeAfterTargetPosition) {
        this.remove(nodeToInsert);
        this.insertBefore(nodeAfterTargetPosition, nodeToInsert);
      }
    }
  }


  /**
   * Given a value, remove all the nodes with that value from the linked list.
   *
   * @param {number} value - The value of the nodes that will be deleted.
   */
  removeNodesWithValue(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        this.remove(current);
        current = current.prev;
        if (!current) current = this.head; // it means the head was removed
        if (!current) return; // it means there was only one node
      } else {
        current = current.next;
      }
    }
  }

  /**
   * Given a node instance, remove it from the linked list.
   *
   * @param {Node} node - The node instance to remove from the linked list.
   */
  remove(node) {
    if (node === this.head && node === this.tail) {
      this.head = null;
      this.tail = null;
    } else if (node === this.head) {
      this.head = this.head.next;
      this.head.prev = null;
    } else if (node === this.tail) {
      this.tail = this.tail.prev
      this.tail.next = null;
    } else {
      let current = this.head.next;
      while (current && current !== this.tail) {
        if (current === node) {
          current.prev.next = current.next;
          current.next.prev = current.prev;
        }
        current = current.next;
      }
    }
  }

  /**
   * Given a numeric value, return whether that value is contained in the linked list
   *
   * @param {number} value
   *
   * @return {boolean}
   */
  containsNodeWithValue(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        return true
      }
      current = current.next;
    }
    return false;
  }
}

module.exports = {DoublyLinkedList}
