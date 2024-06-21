export function getTotal(data) {
    if (!data) return 0;
    if (typeof data !== 'object') return 0;
    return data?.reduce((acc, curr) => {
        return acc + curr?.list?.reduce((acc, curr) => {
            return acc + parseInt(curr);
        }, 0);
    }, 0);
}

export function getWildResult(data) {
    const wild = data.find(item => item.type === 'wild');
    const wildResult = wild ? wild.list.reduce((prev, current) => prev + current, 0) : 0;
    let diceResult = data.filter(item => item.type !== 'wild');

    if (!diceResult) return wildResult;

    diceResult.forEach((item, index) => {
        item.total = item.list.reduce((prev, current) => prev + current, 0);
    });

    const highest = diceResult.reduce((prev, current) => (prev.total > current.total) ? prev : current, 0).total;
    if (highest > wildResult) {
        return highest;
    }
    
    return wildResult;
}

export function getHighest(data) {
    if (!data) return 0;

    return data.reduce((prev, current) => {
        const thisHighest = Math.max(...current.list);
        return prev > thisHighest ? prev : thisHighest;
    }, 0);
}

export function getLowest(data) {
    if (!data) return 0;

    return data.reduce((prev, current) => {
        const thisLowest = Math.min(...current.list);
        return prev < thisLowest ? prev : thisLowest;
    }, Infinity);
}