let vmin, vmax;
let cx, cy;
let palette = ['#acec92', '#6cad53'];



function setup() {
  createCanvas(windowWidth, windowHeight);

  vmin = min(width, height);
  vmax = max(width, height);
  cx = width / 2;
  cy = height / 2;

  purple = color(33,120,166)
  bluish = color(125, 191, 115)
  cactus= color(148, 149, 71)
  greenish = color(64, 89, 71)
  brown = color(13, 38, 22)

  colors = [purple, bluish, greenish, cactus, brown];

  palette = shuffle(colors);
}

function leaf(x, y, d) {
  push();
  {
    translate(x, y);
    rotate(PI / 2);

    let v0 = createVector(0, 0);
    let a1 = PI * (-0.5 - 0.2);
    //the thickness of the leaves
    let paramR = map(mouseX, 0 , width, 0.05, 10);
    let r1 = d * paramR;


    let v1 = createVector(
      v0.x + 0.5* cos(a1) * r1,
      v0.y + 0.5* sin(a1) * r1
    );


    let v3 = createVector(v0.x, v0.y - d);
    let a2 = PI * (0.5 + 0.2);
    let r2 = d * 0.35;
    let v2 = createVector(
      v3.x + cos(a2) * r2,
      v3.y + sin(a2) * r2
    );
    // let t = map(mouseX, 0, width, -5, 5);
    // curveTightness(t); ==>only works for curveVertex
    // console.log(t);

    beginShape();
    vertex(v0.x, v0.y);
    bezierVertex(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
    //symmetrical leaves
    bezierVertex(-v2.x, v2.y, -v1.x, v1.y, v0.x, v0.y);
    bezierVertex(v2.x, v2.y, v0.x, v0.y, v2.x, v2.y);
    // bezierVertex(v1.x, v2.y, v2.x, v2.y, v3.x, v3.y);
    endShape();
  }
  pop();
}

function leaves(x, y, h, steps, c) {
  stroke(208,21);
  strokeWeight(vmin * 0.005);

  push();
  {
    translate(x, y);

    //the length of twig
    let paramT = map(mouseY, 0, height, 0.5,5)
    let v0 = createVector(0, h * paramT);
    let a1 = PI * (-0.5 - 0.1);
    let v1 = createVector(
      v0.x + cos(a1) * h * 0.5,
      v0.y + sin(a1) * h * 0.5
    );
    let v3 = createVector(0, -h / 2);
    let a2 = PI * (0.5 + 0.1);
    let v2 = createVector(
      v3.x + 0.01 * cos(a2) * h * 0.9,
      v3.y + 0.01 * sin(a2) * h * 0.5
    );
    noFill();
    // curveTightness(1);
    bezier(
      v0.x, v0.y,
      v1.x, v1.y,
      v2.x, v2.y,
      v3.x, v3.y
    );

    let px = 0;
    let py = 0;
    for (let i = 0; i <= steps; i++) {
      let t = i / steps;
      let x0 = bezierPoint(v0.x, v1.x, v2.x, v3.x, t);
      let y0 = bezierPoint(v0.y, v1.y, v2.y, v3.y, t);
      if (i > 0) {
        let p = map(t, 0, 1, PI * 0.6, PI * 0.15);
        let a0 = atan2(y0 - py, x0 - px) + p;
        let a1 = atan2(y0 - py, x0 - px) - p;
        let a = i % 2 ? a0 : a1;
        let l = map(t, 0, 1, vmin * 0.02, 0);
        bezier(x0, y0, x0 + cos(a) * l, y0 + sin(a) * l);

        push();
        {
          translate(x0, y0);
          rotate(a);

          fill(c);
          
          leaf(l, 0, map(i, 1, steps, h * 0.5, h * 0.9));
          // fill(palette);
          // circle(l, 0, 20);
        }
        pop();
      }
      px = x0;
      py = y0;
    }
  }
  pop();
}







function draw() {
  let sec = millis() / 2000;
  // palette = shuffle(palette);

  background(palette[0]);

  // let angle = i * 137.5;
  // let radius = c * sqrt(i);
  
  // let x = radius * cos(angle) + width/2;
  // let y = radius * sin(angle) + height/2
  

  

  for (let i = 0; i < 10; i++) {
    //the steps between each graphic
    let r = map(mouseX, 0, width, 0.1, 0.8) * vmin;
    for (let j = 0; j < 9; j++) {
       let a = (j + i % 2 * 0.5) * (TWO_PI / 6) + sec * map(i, 0, 2, 0.1, 0.05);
      // let a = i*137.5;
      // var r = 6 * sqrt(i);
      let x = cx + cos(a) * r;
      let y = cy + sin(a) * r;
      push();

      {
        translate(x, y);
        rotate(a + PI);
        scale(1.5 - i / 8);
        leaves(0, 0, r * 0.48, 3 + i * 2, palette[2]);
      }
      pop();
    }
  }
}

// save jpg
let lapse = 0;    // mouse timer
function mousePressed() {
  if (millis() - lapse > 400) {
    save("img_" + month() + '-' + day() + '_' + hour() + '-' + minute() + '-' + second() + ".jpg");
    lapse = millis();
  }
}