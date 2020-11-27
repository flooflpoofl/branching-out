class TreeDrawer {

    constructor(ctx) {
        this.ctx = ctx;
        this.cvsWidth = ctx.canvas.offsetWidth;
        this.cvsHeight = ctx.canvas.offsetHeight;
        
        this.tunerSettings = {};
        this.treeRandomizer = new TreeRandomizer(this.cvsWidth, this.cvsHeight);
    }

    drawTree() {

        // Clear canvas
        this.ctx.clearRect(0, 0, this.cvsWidth, this.cvsHeight);

        const x = this.cvsWidth/2;
        const y = this.cvsHeight;
        const trunkLength = this.treeRandomizer.randomTrunkLength();
        const trunkThickness = this.treeRandomizer.randomTrunkThickness(this.tunerSettings.treeThickness);

        // Draw first branch (the trunk)
        this.drawBranch(
            x + trunkThickness/2, x - trunkThickness/2, y,
            trunkLength, trunkThickness, 0
        );
    }

    drawBranch(x1, x2, y, branchLength, branchThickness, branchAngle) {

        this.ctx.beginPath();
        this.ctx.save();

        // Move to center of branch base
        this.ctx.translate( x2 + (x1-x2)/2, y );
        // Add base points
        this.ctx.moveTo( (x1-x2)/2, 0 );
        this.ctx.lineTo( -(x1-x2)/2, 0 );
        // Rotate
        this.ctx.rotate(branchAngle);
        // Add end points
        this.ctx.lineTo( -branchThickness/2, -branchLength );
        this.ctx.lineTo( branchThickness/2, -branchLength );

        this.ctx.closePath();

        // Draw
        //this.ctx.fillStyle = '#753B08';
        this.ctx.fillStyle = this.createTrunkGradient(x1, x2, '#753B08', '#331A03');
        this.ctx.fill();

        // Check if final branch
        if (branchThickness < 0.5) {
            // Create and draw a leaf
            this.drawLeaf(0, -branchLength);
            this.ctx.restore();

            return;
        }

        // Generate new branches

        // New branch to the right
        this.drawBranch(
            branchThickness/2, -branchThickness/2, -branchLength,
            this.treeRandomizer.randomBranchLength(branchLength),
            this.treeRandomizer.randomBranchThickness(branchThickness),
            this.treeRandomizer.randomBranchAngle(10, 40)
        );
        
        // New branch to the left
        this.drawBranch(
            branchThickness/2, -branchThickness/2, -branchLength,
            this.treeRandomizer.randomBranchLength(branchLength),
            this.treeRandomizer.randomBranchThickness(branchThickness),
            -this.treeRandomizer.randomBranchAngle(10, 40)
        );

        this.ctx.restore();
    }

    createTrunkGradient(x1, x2, color1, color2) {
        const trunkGradient = this.ctx.createLinearGradient((x1-x2)/2, 0, -(x1-x2)/2, 0);
        trunkGradient.addColorStop(0, color1);
        trunkGradient.addColorStop(1, color2);

        return trunkGradient;
    }

    drawLeaf(x, y) {

        const leafSize = this.treeRandomizer.randomLeafSize(this.tunerSettings.leafSize);

        this.ctx.beginPath();
        this.ctx.ellipse(
            x,
            y,
            leafSize,
            2*leafSize,
            0,
            0,
            2*Math.PI
        );

        this.ctx.fillStyle = this.treeRandomizer.randomLeafColor();
        this.ctx.fill();
    }
}