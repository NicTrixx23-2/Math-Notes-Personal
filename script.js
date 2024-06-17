document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('canvas');
    const signaturePad = new SignaturePad(canvas);

    document.getElementById('clear').addEventListener('click', function() {
        signaturePad.clear();
    });

    document.getElementById('convert').addEventListener('click', async function() {
        const imageData = signaturePad.toDataURL();
        
        // Log the imageData for now (you can replace this with actual API integration)
        console.log(imageData);
        
        // Example LaTeX output (replace with actual API response)
        const exampleLatex = "\\frac{d}{dx}f(x) = \\lim_{{h \\to 0}} \\frac{f(x+h) - f(x)}{h}";
        document.getElementById('latex-output').innerText = exampleLatex;
        MathJax.typesetPromise();
    });

    // Ensure the canvas resizes properly for touch devices
    function resizeCanvas() {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
});
