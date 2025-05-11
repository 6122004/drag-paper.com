let highestZ = 1;

class Paper {
    constructor(element) {
        this.paper = element; // Store the DOM element here
        this.holdingPaper = false;
        this.preMouseX = 0;
        this.preMouseY = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.currentPaperX = 0;
        this.currentPaperY = 0;

        this.init(); // Call init after setting up the element
    }

    init() {
        this.paper.addEventListener('mousedown', (e) => {
            this.holdingPaper = true;
            this.paper.style.zIndex = highestZ++;
            this.preMouseX = e.clientX;
            this.preMouseY = e.clientY;
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.holdingPaper) return;

            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            this.velocityX = this.mouseX - this.preMouseX;
            this.velocityY = this.mouseY - this.preMouseY;

            this.currentPaperX += this.velocityX;
            this.currentPaperY += this.velocityY;

            this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;

            this.preMouseX = this.mouseX;
            this.preMouseY = this.mouseY;
        });

        window.addEventListener('mouseup', () => {
            this.holdingPaper = false;
        });
    }
}

// Query all elements with the 'paper' class
const papers = Array.from(document.querySelectorAll('.paper'));

// Instantiate a Paper for each DOM element
papers.forEach(paperEl => {
    new Paper(paperEl);
});
