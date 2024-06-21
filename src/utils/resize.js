function handleResizeText(element) {
    const containerWidth = element.clientWidth;
    const content = element.innerText;
    
    let fontSize = parseInt(window.getComputedStyle(element).fontSize);

    // how many digits are in the number
    const digits = content.length;
    
    element.style.fontSize = `${truncatedPolimone(parseInt(digits))}px`;
}

const poliCoef = {
    a: -0.111,
    b: 2.62,
    c: -22.2,
    d: 83.1
} 

const truncatedPolimone = (x) => {
    if (x <= 2) {
        return 48;
    } else if (x <= 8) {
        const { a, b, c, d } = poliCoef;
        return Math.floor(a*x**3 + b*x**2 + c*x + d);
    } else {
        return 16;
    }
}

export { handleResizeText }