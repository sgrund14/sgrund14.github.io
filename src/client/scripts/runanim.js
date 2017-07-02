window.onload = function () {
    // array containing top canvas, bottom canvas
    var mypapers = [];
    var colors = {
        yellow: 'yellow',
        darkblue: '#000251',
        lightgreen: '#93ff99',
        lightergrey: '#eaeaea',
        lightblue: '#e5e6ff',
        darkred: '#6b0000',
        darkgrey: '#3a3a3a',
        lightgrey: 'lightgrey'
    };

    // runs animation. id refers to which canvas paper runs on: 0 for top, 1 for bottom.
    // canvasElement is the canvas to draw on
    var anim = function (id, canvasElement) {
        mypapers[id] = new paper.PaperScope();
        paper = mypapers[id];
        paper.setup(canvasElement);

        var count;
        var speed = 8;

        // more circles on bottom canvas, less on top.
        id === 0 ?
            count = 20 : count = 50;
        var path;

        var createCircle = function () {

            // intialize original circle object, which will create symbols of later
            path = new paper.Path.Circle({
                center: [0, 0],
                radius: 10,
                fillColor: 'yellow'
            });

            // initialize circle colors: yellow for top canvas, grey for bottom
            id === 0 ? path.fillColor = colors.yellow : path.fillColor = colors.lightgrey;

            // Create a symbol, which we will use to place instances of later:
            var symbol = new paper.Symbol(path);

            // Place the instances of the symbol:
            for (var i = 0; i < count; i++) {
                // The center position is a random point in the view:
                var rand = paper.Point.random();
                var centX = rand.x * paper.view.size.width;
                var centY = rand.y * paper.view.size.height;
                var center = new paper.Point(centX, centY);

                var placedSymbol = symbol.place(center);

                placedSymbol.setPosition(center);

                // larger circles on top canvas, smaller circles on bottom
                if (id === 0) {
                    placedSymbol.scale(paper.view.size.width / 300 * i / count);
                } else {
                    placedSymbol.scale(paper.view.size.width / 600 * i / count);
                }
            }
        }
        createCircle();

        // function to change circle colors on screen change
        var colorChange = function (color) {
            fade(path.fillColor, color, 125);
        }


        // helper function for smooth color transition
        // lerp and fade functions adapted from: 
        // http://stackoverflow.com/questions/11292649/javascript-color-animation
        function lerp(val1, val2, rate) {
            return (1 - rate) * val1 + rate * val2;
        };

        // smoothly transition from start color to end color over duration
        function fade(start, end, duration) {
            var endColor = new paper.Color(end);

            var interval = 10;
            var steps = duration / interval;
            var step_u = 1.0 / steps;
            var u = 0.0;
            speed = .05;
            var theInterval = setInterval(function () {
                if (u >= 1.0) {
                    speed = 8;
                    clearInterval(theInterval);
                }
                var r = parseFloat(lerp(start.red, endColor.red, u));
                var g = parseFloat(lerp(start.green, endColor.green, u));
                var b = parseFloat(lerp(start.blue, endColor.blue, u));
                var colorname = new paper.Color(r, g, b);
                path.fillColor = colorname;
                u += step_u;
            }, interval);
        };

        var update = function (id) {
            return function () {
                var count;
                id === 0 ? count = topAnim.count : count = bottomAnim.count;
                for (var i = 0; i < count; i++) {
                    var item = mypapers[id].project.activeLayer.children[i];

                    // move circles according to size, speed constant. 
                    // use sin and cos functions to give movement a less static feel
                    if (id === 0) {
                        item.position.x += Math.sin(item.bounds.width) / speed;
                        item.position.y += Math.cos(item.bounds.height) / speed;
                    } else {
                        item.position.x -= Math.sin(item.bounds.width) / speed;
                        item.position.y -= Math.cos(item.bounds.height) / speed;
                    }

                    // wrap screen edges
                    if (item.bounds.left > mypapers[id].view.size.width) {
                        item.position.x -= mypapers[id].view.size.width + item.bounds.width
                    } else if (item.bounds.top > mypapers[id].view.size.height) {
                        item.position.y -= mypapers[id].view.size.height + item.bounds.height;
                    } else if (item.bounds.right < 0) {
                        item.position.x += mypapers[id].view.size.width + item.bounds.width;
                    } else if (item.bounds.bottom < 0) {
                        item.position.y += mypapers[id].view.size.height + item.bounds.height;
                    }
                }
            }
        }

        return {
            colorChange: colorChange,
            update: update,
            count: count
        };
    };

    // start animations for each canvas
    var topAnim = anim(0, document.getElementById('canvas'));
    var bottomAnim = anim(1, document.getElementById('canvas2'));

    mypapers[0].view.onFrame = topAnim.update(0);
    mypapers[1].view.onFrame = bottomAnim.update(1);

    // use mutation observer to detect HTML changes
    // checks when page buttons activate/deactivate, change circle colors accordingly 
    var observer = new MutationObserver(function (mutations) {
        if (document.getElementById('info-button').classList.contains('on')) {
            topAnim.colorChange(colors.lightblue);
            bottomAnim.colorChange(colors.darkblue);
        } else if (document.getElementById('work-button').classList.contains('on')) {
            topAnim.colorChange(colors.lightgreen);
            bottomAnim.colorChange(colors.darkred);
        } else if (document.getElementById('contact-button').classList.contains('on')) {
            topAnim.colorChange(colors.lightergrey);
            bottomAnim.colorChange(colors.darkgrey);
        } else {
            topAnim.colorChange(colors.yellow);
            bottomAnim.colorChange(colors.lightgrey);
        }
    });

    // Notify me of everything!
    var observerConfig = {
        attributes: true,
    };

    // Node, config
    // Listen to navigation buttons
    var infoNode = document.getElementById('info-button');
    var workNode = document.getElementById('work-button');
    var contactNode = document.getElementById('contact-button');
    observer.observe(infoNode, observerConfig);
    observer.observe(workNode, observerConfig);
    observer.observe(contactNode, observerConfig);
}
