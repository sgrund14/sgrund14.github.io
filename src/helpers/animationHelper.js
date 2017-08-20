'use strict';

const paper = require('paper/dist/paper-full');

 // helper function for smooth color transition
// lerp and fade functions adapted from: 
// http://stackoverflow.com/questions/11292649/javascript-color-animation
const lerp = (val1, val2, rate) => {
    return (1 - rate) * val1 + rate * val2;
};
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
const hexToRgb = hex => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
// https://stackoverflow.com/questions/14323082/why-doesnt-backgroundcolor-rgba-b-c-work
function rgbToString(r,g,b) {
    return 'rgb(' + [(r||0),(g||0),(b||0)].join(',') + ')';
}

const changeBackgroundColor = (endColor, area) => {
    const section = document.getElementById(area);
    const rgb = hexToRgb(endColor);
    section.style.backgroundColor = rgbToString(rgb.r, rgb.g, rgb.b);
};

const anim = (paperArray, id, canvasElement) => {
    paperArray[id] = new paper.PaperScope();
    const currentPaper = paperArray[id];
    currentPaper.setup(canvasElement);

    let count;
    let speed = 8;

    // more circles on bottom canvas, less on top.
    id === 0 ? count = 20 : count = 50;

    let path;

    path = new currentPaper.Path.Circle({
        center: [0, 0],
        radius: 10
    });

    // initialize circle colors: yellow for top canvas, grey for bottom
    id === 0 ? path.fillColor = '#ffe738' : path.fillColor = '#bfbfbf';

    // Create a symbol, which we will use to place instances of later:
    const symbol = new currentPaper.Symbol(path);

    // Place the instances of the symbol:
    for (let i = 0; i < count; i++) {
        // The center position is a random point in the view:
        const rand = currentPaper.Point.random();
        const centX = rand.x * currentPaper.view.size.width;
        const centY = rand.y * currentPaper.view.size.height;
        const center = new currentPaper.Point(centX, centY);

        var placedSymbol = symbol.place(center);

        placedSymbol.setPosition(center);

        // larger circles on top canvas, smaller circles on bottom
        if (id === 0) {
            placedSymbol.scale(currentPaper.view.size.width / 300 * i / count);
        } else {
            placedSymbol.scale(currentPaper.view.size.width / 600 * i / count);
        }
    }

    // function to change circle colors on screen change
    const colorChange = color => {
        fade(path.fillColor, color, 125);
    };

    // change color of circles without altering speed
    const colorChangeSettings = color => {
        fadeSettings(path.fillColor, color, 125);
    };

    // smoothly transition from start color to end color over duration (without increasing speed of circles)
    const fadeSettings = (start, end, duration) => {
        const endColor = new currentPaper.Color(end);

        const interval = 10;
        const steps = duration / interval;
        const step_u = 1.0 / steps;
        let u = 0.0;
        const theInterval = setInterval(function () {
            if (u >= 1.0) {
                clearInterval(theInterval);
            }
            const r = parseFloat(lerp(start.red, endColor.red, u));
            const g = parseFloat(lerp(start.green, endColor.green, u));
            const b = parseFloat(lerp(start.blue, endColor.blue, u));
            const colorname = new currentPaper.Color(r, g, b);
            path.fillColor = colorname;
            u += step_u;
        }, interval);
    };


    // smoothly transition from start color to end color over duration
    const fade = (start, end, duration) => {
        const endColor = new currentPaper.Color(end);

        const interval = 10;
        const steps = duration / interval;
        const step_u = 1.0 / steps;
        let u = 0.0;
        speed = .05;
        const theInterval = setInterval(function () {
            if (u >= 1.0) {
                speed = 8;
                clearInterval(theInterval);
            }
            const r = parseFloat(lerp(start.red, endColor.red, u));
            const g = parseFloat(lerp(start.green, endColor.green, u));
            const b = parseFloat(lerp(start.blue, endColor.blue, u));
            const colorname = new currentPaper.Color(r, g, b);
            path.fillColor = colorname;
            u += step_u;
        }, interval);
    };

    const update = id => {
        return () => {
            let count;
            id === 0 ? count = 20 : count = 50;
            for (let i = 0; i < count; i++) {
                const item = paperArray[id].project.activeLayer.children[i];

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
                if (item.bounds.left > paperArray[id].view.size.width) {
                    item.position.x -= paperArray[id].view.size.width + item.bounds.width
                } else if (item.bounds.top > paperArray[id].view.size.height) {
                    item.position.y -= paperArray[id].view.size.height + item.bounds.height;
                } else if (item.bounds.right < 0) {
                    item.position.x += paperArray[id].view.size.width + item.bounds.width;
                } else if (item.bounds.bottom < 0) {
                    item.position.y += paperArray[id].view.size.height + item.bounds.height;
                }
            }
        }
    }

    return {
        colorChange: colorChange,
        colorChangeSettings: colorChangeSettings,
        update: update
    };
};

module.exports = { anim, changeBackgroundColor };

