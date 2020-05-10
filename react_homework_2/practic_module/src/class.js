function button() {
	return 'button';
}

class Slider {//export default   экспорт по умолчанию
	constructor(width, height, count) {
	this.width = width;
	this.height = height;
	this.count = count;
	}

	nextSlide(){
		console.log('Moving forward');
	}
	prevSlide(){
		console.log('Moving forward');
	}
	whoAmI(){
		console.log(this.width, this.height, this.count);
	}
}
const slider = new Slider(600,400,5);
slider.whoAmI();
const comeSlider = new Slider(300, 450, 10);
comeSlider.whoAmI();

class AutoSlider extends Slider {
	constructor(width, heigth, count, auto) {
		super(width,heigth,count);
		this.auto = auto;
	}
	play(){
		console.log(`Autoplay: ${this.auto}`);
	}
}

const slider0 = new AutoSlider(500,500, 4, true);
slider0.whoAmI();
//slider0.play();

export {
	button, Slider
};
