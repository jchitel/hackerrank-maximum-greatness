import { describe, test } from "node:test";
import { bruteForceMaximumGreatness, randomIntegerArray } from "./util.ts";
import { maximumGreatness } from "../src/index.ts";

describe("Maximum Greatness", () => {
    test("hardcoded arrays", (t) => {
        let arrs: number[][] = [
            [1, 2, 3],
            [3, 4, 5, 1, 1, 2, 4],
        ];

        for (let arr of arrs) {
            let expected = bruteForceMaximumGreatness(arr);
            let actual = maximumGreatness(arr);
            t.assert.equal(actual, expected);
        }
    });

    test("random arrays", (t) => {
        for (let i = 0; i < 10; i++) {
            let arr = randomIntegerArray({
                // Values higher than 13 are pretty slow in the brute force method
                maxLength: 13,
                minValue: 1,
                maxValue: 1000,
            });
            let expected = bruteForceMaximumGreatness(arr);
            let actual = maximumGreatness(arr);
            t.assert.equal(actual, expected);
        }
    });
});
