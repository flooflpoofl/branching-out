class TreeRandomizer {

    constructor(cvsWidth, cvsHeight) {
        this.cvsWidth = cvsWidth;
        this.cvsHeight = cvsHeight;

        this.blueprint = {
            trunk: {
                length: {
                    min: this.cvsHeight/5,
                    max: this.cvsHeight/4
                },
                thickness: {
                    min: this.cvsWidth/60,
                    max: this.cvsWidth/8
                }
            },
            leaves: {
                size: {
                    min: this.cvsHeight/200,
                    max: this.cvsHeight/60
                }
            }
        };

    }

    randomTrunkThickness(trunkThicknessTunerFactor) {
        return trunkThicknessTunerFactor * this.blueprint.trunk.thickness.max + this.blueprint.trunk.thickness.min;
    }

    randomTrunkLength() {
        return Math.random() * (this.blueprint.trunk.length.max - this.blueprint.trunk.length.min) + this.blueprint.trunk.length.min;
    }

    randomBranchLength(previousBranchLength) {
        return (Math.random() * (0.79 - 0.55) + 0.55) * previousBranchLength;
    }

    randomBranchThickness(previousBranchThickness) {
        return (Math.random() * (0.7 - 0.55) + 0.55) * previousBranchThickness;
    }

    randomBranchAngle(minDeg, maxDeg) {

        const minAngleRad = minDeg * Math.PI/180;
        const maxAngleRad = maxDeg * Math.PI/180;
        
        return (this.skewedRandom(1/2) * (maxAngleRad - minAngleRad) + minAngleRad);
    }

    randomLeafSize(leafSizeTunerFactor) {
        return leafSizeTunerFactor * this.blueprint.leaves.size.max + this.blueprint.leaves.size.min;
    }

    randomLeafColor() {
        const minSaturation = 50;
        const maxSaturation = 100;
        const randSaturation = Math.random() * (maxSaturation - minSaturation) + minSaturation;

        return `hsla(120deg, ${randSaturation}%, 25%)`;
    }

    skewedRandom(skewFactor) {
        return Math.pow(Math.random(), skewFactor);
    }

}