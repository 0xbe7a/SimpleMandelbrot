function init() {
    HEIGHT = screen.availHeight;
    WIDTH = screen.availWidth;
    canvas = document.getElementById("world");
    canvas.height = HEIGHT;
    canvas.width = WIDTH;
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function calculate(x, y) {
    centerx = WIDTH / 2;
    centery = HEIGHT / 2;
    x = centerx + x;
    y = centery - y;
    return [x, y]
}

function prepared(i) {
    if (i < 18) {
        return i;
    } else if (i < 25) {
        return i * 2;
    } else {
        return i * 3;
    }

}

function drawpix(x, y, i) {
    var cord = calculate(x, y);
    x = cord[0];
    y = cord[1];
    if (i >= 75) {
        ctx.fillStyle = 'rgb(0,0,0) ';
        //ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x, y, 1, 1);

    } else {
        d = prepared(i);
        ctx.fillStyle = 'rgb(' + d + ',' + d + ',' + d + ') ';
        ctx.fillRect(x, y, 1, 1);
    }
}

function mandel(c) {
    var m = {
        r: 0,
        i: 0
    };

    for (var i = 0; i < 75; i++) {
        // fc(z) = z^2 + C
        // (a+bi)*(a+bi) = a^2 - b^2 + 2ab
        var temp = m.r;
        m.r = (m.r * m.r) - (m.i * m.i) + c.r;
        m.i = 2 * temp * m.i + c.i;
        if (m.r * m.r + m.i * m.i > 4) {
            return i;
        }
    }
    return i;
}

function getLine() {
    //Left Top
    yy = 1 / (HEIGHT / 2);
    xx = 1 / (HEIGHT / 2);
    end = (HEIGHT / 2);
    ll = 0;
    line = 0;
    while (line < end) {
        ll = yy * (line * 1);
        for (var i = 0; i < WIDTH; i++) {
            im = (i * 1) * xx;
            var c = {
                r: im,
                i: ll
            };
            x = mandel(c);
            drawpix(c.r * end, c.i * end, x)

        }
        line++;
        //console.log(line)
    }
    console.log("Sector 1 finished.")
    ll = 0;
    line = 0;
    //Right Top
    while (line < end) {
        ll = yy * (line * 1);
        for (var i = 0; i < WIDTH; i++) {
            im = ((i * 1) * xx) * -1;
            var c = {
                r: im,
                i: ll
            };
            x = mandel(c);
            drawpix(c.r * end, c.i * end, x)

        }
        line++;
        //console.log(line)
    }
    console.log("Sector 2 finished.")
        //Right Down
    ll = 0;
    line = 0;
    while (line < end) {
        ll = yy * (line * -1);
        for (var i = 0; i < WIDTH; i++) {
            im = ((i * 1) * xx) * -1;
            var c = {
                r: im,
                i: ll
            };
            x = mandel(c);
            drawpix(c.r * end, c.i * end, x)

        }
        line++;
        //console.log(line)
    }
    console.log("Sector 3 finished.")
        //Left Down
    ll = 0;
    line = 0;
    while (line < end) {
        ll = yy * (line * -1);
        for (var i = 0; i < WIDTH; i++) {
            im = (i * 1) * xx;
            var c = {
                r: im,
                i: ll
            };
            x = mandel(c);
            drawpix(c.r * end, c.i * end, x)

        }
        line++;
        //console.log(line)
    }
    console.log("Sector 4 finished.")
}