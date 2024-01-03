export class Turtle {
    constructor({x, y, step, alpha, theta}) {
        this.stack = [];
        this.x = this.minX = this.maxX = x;
        this.y = this.minY = this.maxY = y;
        this.step = step;
        this.alpha = -alpha; // negate since Y axis is inverted
        this.theta = theta;
    }

    translate(stepCount = 1) {
        this.x += stepCount * this.step * Math.cos(this.alpha);
        this.y += stepCount * this.step * Math.sin(this.alpha);
        this.minX = Math.min(this.minX, this.x);
        this.maxX = Math.max(this.maxX, this.x);
        this.minY = Math.min(this.minY, this.y);
        this.maxY = Math.max(this.maxY, this.y);
    }

    rotate(factor) {
        this.alpha += factor * this.theta;
    }

    reverse(repeatCount = 1) {
        this.alpha += (repeatCount % 2) * Math.PI;
    }

    pushStack(repeatCount = 1) {
        for (; repeatCount > 0; repeatCount--) {
            this.stack.push({x: this.x, y: this.y, alpha: this.alpha});
        }
    }

    popStack(repeatCount) {
        for (; repeatCount > 0; repeatCount--) {
            ({x: this.x, y: this.y, alpha: this.alpha} = this.stack.pop());
        }
    }

    getDrawingRect() {
        let minX = Math.floor(this.minX);
        let minY = Math.floor(this.minY);
        let maxX = Math.ceil(this.maxX);
        let maxY = Math.ceil(this.maxY);
        return {minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY};
    }
}
