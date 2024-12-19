// import Experience from './Experience/Experience.js'
// const experience = new Experience(document.querySelector('canvas.webgl'))


const container = document.getElementById('piecesContainer');

var start = 114;
var total = 124;
// var start = 172;
// var total = 66;
var base = "pieces/01-fluid-sim-vol1/output.";
var stagger = 300;
var counter = 0;

// for (let i = start; i < start + total; i++) {
    
//     setTimeout(_ => {
//         var img = document.createElement('img');
//         img.src = base + i + '.png';
//         container.appendChild(img);
//     }, stagger * counter);

//     counter++;
// }


var pieces;

function setupAnimation() {
    pieces = container.getElementsByTagName('img');

    for (let i = 0; i < pieces.length; i++) {
        const el = pieces[i];
        el.style.opacity = 0;
    }
}

function triggerAnimation(speed = stagger) {
    counter = 0;

    for (let i = 0; i < pieces.length; i++) {
        const el = pieces[i];
        
        setTimeout(_ => {
            el.style.opacity = 1;
        }, speed * counter);
        
        counter++;
    }
}

function invertAnimation(speed = stagger) {
    counter = 0;

    for (let i = pieces.length - 1; i >= 0; i--) {
        const el = pieces[i];
        
        setTimeout(_ => {
            el.style.opacity = 0;
        }, speed * counter);
        
        counter++;
    }
}

window.setupAnimation = setupAnimation;
window.triggerAnimation = triggerAnimation;
window.invertAnimation = invertAnimation;