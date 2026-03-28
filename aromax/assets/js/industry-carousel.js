/* Industry Carousel - auto-sliding with dot navigation */
(function () {
	'use strict';

	var carousel = document.getElementById('industryCarousel');
	if (!carousel) return;

	var track = carousel.querySelector('.industry-track');
	var slides = carousel.querySelectorAll('.industry-slide');
	var dotsContainer = document.getElementById('industryDots');
	var total = slides.length;
	var currentPage = 0;
	var perView = 3;
	var gap = 24; // 1.5em ≈ 24px
	var autoTimer;

	function getPerView() {
		var w = window.innerWidth;
		if (w <= 480) return 1;
		if (w <= 980) return 2;
		return 3;
	}

	function getPages() {
		return Math.ceil(total / perView);
	}

	function buildDots() {
		dotsContainer.innerHTML = '';
		var pages = getPages();
		for (var i = 0; i < pages; i++) {
			var dot = document.createElement('button');
			dot.className = 'industry-dot' + (i === currentPage ? ' active' : '');
			dot.setAttribute('aria-label', 'Page ' + (i + 1));
			dot.dataset.page = i;
			dot.addEventListener('click', function () {
				goTo(parseInt(this.dataset.page));
				resetAuto();
			});
			dotsContainer.appendChild(dot);
		}
	}

	function goTo(page) {
		var pages = getPages();
		if (page >= pages) page = 0;
		if (page < 0) page = pages - 1;
		currentPage = page;

		var slideW = slides[0].offsetWidth + gap;
		var offset = currentPage * perView * slideW;
		var maxOffset = track.scrollWidth - carousel.offsetWidth;
		if (offset > maxOffset) offset = maxOffset;

		track.style.transform = 'translateX(-' + offset + 'px)';

		var dots = dotsContainer.querySelectorAll('.industry-dot');
		dots.forEach(function (d, i) {
			d.classList.toggle('active', i === currentPage);
		});
	}

	function next() {
		goTo(currentPage + 1);
	}

	function startAuto() {
		autoTimer = setInterval(next, 4000);
	}

	function resetAuto() {
		clearInterval(autoTimer);
		startAuto();
	}

	function init() {
		perView = getPerView();
		if (currentPage >= getPages()) currentPage = 0;
		buildDots();
		goTo(currentPage);
	}

	window.addEventListener('resize', function () {
		perView = getPerView();
		init();
	});

	document.addEventListener('DOMContentLoaded', function () {
		init();
		startAuto();
	});

	// Pause on hover
	carousel.addEventListener('mouseenter', function () { clearInterval(autoTimer); });
	carousel.addEventListener('mouseleave', startAuto);
})();
