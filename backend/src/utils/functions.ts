export function getRandomNymber() {
    const currDate = new Date();
    let min = Math.ceil(1);
    let max = Math.floor(500);

    return currDate.getFullYear() + "" +
        currDate.getMonth() + "" +
        currDate.getDate() + "-" +
        Math.floor(Math.random() * (max - min + 1)) + min;
}