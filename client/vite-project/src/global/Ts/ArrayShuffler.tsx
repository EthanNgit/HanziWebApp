export class ArrayShuffler {
    constructor() {
        this.shuffleArray = this.shuffleArray.bind(this);
    }

    // Knuth shuffle
    shuffleArray(input: any) : any[] | null {
        let arrayToShuffle: any[];

        // Check if it's an array or can be converted to an array
        if (Array.isArray(input)) {
          arrayToShuffle = input;
        } else if (input instanceof Set || typeof input[Symbol.iterator] === 'function') {
          // Convert Set or iterable object to array
          arrayToShuffle = Array.from(input);
        } else {
          // Not an array or iterable, return null
          return null;
        }
      
        // Knuth shuffle
        for (let i = arrayToShuffle.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arrayToShuffle[i], arrayToShuffle[j]] = [arrayToShuffle[j], arrayToShuffle[i]];
        }
      
        return arrayToShuffle;
    }
}