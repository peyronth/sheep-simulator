/**
 * Difference between two angles in radians.
 *
 * @param {number} a1
 * @param {number} a2
 * @return {number}
 */
export function angleDiff(a1: number, a2: number): number {
    return Math.atan2(Math.sin(a2 - a1), Math.cos(a2 - a1))
}