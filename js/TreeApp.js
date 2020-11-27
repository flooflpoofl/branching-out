class TreeApp {

    constructor() {
        this.cvs = document.getElementById('tree-canvas');
        this.setupCanvas();

        this.treeDrawer = new TreeDrawer(this.cvs.getContext('2d'));

        this.tuners = document.getElementsByClassName('tuner');
        this.setupTuners();

        this.drawButton = document.getElementById('draw-button');
        this.setupDrawButton();

        this.saveButton = document.getElementById('save-button');
        this.setupSaveButton();

        // Draw the first tree
        this.treeDrawer.drawTree(this.tunerSettings);
    }

    setupCanvas() {
        // Scale canvas by pixel ratio
        this.cvs.width = devicePixelRatio * this.cvs.offsetWidth;
        this.cvs.height = devicePixelRatio * this.cvs.offsetHeight;
        // Scale context by pixel ratio
        const ctx = this.cvs.getContext('2d');
        ctx.scale(devicePixelRatio, devicePixelRatio);
    }

    setupTuners() {

        for (let i = 0; i < this.tuners.length; i++) {
            const tuner = this.tuners[i];
            tuner.addEventListener('change', e => this.onTunerChange(e));
            this.treeDrawer.tunerSettings[tuner.name] = tuner.value;
        }
    }

    onTunerChange(event) {
        this.treeDrawer.tunerSettings[event.target.name] = event.target.value;
    }

    setupDrawButton() {
        this.drawButton.addEventListener('click', e => this.onDrawButtonClick(e));
    }

    onDrawButtonClick(event) {
        this.treeDrawer.drawTree(this.tunerSettings);
    }

    setupSaveButton() {
        this.saveButton.addEventListener('click', e => this.onSaveButtonClick(e));
    }

    onSaveButtonClick(event) {

        // Create and add an anchor element to simulate click on
        const a = document.createElement('a');
        document.body.appendChild(a);

        a.href = this.treeDrawer.ctx.canvas.toDataURL();
        a.download = 'tree.png'; // file name
        a.click();
        
        // Remove the anchor element when done
        document.body.removeChild(a);
    }


}