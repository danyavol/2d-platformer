export function swapArrayElements(array: any[], index1: number, index2: number): void {
    array[index2] = array.splice(index1, 1, array[index2])[0];
}

export function abs(num: number): number {
    if (num < 0) return -num;
    return num;
}