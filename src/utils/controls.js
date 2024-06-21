export function handleLateralScroll (event) {
    event.preventDefault();
    event.currentTarget.scrollLeft += event.deltaY;
}