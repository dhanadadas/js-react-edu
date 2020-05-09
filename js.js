

window.addEventListener("DOMContentLoaded", function() {
	'use strict';
	/*
	 * Табы
		*
	 */
	let tab = document.querySelectorAll('.info-header-tab'),
		info = document.querySelector('.info-header'),
		tabContent = document.querySelectorAll('.info-tabcontent');

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function(event) {
		let target = event.target;
		if (target && target.classList.contains('info-header-tab')) {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				};
			};
		}
	});

	/*
	 * Таймер
	 *
	 */
	function getTomorrow() {
		var D = new Date();
		D.setDate(D.getDate() + 1);
		return D;
	}
	let deadLine = getTomorrow();

	function getTimeRemaining(endtime) {
		let t = Date.parse(deadLine) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / 1000 / 60 / 60));
		//day     = Math.floor( (t/1000*60*60*24) );
		return {
			'total': t,
			'seconds': seconds,
			'minutes': minutes,
			'hours': hours
		};
	}


	function setClock(id, endtime) {
		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds'),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			let t = getTimeRemaining(endtime);
			if (t.hours <= 9) hours.textContent = "0" + t.hours;
			else hours.textContent = t.hours;
			if (t.minutes <= 9) minutes.textContent = "0" + t.minutes;
			else minutes.textContent = t.minutes;
			if (t.seconds <= 9) seconds.textContent = "0" + t.seconds;
			else seconds.textContent = t.seconds;

			if (t.total < 0) {
				clearInterval(timeInterval);
			}
		}
	}
	setClock('timer', deadLine);

	/*
	 * Модальное окно
	 *
	 */
	let more = document.querySelector('.more'),
		overlay = document.querySelector('.overlay'),
		close = document.querySelector('.popup-close');

	function show() {
		overlay.style.display = 'block';
		this.classList.add('more-splash');
		document.body.style.overflow = 'hidden'; // запретить прокрутку
	}

	function hidden() {
		overlay.style.display = 'none';
		more.classList.remove('more-splash');
		document.body.style.overflow = '';
	}
	more.addEventListener('click', show);
	close.addEventListener('click', hidden);

	let descriptionBtn = document.querySelectorAll('.description-btn');
	descriptionBtn.forEach(function(btn) {
		btn.addEventListener('click', show);
	});

	/*
   * Создать окно
   *
   */
	class Options {
		constructor(heigth, width, bg, fontSize, textAlign) {
			this.heigth = heigth;
			this.width = width;
			this.bg = bg;
			this.fontSize = fontSize;
			this.textAlign = textAlign;
		}
		createDiv() {
			var div = document.createElement('div');
			div.style.cssText = `height:${this.heigth}px;width:${this.width}px;font-size:${this.fontSize}px;text-align:${this.textAlign};background:${this.bg}`;
			div.textContent = "Харибол!";
			document.body.appendChild(div);
		}
	}
	//const div = new  Options(100,200,'red',14,'center');
	//div.createDiv();

	/*
	 * Обработка форм
   *
   */
	let message = {
		loading: 'Загрузка...',
		success: 'Спасибо, с Вами свяжутся',
		failure: 'Что-то пошло не так...'
	};

	let form = document.querySelector('.main-form'),
		contact = document.querySelector('#form'),
		input = document.querySelectorAll('input'),
		//input2 			    = contact.getElementsByTagName('input'),
		statusMessage = document.createElement('div');
	statusMessage.classList.add('status');


	function sendAjaxData(formEvent) {
		/*
		 * Вариант ajax с DATA
		 */
		formEvent.addEventListener('submit', function(event) {
			event.preventDefault();
			formEvent.appendChild(statusMessage);
			//sendAjaxData(formEvent);
			let formData = new FormData(formEvent);

			function postData() {
				return new Promise(function(resolve, reject) {
					let request = new XMLHttpRequest();

					request.open('POST', 'server.php');

					request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

					request.onreadystatechange = function() {
						if (request.readyState < 4) {
							resolve();
						} else if (request.readyState === 4 && request.status == 200) {
							resolve();
						} else {
							reject();
						}
					};

					request.send(formData);
				})
			}

			function clearInput() {
				for (let i = 0; i < input.length; i++) {
					input[i].value = "";
				}
			}

			postData(FormData)
				.then(() => statusMessage.innerHTML = message.success)
				.then(() => {

				})
				.catch(() => statusMessage.innerHTML = message.failure)
				.then(clearInput);
		});
	}

	sendAjaxData(form);
	sendAjaxData(contact);

	/*
  * Слайдер
  *
  */
	let sliderIndex = 1,
		sliders = document.querySelectorAll('.slider-item'),
		prev = document.querySelector('.prev'),
		next = document.querySelector('.next'),
		dotsWrap = document.querySelector('.slider-dots'),
		dots = document.querySelectorAll('.dot');
	showSliders(sliderIndex);

	function showSliders(n) {

		if (n > sliders.length) {
			sliderIndex = 1;
		}
		if (n < 1) {
			sliderIndex = sliders.length;
		}

		sliders.forEach((item) => item.style.display = 'none');
		dots.forEach((item) => item.classList.remove('dot-active'));
		sliders[sliderIndex - 1].style.display = 'block';
		dots[sliderIndex - 1].classList.add('dot-active');

	}

	function plusSlides(n) {
		showSliders(sliderIndex += n);
	}

	function currentSlider(n) {
		showSliders(sliderIndex = n);
	}

	prev.addEventListener('click', function() {
		plusSlides(-1);
	});

	next.addEventListener('click', function() {
		plusSlides(1);
	});
	console.log(dotsWrap);
	console.log(dots);
	dotsWrap.addEventListener('click', function(event) {
		for (let i = 0; i < dots.length + 1; i++) {
			if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
				currentSlider(i);
			}
		}
	});

	/*
	 * Калькурятор
	 *
	 */
	let persons = document.querySelectorAll('.counter-block-input')[0],
		restDay = document.querySelectorAll('.counter-block-input')[1],
		place = document.getElementById('select'),
		totalValue = document.getElementById('total'),
		personsSum = 0,
		daysSum = 0,
		total = 0;

	persons.addEventListener('input', function() {
		personsSum = +this.value;
		total = (daysSum + personsSum) * 4000;

		if (restDay.value === '' || persons.value === '') {
			totalValue.innerHTML = 0;
		} else {
			var costPlace = place.value;
			totalValue.innerHTML = total * costPlace;
		}
	});
	console.log(persons);
	restDay.addEventListener('input', function() {
		daysSum = +this.value;
		total = (daysSum + personsSum) * 4000;

		if (restDay.value === '' || persons.value === '') {
			totalValue.innerHTML = 0;
		} else {
			var costPlace = place.value;
			totalValue.innerHTML = total * costPlace;
		}
	});

	place.addEventListener('change', function() {
		if (restDay.value === '' || persons.value === '') {
			totalValue.innerHTML = 0;
		} else {
			let a = total;
			totalValue.innerHTML = a * this.options[this.selectedIndex].value;
		}
	});

});

var dd= 1;