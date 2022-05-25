const canvas = document.querySelector(".canvas");
let root = document.documentElement;

let mouseDown = false;
let penColor = "#bbb";

// REPRESENTS GRID SIZE, DEFUALT 16X16
let dimensions = 16;
// SETTING GRID DIMENSIONS
canvas.style.setProperty("grid-template-columns", `repeat(${dimensions}, 1fr)`);

let pixels = [];

const generateGrid = () => {
    for (let i = 0; i < dimensions ** 2; i++) {
        let pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.addEventListener("mousedown", (e) => {
            pixel.style.backgroundColor = penColor;
        });

        pixel.addEventListener("mouseenter", (e) => {
            if (mouseDown) pixel.style.backgroundColor = penColor;
        });
        pixels.push(pixel);
    }
};

const attachGrid = () => {
    pixels.forEach((pixel) => {
        canvas.appendChild(pixel);
    });
};

const clearGrid = () => {
    pixels = [];
    canvas.children.array.forEach((child) => {
        console.log(child);
        // canvas.removeChild(child);
    });
};

// RUNS WHEN PAGE LOADS TO INITIATE GRID
generateGrid();
attachGrid();

document.addEventListener("mousedown", () => (mouseDown = true));
document.addEventListener("mouseup", () => (mouseDown = false));
