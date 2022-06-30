let images = [...document.querySelectorAll('.img')];
let slider = document.querySelector('.slider');
let sliderWidth;
let imageWidth;
let current = 0;
let target = 0;
let ease = .05;
let html = document.querySelector("html")


window.addEventListener('resize', init)


images.forEach((img, idx) => {
    img.style.backgroundImage = `url(./img/${idx+1}.jpg)`
} )

function lerp(start, end, t) {
    return start * (1-t) + end * t;
}

function setTransform(el, transform) {
    el.style.transform = transform;
}

function init(){
    sliderWidth = slider.getBoundingClientRect().width;
    imageWidth = sliderWidth / images.length;
    document.body.style.height = `${sliderWidth - (window.innerWidth - window.innerHeight)}px`
}

function animate () {
    current = parseFloat(lerp(current, target, ease)).toFixed(2);
    target = window.scrollY;
    setTransform(slider, `translateX(-${current}px)`)
    animateImages();
    requestAnimationFrame(animate);
}

function animateImages(){
    let ratio = current/ imageWidth;
    let intersectionRatioValue;

    images.forEach((image, idx) => {
        intersectionRatioValue = ratio - (idx * 0.7);
        setTransform(image, `translateX(${intersectionRatioValue * 70}px)`)
    })
}

let main = document.querySelector("main");

let windowTop = document.documentElement.scrollTop


let mainTop = main.getBoundingClientRect().top;
console.log(mainTop);

window.addEventListener("scroll", function() {
    console.log(mainTop);
    console.log(windowTop)

    if(mainTop <= 0) {
        html.style.overflowX = "hidden";
        main.style.position = "fixed";
        console.log(main)
        console.log(mainTop)
        init();
        animate();
    } else if ((mainTop+600) <= 0) {
        html.style.overflowX = "visible";
        main.style.position = "sticky";
    } else {
        html.style.overflowX = "visible";
        main.style.position = "sticky";
    }

})


