export class ArrayShuffler {
    constructor() {
        this.shuffleArray = this.shuffleArray.bind(this);
    }

    // Knuth shuffle
    shuffleArray(input: any): any[] | null {
        let arrayToShuffle: any[];

        if (Array.isArray(input)) {
            arrayToShuffle = input;
        } else if (
            input instanceof Set ||
            typeof input[Symbol.iterator] === 'function'
        ) {
            arrayToShuffle = Array.from(input);
        } else {
            return null;
        }

        for (let i = arrayToShuffle.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrayToShuffle[i], arrayToShuffle[j]] = [
                arrayToShuffle[j],
                arrayToShuffle[i],
            ];
        }

        return arrayToShuffle;
    }
}
