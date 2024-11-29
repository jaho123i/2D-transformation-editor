var imgA;
var imgB;

function setup() {
    createCanvas(512, 512);
    background(255);
  
    shiftX_slider = createSlider(-10, 10, 0);
    shiftX_slider.position(550, 40);
    shiftX_slider.size(80);
    createP('Shitf X: ').position(550, 0);
    shiftY_slider = createSlider(-10, 10, 0);
    shiftY_slider.position(650, 40);
    shiftY_slider.size(80);
    createP('Shitf Y: ').position(650, 0);
  
    scaleX_slider = createSlider(0.5, 2, 1, 0.1);
    scaleX_slider.position(550, 120);
    scaleX_slider.size(80);
    createP('Scale X: ').position(550, 80);
    scaleY_slider = createSlider(0.5, 2, 1, 0.1);
    scaleY_slider.position(650, 120);
    scaleY_slider.size(80);
    createP('Scale Y: ').position(650, 80);
  
    rotate_slider = createSlider(0, 360, 0);
    rotate_slider.position(600, 200);
    rotate_slider.size(80);
    createP('Rotate: ').position(620, 160);
  
    shearX_slider = createSlider(-10, 10, 0);
    shearX_slider.position(550, 280);
    shearX_slider.size(80);
    createP('Shear X: ').position(550, 240);
    shearY_slider = createSlider(-10, 10, 0);
    shearY_slider.position(650, 280);
    shearY_slider.size(80);
    createP('Shear Y: ').position(650, 240);
  
    imgA = createImage(512, 512);
    imgB = createImage(512, 512);
    imgA.loadPixels();
    imgB.loadPixels();
    var d = pixelDensity();
    for (var i = 0; i < 512 * 512 * 4 * d; i += 4) {
        imgA.pixels[i] = 240;
        imgA.pixels[i + 1] = 250;
        imgA.pixels[i + 2] = 240;
        imgA.pixels[i + 3] = 255;
        imgB.pixels[i] = 240;
        imgB.pixels[i + 1] = 240;
        imgB.pixels[i + 2] = 250;
        imgB.pixels[i + 3] = 255;
    }
    imgA.updatePixels();
    imgB.updatePixels();
}

function draw() {
    if (!keyIsDown(32)) {
        image(imgA, 0, 0);
        text('Image A', 10, 20);
    } else {
        image(imgB, 0, 0);
        text('Image B', 10, 20);
    }
}

function makeVector(x, y) {
    return [x, y, 1];
}

function makeIdentity() {
    return [[1,0,0],[0,1,0],[0,0,1]]
}

function makeShift(tx,ty) {
    return [[1,0,tx],[0,1,ty],[0,0,1]]
}

function makeScale(sx,sy) {
    return [[sx,0,0],[0,sy,0],[0,0,1]]
}

function makeRotate(a) {
    a = (a/180)*Math.PI
    return [[Math.cos(a),-Math.sin(a),0],[Math.sin(a),Math.cos(a),0],[0,0,1]]
}

function makeShear(Shx,Shy) {
    return [[1,Shx,0],[Shy,1,0],[0,0,1]]
}

function drawVector(img, vec) {
    img.loadPixels();
    img.set(vec[0], vec[1], 0);
    img.updatePixels();
}

function mouseDragged() {
    if (mouseX <= height & mouseY <= width) {
        v = makeVector(mouseX, mouseY);
    drawVector(imgA, v);

    combined = combine(combine(combine(
        makeShift(shiftX_slider.value(), shiftY_slider.value()),
        makeScale(scaleX_slider.value(), scaleY_slider.value())),
        makeRotate(rotate_slider.value())),
        makeShear(shearX_slider.value(),shearY_slider.value()));
  
    print(v);
    print(transform(combine(
        makeIdentity(),
        makeScale(1, 1)), [10,10,10]));
    print(transform(combined, [10,10,10]));
  
    drawVector(imgB, transform(combined, v));
    
    //drawVector(imgB, transform(makeRotate(90), v));
  
    //drawVector(imgB, transform(combine(makeShift(0, -20),makeScale(0.2, 0.2)), v));
    }
}

function transform(matrix, vector) {
    value = [0, 0, 0];
    for (i = 0; i < 3; ++i) {
        for (j = 0; j < 3; ++j) {
            value[i] += matrix[i][j] * vector[j];
        }
    }
    return value;
}

function combine(mx1, mx2) {
    value = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    for (i = 0; i < 3; ++i) {
        for (j = 0; j < 3; ++j) {
            value[i][j] = mx1[i][j] * mx2[i][j];
        }
    }
    return value;
}
