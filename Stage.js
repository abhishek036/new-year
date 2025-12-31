/**
 * Stage.js Shim
 * Minimally mimics the Stage class used by Caleb Miller's fireworks.
 */
class Stage {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.listeners = { ticker: [], resize: [] };
        this.dpr = window.devicePixelRatio || 1;

        // Initial setup
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());

        // Start Loop
        let lastTime = 0;
        const loop = (time) => {
            const diff = time - lastTime;
            lastTime = time;

            if (this.listeners.ticker) {
                this.listeners.ticker.forEach(cb => cb(diff));
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame((t) => { lastTime = t; loop(t); });
    }

    addEventListener(evt, cb) {
        if (!this.listeners[evt]) this.listeners[evt] = [];
        this.listeners[evt].push(cb);
    }

    handleResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.dpr = window.devicePixelRatio || 1;

        // Set canvas resolution
        this.canvas.width = this.width * this.dpr;
        this.canvas.height = this.height * this.dpr;

        // Set visible size
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';

        // Scale context
        this.ctx.scale(this.dpr, this.dpr);

        if (this.listeners.resize) {
            this.listeners.resize.forEach(cb => cb());
        }
    }
}
