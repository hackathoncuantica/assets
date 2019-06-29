document.addEventListener('DOMContentLoaded', function(){

    let width = 500;
    let height = 500;
    let interval_time = 200;
    let freq_range = [82,329];
    let light_threshold = 127;
    let column_threshold = 30;

    let c_major = [130.81,146.83,164.81,174.61,196.00,220.00,246.94];

    // create web audio api context
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();


    function playNote(frequency, duration, callback) {
        // create Oscillator node
        let oscillator = audioCtx.createOscillator();

        oscillator.type = 'square';
        oscillator.frequency.value = frequency; // value in hertz
        oscillator.connect(audioCtx.destination);
        // oscillator.onended = callback;
        oscillator.start(0);
        oscillator.stop(audioCtx.currentTime + duration);
    }


    let freq_scale = d3.scaleQuantize().domain([1,height+1]).range(c_major);

    console.log("FREQ SCALE", freq_scale, freq_scale(1), freq_scale(501));

    for(let i=0;i<500; i++){
        console.log(i,freq_scale(i));
    }

    let img = new Image();
    img.src = "img/flagship_lss.png";

    let floater = document.getElementById("floater");

    img.onload = function() {

        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        let button = document.getElementById("button");

        let stop = document.getElementById("stop");

        let interval = null;

        stop.addEventListener("click", () => {

            console.log("CLICKED STOP");
            if(interval) {
                clearInterval(interval);
                interval = null;
            }
        });

        button.addEventListener("click", () => {

            if(!(interval)) {

                let column = 0;

                let sonify_column = () => {

                    floater.style["margin-left"] = 8 + column + "px";

                    let column_data_num = 0;
                    let column_denom = 1;
                    let column_average = [];

                    for (let y = 0; y < height; y++) {
                        let pixel = ctx.getImageData(column, y, 1, 1).data;

                        let pixel_light = (pixel[0] + pixel[1] + pixel[2]) / 3;

                        if(pixel_light>light_threshold) {

                            column_data_num += y * pixel_light;
                            column_denom += pixel_light;

                            column_average.push(pixel_light);

                        }


                    }

                    let column_frequency = freq_scale(column_data_num/column_denom);

                    column_average = d3.mean(column_average);

                    if(column_average>column_threshold) {

                        playSound("sine", column_frequency, interval_time / 1000);
                    }

                    if (column >= width) {
                        clearInterval(interval);
                        interval = null;
                    }
                    else {
                        column++;
                    }

                };

                interval = setInterval(sonify_column, interval_time);
            }
        });

    };

}, false);