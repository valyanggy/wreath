//Source from Richard Bourne
//https://openprocessing.org/sketch/1789803

let vmin, vmax;
let cx, cy;
// let palette = ['#acec92', '#6cad53'];

function setup() {
    createCanvas(windowWidth-20, windowHeight);

    vmin = min(width, height);
    vmax = max(width, height);
    cx = width / 2;
    cy = height / 2;

    purple = color(33, 120, 166)
    bluish = color(125, 191, 115)
    cactus = color(148, 149, 71)
    greenish = color(64, 89, 71)
    brown = color(13, 38, 22)
    apricot = color(255, 187, 130)
    lavender = color(204, 204, 255)
    coral = color(255, 127, 80)
    paleBlueGreen = color(175, 238, 238)

    colors = [purple, bluish, greenish, cactus, brown, apricot, lavender, coral, paleBlueGreen];

    palette = shuffle(colors);

    //Apricot: (255, 187, 130)
    //Sky Blue: (0, 191, 255)
    //Lemon Yellow: (255, 255, 128)
    //Pale Orange: (255, 204, 153)
    //Peach: (255, 229, 180)
    //Lavender: (204, 204, 255)
    // Ivory White: (255, 255, 240)
    // Light Gray: (211, 211, 211)
    // Beige: (245, 245, 220)
    // Taupe: (139, 90, 43)
    // Pale Blue-Green: (175, 238, 238)
}

function leaf(x, y, d) {
    push(); {
        translate(x, y);
        rotate(PI / 2);

        let v0 = createVector(0, 0);
        let a1 = PI * (-0.5 - 0.2);
        // let r1 = d * 0.5;
        //the thickness of the leaves
        // let paramR = map(mouseX, 0, width, 0.005, 0.5);
        let paramR = map(mouseX, 0, width, 0.05, 1);
        let r1 = d * paramR;



        let v1 = createVector(
            v0.x + cos(a1) * r1,
            v0.y + sin(a1) * r1
        );


        let v3 = createVector(v0.x, v0.y - d);
        let a2 = PI * (0.5 + 0.2);
        let r2 = d * 0.5;

        let paramL = map(mouseY, 0, height, 1, 15);
        let v2 = createVector(
            v3.x + cos(a2) * r2,
            v3.y + paramL * sin(a2) * r2
        );


        beginShape();


        vertex(v0.x, v0.y);
        bezierVertex(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
        bezierVertex(-v2.x, v2.y, -v1.x, v1.y, v0.x, v0.y);
        //extra twig
        // bezierVertex(v2.x, v2.y, v0.x, v0.y, v2.x, v2.y);

        endShape();
        let cx = map(mouseX, 0, width, 100, 255);
        fill(cx, 50, 20);
        circle(v0.x, v0.y, 20);


    }
    pop();
}

function roseHip(x, y, d) {
    push(); {
        translate(x, y);
        rotate(PI / 2);

        let v0 = createVector(0, 0);
        let a1 = PI * (-0.5 - 0.2);
        // let r1 = d * 0.5;
        //the thickness of the leaves
        let paramR = map(mouseX, 0, width, 0.005, 0.5);
        let r1 = d * paramR;



        let v1 = createVector(
            v0.x + cos(a1) * r1,
            v0.y + sin(a1) * r1
        );


        let v3 = createVector(v0.x, v0.y - d);
        let a2 = PI * (0.5 + 0.2);
        let r2 = d * 0.35;
        let v2 = createVector(
            v3.x + cos(a2) * r2,
            v3.y + sin(a2) * r2
        );

        fill(33, 120, 166);
        circle(v0.x, v0.y, 20);


    }
    pop();

}




function leaves(x, y, h, steps, c) {
    stroke(0, 110, 0);
    strokeWeight(vmin * 0.001);

    push(); {
        translate(x, y);

        // let v0 = createVector(0, h / 2);
        //the length of twig
        let paramT = map(mouseY, 0, height, 0.1, 0.5)
        let v0 = createVector(0, h * paramT);


        let a1 = PI * (-0.5 - 0.1);
        //curveness of brance, 0.35 0.35
        let v1 = createVector(
            v0.x + cos(a1) * h * 0.3,
            v0.y + sin(a1) * h * 0.5
        );
        let v3 = createVector(0, -h / 2);
        let a2 = PI * (0.5 + 0.1);

        //0.35 0.35
        let v2 = createVector(
            v3.x + cos(a2) * h * 0.9,
            v3.y + sin(a2) * h * 0.5
        );
        noFill();
        //v1.x v1.y v2.x v2.y
        bezier(
            v0.x, v0.y,
            v2.x, v1.y,
            v1.x, v2.y,
            v3.x, v3.y
        );

        let px = 0;
        let py = 0;
        for (let i = 0; i <= steps; i++) {
            let t = i / steps;
            let x0 = bezierPoint(v0.x, v1.x, v2.x, v3.x, t);
            let y0 = bezierPoint(v0.y, v1.y, v2.y, v3.y, t);
            if (i > 0) {
                //PI*0.6
                let p = map(t, 0, 1, PI * 0.3, PI * 0.15);
                let a0 = atan2(y0 - py, x0 - px) + p;
                let a1 = atan2(y0 - py, x0 - px) - p;
                //ternary operator: shorthand conditional statement
                let a = i % 2 ? a0 : a1;
                let l = map(t, 0, 1, vmin * 0.02, 0);
                line(x0, y0, x0 + cos(a) * l, y0 + sin(a) * l);

                push(); {
                    translate(x0, y0);
                    rotate(a);

                    fill(c);
                    //0.4 0.2
                    leaf(l, 0, map(i, 1, steps, h * 0.4, h * 0.2));


                    // roseHip(l, 0, map(i, 1, steps, h * 4, h * 2));
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
    let sec = millis() / 1000;

    background(palette[0]);

    for (let i = 0; i < 8; i++) {
        //the scale
        // let r = map(i, 0, 6, 0.07, 0.55) * vmin;
        let r = map(mouseX, 0, width, 0.2, 0.55) * vmin;

        for (let j = 0; j < 5; j++) {
            let a = (j + i % 2 * 0.5) * (TWO_PI / 6) + sec * map(i, 0, 2, 0.1, 0.05);



            // let a = i * 137.5 + sec * map(i, 0, 2, 0.1, 0.05);
            var radius = 10 * sqrt(i);
            let x = cx + r * cos(a);
            let y = cy + r * sin(a);
            push();

            {
                translate(x, y);
                rotate(a + PI);
                scale(1.5 - i / 8);
                leaves(0, 0, r * 0.8, 3 + i * 2, palette[3]);
            }
            pop();

            fill(255);
            textFont("Nanum");
            text("(" + r + ", " + palette[0] + ")", mouseX, mouseY);
        }
    }


}

// save jpg
let lapse = 0; // mouse timer
function mousePressed() {
    if (millis() - lapse > 400) {
        save("img_" + month() + '-' + day() + '_' + hour() + '-' + minute() + '-' + second() + ".jpg");
        lapse = millis();
    }
}