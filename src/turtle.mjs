let proto = {
    translate() {
        this.x += this.step * Math.cos(this.alpha);
        this.y += this.step * Math.sin(this.alpha);
        this.minX = Math.min(this.minX, this.x);
        this.maxX = Math.max(this.maxX, this.x);
        this.minY = Math.min(this.minY, this.y);
        this.maxY = Math.max(this.maxY, this.y);
    },
    rotate(factor) {
        this.alpha += factor * this.theta;
    },
    pushStack() {
        this.stack.push({x: this.x, y: this.y, alpha: this.alpha});
    },
    popStack() {
        ({x: this.x, y: this.y, alpha: this.alpha} = this.stack.pop());
    },
    getDrawingRect() {
        let minX = Math.floor(this.minX);
        let minY = Math.floor(this.minY);
        let maxX = Math.ceil(this.maxX);
        let maxY = Math.ceil(this.maxY);
        return {minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY};
    }
};

export function createTurtle({x, y, step, alpha, theta}) {
    let turtle = Object.create(proto);
    turtle.stack = [];
    turtle.x = turtle.minX = turtle.maxX = x;
    turtle.y = turtle.minY = turtle.maxY = y;
    turtle.step = step;
    turtle.alpha = -alpha; // negate since Y axis is inverted
    turtle.theta = theta;
    return turtle;
}
