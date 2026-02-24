class Player {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.s = speed ?? 1.2;
  }

  updateInput() {
    const dx =
      (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) -
      (keyIsDown(LEFT_ARROW) || keyIsDown(65));

    const dy =
      (keyIsDown(DOWN_ARROW) || keyIsDown(83)) -
      (keyIsDown(UP_ARROW) || keyIsDown(87));

    const len = max(1, abs(dx) + abs(dy));
    this.x += (dx / len) * this.s;
    this.y += (dy / len) * this.s;
  }

  draw() {
    noStroke();
    fill(120, 170, 255, 180);
    ellipse(this.x, this.y, 28, 28);
  }
}
