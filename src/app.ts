import { tns } from "tiny-slider";

const slider = tns({
    container: "#slider",
    items: 3,
    mouseDrag: true,
    slideBy: "page",
    swipeAngle: false,
    speed: 400,
    controls: false,
    autoWidth: true,
});

slider.play();
