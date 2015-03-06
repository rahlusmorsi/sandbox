var canvas = document.getElementById('main');
var c = canvas.getContext('2d');

var mouse = {};
var ui = {
    button : {
        x: 50,
        y: 50,
        height: 40,
        width: 150,
        color: 'yellow',
        shape: 'rect',
        movable: true,
        moving: false,
        text: 'Drag me Around',
        textColor: 'black',
        draw: function(){
            c.beginPath();
            c.rect(this.x, this.y, this.width, this.height);

            c.fillStyle = this.color;
            c.fill();
            c.lineWidth = 2;
            c.lineJoin = 'round';
            c.strokeStyle = 'black';
            c.stroke();

            c.font = '16px Helvetica';
            c.fillStyle = this.textColor;
            c.fillText(this.text, this.x + 15, this.y + 27);
        }
    }
};

canvas.addEventListener('mousedown', function(evt){
    mouse = getCursorPosition(canvas, evt);
    if( touches( mouse, ui.button ) ){
        ui.button.color = 'blue';
        ui.button.textColor = 'white';
        ui.button.moving = true;
    }
}, false);

canvas.addEventListener('mousemove', function(evt) {
    if( ui.button.moving && ui.button.movable ){
        ui.button.x = ui.button.x + evt.webkitMovementX;
        ui.button.y = ui.button.y + evt.webkitMovementY;
    }
}, false);

canvas.addEventListener('mouseup', function(evt){
    if (ui.button.moving){
        ui.button.color = 'yellow';
        ui.button.textColor = 'black';
        ui.button.moving = false;
    }
}, false);

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

function touches( input, ui){
    switch (ui.shape){
        case 'rect':
            return (
            ( (input.x > ui.x) && (input.y > ui.y) ) &&
            ( (input.x < (ui.x + ui.width)) && (input.y < (ui.y + ui.height)) )
            );
            break;
    }
}

function drawLoop() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    ui.button.draw();

    window.requestAnimationFrame(drawLoop);
}