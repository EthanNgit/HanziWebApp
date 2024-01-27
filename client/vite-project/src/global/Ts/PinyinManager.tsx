import { Validator } from './Validator';

export class PinyinManager {
    randomizeTones(input: string): string {
        const validator = new Validator();

        const toneMap: { [key: string]: string[] } = {
            a: ['ā', 'á', 'ǎ', 'à', 'a'],
            e: ['ē', 'é', 'ě', 'è', 'e'],
            i: ['ī', 'í', 'ǐ', 'ì', 'i'],
            o: ['ō', 'ó', 'ǒ', 'ò', 'o'],
            u: ['ū', 'ú', 'ǔ', 'ù', 'u'],
            ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ', 'ü'],
        };
        const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'ü']);

        if (validator.normalizeString(input) !== input) {
            // Switch out the tone marks
            let newPinyin = input;
            for (let i = 0; i < input.length; i++) {
                const normalizedChar = validator.normalizeString(input[i]);
                if (input[i] !== normalizedChar) {
                    const randomIndex = Math.floor(Math.random() * 5);
                    const randomTone = toneMap[normalizedChar][randomIndex];

                    newPinyin = newPinyin.slice(0, i) + randomTone + newPinyin.slice(i + 1);
                }
            }

            return newPinyin;
        } else {
            // Make new options
            for (let i = 0; i < input.length; i++) {
                if (vowels.has(input[i])) {
                    // Cut it off before it can reach another flat vowel (4)
                    const normalizedChar = validator.normalizeString(input[i]);
                    const randomIndex = Math.floor(Math.random() * 4);
                    const randomTone = toneMap[normalizedChar][randomIndex];

                    const newPinyin = input.slice(0, i) + randomTone + input.slice(i + 1);

                    return newPinyin;
                }
            }
        }

        return '';
    }
}
