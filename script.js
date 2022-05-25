// DOM ELEMENTS
const canvas = document.querySelector(".canvas");

const colorInput = document.querySelector("#color");
const colorShower = document.querySelector(".color-picker");

const checkboxInput = document.querySelector("#show-grid");
const checkboxShow = document.querySelector(".check");
const checkboxTick = document.querySelector(".tick");

const sizeDownBtn = document.querySelector(".minus");
const sizeUpBtn = document.querySelector(".plus");
const sizeShow = document.querySelector(".size-show");

const penButton = document.querySelector(".pen");
const rubberButton = document.querySelector(".rubber");
const resetButton = document.querySelector(".reset");

// VARIABLES
let mouseDown = false;
let penColor = "";
let currPenColor = "#bbb";
let rubberColor = "#fff";
let erasing = false;
let borderOn = false;

// REPRESENTS GRID SIZE, DEFUALT 16X16
let dimensionChoices = [3, 4, 8, 9, 16, 32, 64];
let currChoiceIndex = 4;

const getDimension = () => dimensionChoices[currChoiceIndex];
// SETTING GRID DIMENSIONS
canvas.style.setProperty(
    "grid-template-columns",
    `repeat(${getDimension()}, 1fr)`
);

const generateGrid = () => {
    canvas.replaceChildren();
    canvas.style.setProperty(
        "grid-template-columns",
        `repeat(${getDimension()}, 1fr)`
    );
    for (let i = 0; i < getDimension() ** 2; i++) {
        let pixel = document.createElement("div");
        pixel.classList.add("pixel");
        if (borderOn) pixel.classList.add("pixel-grid");
        pixel.addEventListener("mousedown", (e) => {
            penColor = erasing ? rubberColor : currPenColor;
            pixel.style.backgroundColor = penColor;
        });

        pixel.addEventListener("mouseenter", (e) => {
            penColor = erasing ? rubberColor : currPenColor;
            if (mouseDown) pixel.style.backgroundColor = penColor;
        });
        canvas.appendChild(pixel);
    }
};

// RUNS WHEN PAGE LOADS TO INITIATE GRID
generateGrid();

document.addEventListener("mousedown", () => (mouseDown = true));
document.addEventListener("mouseup", () => (mouseDown = false));

// CHANGES PEN COLOR
colorInput.addEventListener("input", (e) => {
    currPenColor = e.target.value;
    colorShower.style.setProperty("background-color", e.target.value);
});

checkboxInput.addEventListener("change", (e) => {
    borderOn = !borderOn;
    checkboxShow.classList.toggle("check-active");
    checkboxTick.classList.toggle("hide");
    canvas.childNodes.forEach((pixel) => {
        pixel.classList.toggle("pixel-grid");
    });
});

const adjustGridSize = (increment) => {
    let proposedIndex = currChoiceIndex + increment;
    if (dimensionChoices.length <= proposedIndex || proposedIndex < 0) return;
    else currChoiceIndex = proposedIndex;
    sizeShow.innerText = `${getDimension()}x${getDimension()}`;
    generateGrid();
};

sizeDownBtn.addEventListener("click", () => adjustGridSize(-1));
sizeUpBtn.addEventListener("click", () => adjustGridSize(1));

const toggleErasings = () => {
    erasing = !erasing;
    penButton.classList.toggle("active");
    rubberButton.classList.toggle("active");
};

penButton.addEventListener("click", () => {
    if (erasing) {
        toggleErasings();
    }
});

rubberButton.addEventListener("click", () => {
    if (!erasing) {
        toggleErasings();
    }
});

resetButton.addEventListener("click", () => {
    canvas.childNodes.forEach((pixel) => {
        pixel.style.setProperty("background-color", "#fff");
    });
});
