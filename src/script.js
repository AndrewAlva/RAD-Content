// import Experience from './Experience/Experience.js'
// const experience = new Experience(document.querySelector('canvas.webgl'))


const container = document.getElementById('piecesContainer');

var start = 0;
var total = 97;
// var start = 172;
// var total = 66;
var base = "pieces/01-fluid-sim-vol1/movie.0.";
var stagger = 350;
var counter = 0;

var pieces = [];
var maxPieces = 10;
var angle = 15;
var offset = {
    x: 10,
    y: 10
};


/*
    /////////////////////////////////////
    Approach:
    Like Nokia's snake game:
    - Only keep a #max amount of <img> tags in DOM tree, eliminate the rest.
    - Fade out
    - End animation with no images visible.
    /////////////////////////////////////
*/

window.triggerAnimation = function(speed = stagger) {
    counter = 0;
    var fadeStep = 1 / maxPieces;

    function nextImage(id) {
        // console.log('id', id);

        var img = document.createElement('img');
        img.src = base + id + '.png';
        img.rotationDeg = Math.random() * angle - (angle / 2);
        // img.style.transform = `rotate(${Math.random() * angle - (angle / 2)}deg) translate3d(${Math.random() * offset.x - (offset.x / 2)}px, ${Math.random() * offset.y - (offset.y / 2)}px, 0)`;
    
        container.appendChild(img);
        pieces.push(img);
    
        // Remove extra pieces beyond max limit
        if (pieces.length > maxPieces) {
            var removed = pieces.shift();
            container.removeChild(removed);
        }
    
        // Fade out
        for (let i = 0; i < pieces.length; i++) {
            const element = pieces[pieces.length - 1 - i];
            let opacity = 1 - (fadeStep * i);
            let scale = opacity;
            // element.style.opacity = opacity;
            element.style.transform = `scale(${scale}) rotate(${element.rotationDeg}deg) translate3d(${Math.random() * offset.x - (offset.x / 2)}px, ${Math.random() * offset.y - (offset.y / 2)}px, 0)`;
        }
    }
    
    var direction = 1;
    var imgInterval = setInterval(_ => {
        var id = start + counter;
        nextImage(id);
    
        counter += direction;
    
        if (counter == total) {
            direction = -1;
            counter -= 2;
        }
        
        if (counter == 0) {
            console.log('stopped interval');
            clearInterval(imgInterval);

            for (let i = 0; i < maxPieces; i++) {
                // const element = pieces[i];
                setTimeout(_ => {
                    // Fade out
                    for (let i = 0; i < pieces.length; i++) {
                        const element = pieces[i];
                        let opacity = (fadeStep * i) + fadeStep;
                        let scale = opacity;
                        // element.style.opacity = opacity;
                        element.style.transform = `scale(${scale})`;
                    }

                    var toRemove = pieces.shift();
                    container.removeChild(toRemove);
                }, speed * i);
            }
        }
    }, speed);
}


/*
    /////////////////////////////////////
    Approach:
    Like Nokia's snake game:
    Only keep a #max amount of <img> tags in DOM tree, eliminate the rest
    /////////////////////////////////////
*/
// window.triggerAnimation = function(speed = stagger) {
//     counter = 0;

//     for (let i = start; i < start + total; i++) {
//         setTimeout(_ => {
//             var img = document.createElement('img');
//             img.src = base + i + '.png';
//             img.style.transform = `rotate(${Math.random() * angle - (angle / 2)}deg) translate3d(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px, 0)`

//             container.appendChild(img);
//             pieces.push(img);

//             // Remove extra pieces beyond max limit
//             if (pieces.length > maxPieces) {
//                 var removed = pieces.shift();
//                 container.removeChild(removed);
//             }

//         }, speed * counter);

//         counter++;
//     }
// }





/*
    /////////////////////////////////////
    Approach:
    Opacity staggering
    Render ALL html elements
    /////////////////////////////////////
*/

// var pieces;

// function setupAnimation() {
//     pieces = container.getElementsByTagName('img');

//     for (let i = 0; i < pieces.length; i++) {
//         const el = pieces[i];
//         el.style.opacity = 0;
//     }
// }

// function triggerAnimation(speed = stagger) {
//     counter = 0;

//     for (let i = 0; i < pieces.length; i++) {
//         const el = pieces[i];
        
//         setTimeout(_ => {
//             el.style.opacity = 1;
//         }, speed * counter);
        
//         counter++;
//     }
// }

// function invertAnimation(speed = stagger) {
//     counter = 0;

//     for (let i = pieces.length - 1; i >= 0; i--) {
//         const el = pieces[i];
        
//         setTimeout(_ => {
//             el.style.opacity = 0;
//         }, speed * counter);
        
//         counter++;
//     }
// }

// window.setupAnimation = setupAnimation;
// window.triggerAnimation = triggerAnimation;
// window.invertAnimation = invertAnimation;