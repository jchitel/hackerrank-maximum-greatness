export function maximumGreatness(nums: number[]): number {
    /**
     * The goal is to pair off as many numbers as possible from the array with other numbers in the array that are less than themselves.
     * Once a pair has been created, both values cannot be used again in their own arrays.
     * Since we don't care what the actual arrangement is, we don't need to keep the array in the original order.
     *
     * The process is:
     * 1. Create 2 identical sorted copies of the original array: "greater" and "lesser".
     * 2. Start a "greatness" counter at 0.
     * 3. Remove the largest value from "greater" (call it "greatest").
     * 4. From "lesser", remove the largest value that is less than "greatest" (call it "nextGreatest"), if there is one.
     * 5. If there is a "nextGreatest" value, we found a pair, so increment the "greatness" counter.
     * 6. Repeat until it is no longer possible to find a pair (all other pairings do not contribute to the greatness value, so they can be ignored).
     * 7. Return "greatness"
     */
    let greater = nums.toSorted((a, b) => b - a);
    let lesser = greater.slice();
    let greatness = 0;
    while (true) {
        let greatest = greater.shift()!;
        let nextGreatestIndex = lesser.findIndex((v) => v < greatest);
        // We couldn't find a value less than the greatest value, which means there will be no remaining pairs where greater > lesser
        if (nextGreatestIndex === -1) break;
        // We found a value, remove it and increment the greatness, then try again
        lesser.splice(nextGreatestIndex, 1);
        greatness++;
    }
    return greatness;
}

export function computeGreatness(
    original: number[],
    rearranged: number[]
): number {
    return rearranged.reduce(
        (greatness, value, index) =>
            greatness + (value > original[index] ? 1 : 0),
        0
    );
}
