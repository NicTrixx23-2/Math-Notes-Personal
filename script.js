document.addEventListener("DOMContentLoaded", function() {
    const canvasElement = document.getElementById('canvas');
    const clearButton = document.getElementById('clear');
    const convertButton = document.getElementById('convert');
    const latexOutput = document.getElementById('latex-output');
    const drawingColor = '#ff0000'; // Set your desired drawing color here

    // Initialize Fabric.js canvas
    const fabricCanvas = new fabric.Canvas('canvas', {
        isDrawingMode: true
    });

    // Set initial canvas size
    resizeCanvas();

    // Set drawing color and brush width
    fabricCanvas.freeDrawingBrush.color = drawingColor;
    fabricCanvas.freeDrawingBrush.width = 5;

    // Clear the canvas
    clearButton.addEventListener('click', function() {
        fabricCanvas.clear();
        fabricCanvas.backgroundColor = 'white'; // Preserve background color
        fabricCanvas.renderAll();
    });

    // Convert the drawing to LaTeX
    convertButton.addEventListener('click', async function() {
        if (fabricCanvas.isEmpty()) {
            alert("Please draw something first.");
            return;
        }

        const imageData = fabricCanvas.toDataURL();

        // Log the imageData for now (you can replace this with actual API integration)
        console.log(imageData);

        // Example LaTeX output (replace with actual API response)
        const exampleLatex = "\\frac{d}{dx}f(x) = \\lim_{{h \\to 0}} \\frac{f(x+h) - f(x)}{h}";
        latexOutput.innerText = exampleLatex;
        MathJax.typesetPromise();
    });

    // Ensure the canvas resizes properly for touch devices
    function resizeCanvas() {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const container = canvasElement.parentElement;
        canvasElement.width = container.offsetWidth * ratio;
        canvasElement.height = container.offsetHeight * ratio;
        fabricCanvas.setWidth(container.offsetWidth * ratio);
        fabricCanvas.setHeight(container.offsetHeight * ratio);
        fabricCanvas.scale(ratio);
        fabricCanvas.clear();
        fabricCanvas.backgroundColor = 'white'; // Set initial background color
        fabricCanvas.renderAll();
    }

    // Handle window resize events
    window.addEventListener("resize", resizeCanvas);

    // Initial resize of the canvas
    resizeCanvas();

    // Prevent scrolling on touch devices when interacting with the canvas
    canvasElement.style.touchAction = 'none';
    canvasElement.addEventListener("touchstart", function(event) {
        event.preventDefault();
    });
    canvasElement.addEventListener("touchmove", function(event) {
        event.preventDefault();
    });
    canvasElement.addEventListener("touchend", function(event) {
        event.preventDefault();
    });
});
