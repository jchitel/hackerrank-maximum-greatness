import { computeGreatness } from "../src/index.ts";

export function randomIntegerArray({
    minLength = 0,
    maxLength,
    minValue = 0,
    maxValue = Number.MAX_SAFE_INTEGER / 2,
}: {
    minLength?: number;
    maxLength: number;
    minValue?: number;
    maxValue?: number;
}): number[] {
    let length = randomInteger(minLength, maxLength);
    return Array.from({ length }).map(() => randomInteger(minValue, maxValue));
}

function randomInteger(min: number, max: number): number {
    let dist = max - min;
    let rand = Math.floor(Math.random() * dist);
    return rand + min;
}

export function* permutations<T>(arr: T[]): Iterable<T[]> {
    // Heap's algorithm (adjusted to use less memory by using a single array with a generator)
    arr = arr.slice();
    let swaps = new Array(arr.length).fill(0);
    let i = 1;

    while (i < arr.length) {
        if (swaps[i] < i) {
            let swapIndex = i % 2 === 0 ? 0 : swaps[i];
            [arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]];
            yield arr;
            swaps[i]++;
            i = 1;
        } else {
            swaps[i] = 0;
            i++;
        }
    }
}

export function bruteForceMaximumGreatness(arr: number[]): number {
    let greatness = 0;
    for (let p of permutations(arr)) {
        let g = computeGreatness(arr, p);
        // console.log(
        //     "Original:",
        //     JSON.stringify(arr),
        //     "Rearranged:",
        //     JSON.stringify(a),
        //     "Computed greatness:",
        //     g
        // );
        if (g > greatness) greatness = g;
    }
    return greatness;
}
