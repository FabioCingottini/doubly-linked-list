/**
 * A class representing a node of a linked list.
 *
 * @property {number} value - The value of the current node,
 * @property {Node | null} prev - A reference to a node instance representing the previous node.
 * @property {Node | null} next - A reference to a node instance representing the next node.
 */
class Node {
  /**
   * Given a value instantiate a node of a linked list with that value.
   *
   * @param {number} value - The value of the current node.
   */
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

module.exports = {Node}