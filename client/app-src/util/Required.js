export function required(parameter) {
    throw new Error(`${parameter} is required`);
}