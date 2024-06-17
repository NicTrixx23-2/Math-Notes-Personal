document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const clearButton = document.getElementById('clear');
    const convertButton = document.getElementById('convert');
    const latexOutput = document.getElementById('latex-output');
    let drawing = false;

    function startDrawing(event) {
        drawing = true;
        draw(event);
    }

    function endDrawing() {
        drawing = false;
        ctx.beginPath();
    }

    function draw(event) {
        if (!drawing) return;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#ff0000'; // Set your desired drawing color here

        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('touchstart', (event) => {
        const touch = event.touches[0];
        startDrawing(touch);
        event.preventDefault();
    });

    canvas.addEventListener('touchend', (event) => {
        endDrawing();
        event.preventDefault();
    });

    canvas.addEventListener('touchmove', (event) => {
        const touch = event.touches[0];
        draw(touch);
        event.preventDefault();
    });

    clearButton.addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    convertButton.addEventListener('click', function() {
        if (ctx.canvas.toDataURL() === ctx.canvas.toDataURL('image/png', 0.0)) {
            alert("Please draw something first.");
            return;
        }

        const imageData = canvas.toDataURL();
        console.log(imageData);

        const exampleLatex = "\\frac{d}{dx}f(x) = \\lim_{{h \\to 0}} \\frac{f(x+h) - f(x)}{h}";
        latexOutput.innerText = exampleLatex;
        MathJax.typesetPromise();
    });
});
