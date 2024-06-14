export default class Dice {
    constructor(sides) {
        this.sides = sides;
    }
    
    roll(explode = false) {
        let result = Math.floor(Math.random() * this.sides) + 1;
        if (explode && result === this.sides) {
            result += this.roll(true);
        }
        return result;
    }

    rollMultiple(times, explode = false) {
        let results = [];
        for (let i = 0; i < times; i++) {
            results.push(this.roll(explode));
        }
        return results;
    }
}