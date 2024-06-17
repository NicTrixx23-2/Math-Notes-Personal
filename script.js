document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('canvas');
    const signaturePad = new SignaturePad(canvas);
    const clearButton = document.getElementById('clear');
    const convertButton = document.getElementById('convert');
    const latexOutput = document.getElementById('latex-output');

    // Clear the canvas
    clearButton.addEventListener('click', function() {
        signaturePad.clear();
    });

    // Convert the drawing to LaTeX
    convertButton.addEventListener('click', async function() {
        if (signaturePad.isEmpty()) {
            alert("Please draw something first.");
            return;
        }

        const imageData = signaturePad.toDataURL();

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
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
        signaturePad.clear(); // Clears the canvas after resizing to avoid misalignment issues
    }

    // Handle window resize events
    window.addEventListener("resize", resizeCanvas);

    // Initial resize of the canvas
    resizeCanvas();

    // Prevent scrolling on touch devices when interacting with the canvas
    canvas.style.touchAction = 'none';
    canvas.addEventListener("touchstart", function(event) {
        event.preventDefault();
    });
    canvas.addEventListener("touchmove", function(event) {
        event.preventDefault();
    });
    canvas.addEventListener("touchend", function(event) {
        event.preventDefault();
    });
});
