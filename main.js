var status;
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    back_camera = {
        video: {
            facingMode: {
                exact: "environment"
            }
        }
    };
    video = createCapture(back_camera);
    video.size(380, 380)
    video.hide();

    document.getElementById('status').innerHTML = 'Detecting Objects...'

    object_detector = ml5.objectDetector('cocossd', model_loaded);
}

function preload() {
    //  image_object = loadImage('dog_cat.jpg');
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status != '') {
        object_detector.detect(video, got_results);
        random_colorr = Math.floor(Math.random() * 255);
        random_colorg = Math.floor(Math.random() * 255);
        random_colorb = Math.floor(Math.random() * 255);
        for (i = 0; i < objects.length; i++) {

            document.getElementById('status').innerHTML = 'Objects detected!';
            percent = floor(objects[i].confidence * 100);

            fill(random_colorr, random_colorg, random_colorb);
            textSize(20);
            strokeWeight(1);
            text(`${objects[i].label} ${percent}%`, objects[i].x, objects[i].y + 5);
            noFill();
            stroke(random_colorr, random_colorg, random_colorb);
            strokeWeight(5);
            rect(objects[i].x - 25, objects[i].y - 20, objects[i].width, objects[i].height);

        }
    }

}

function model_loaded() {
    console.log('Model Loaded!');
    status = true;

}

function got_results(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}