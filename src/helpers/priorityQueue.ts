export enum Direction {
    LOWER_FIRST = 1,
    HIGHER_FIRST = 2,
}

export interface PriorityQueueElement<T> {
    priority: number;
    item: T;
}

export class PriorityQueue<T> {
    private items: PriorityQueueElement<T>[];
    private direction: Direction;
  
    constructor(direction: Direction = Direction.LOWER_FIRST) {
      this.items = [];
      this.direction = direction;
    }
  
    /**
     * Pushes an item into the queue with a priority
     * @param item      - The item to be pushed
     * @param priority  - The priority of the item
     */
    enqueue(item: T, priority: number): void {
      const element = { priority, item };
      this.items.push(element);
      this.bubbleUp(this.items.length - 1);
      console.log("Enqueued: ", element, "Queue: ", this.items);
      
    }
  
    /**
     * Removes the item with the highest priority
     * @returns The item with the highest priority
     */
    dequeue(): PriorityQueueElement<T> | undefined {
      if (this.isEmpty()) {
        return undefined;
      }
  
      this.swap(0, this.items.length - 1);
      const max = this.items.pop();
      this.bubbleDown(0);
      return max;
    }

    /**
     * Returns the item with the highest priority
     * @returns The item with the highest priority
     */
    peek(): PriorityQueueElement<T> | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        return this.items[0];
    }
  
    /**
     * Return True if the queue is empty, False otherwise
     */
    isEmpty(): boolean {
      return this.items.length === 0;
    }
  
    private bubbleUp(index: number): void {
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (this.items[parentIndex].priority > this.items[index].priority) {
          break;
        }
        this.swap(parentIndex, index);
        index = parentIndex;
      }
    }
  
    private bubbleDown(index: number): void {
      const size = this.items.length;
      while (true) {
        let maxIndex = index;
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
  
        if (
          leftChildIndex < size &&
          this.items[leftChildIndex].priority > this.items[maxIndex].priority
        ) {
          maxIndex = leftChildIndex;
        }
  
        if (
          rightChildIndex < size &&
          this.items[rightChildIndex].priority > this.items[maxIndex].priority
        ) {
          maxIndex = rightChildIndex;
        }
  
        if (maxIndex === index) {
          break;
        }
  
        this.swap(index, maxIndex);
        index = maxIndex;
      }
    }
  
    private swap(index1: number, index2: number): void {
      [this.items[index1], this.items[index2]] = [
        this.items[index2],
        this.items[index1],
      ];
    }
  }
  