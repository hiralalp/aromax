/*  Scroll-triggered animations using IntersectionObserver
    Auto-targets product page sections inside #main           */
(function () {
	'use strict';

	if (!('IntersectionObserver' in window)) return;   // graceful fallback

	/* ---------- configuration ---------- */
	var animMap = [
		{ selector: '#one > .inner',                          cls: 'sa-fade-up',    delay: 0 },
		{ selector: '#two.spotlights > section .image',       cls: 'sa-fade-left',  delay: 0 },
		{ selector: '#two.spotlights > section .content',     cls: 'sa-fade-right', delay: 0.15 },
		{ selector: '#three > .inner > header',               cls: 'sa-fade-up',    delay: 0 },
		{ selector: '#three .table-wrapper',                  cls: 'sa-scale-in',   delay: 0.1 },
		{ selector: '#three .actions',                        cls: 'sa-fade-up',    delay: 0.2 },
		{ selector: '#contact .inner',                        cls: 'sa-fade-up',    delay: 0 }
	];

	/* ---------- apply initial hidden state ---------- */
	function init() {
		animMap.forEach(function (cfg) {
			var els = document.querySelectorAll(cfg.selector);
			els.forEach(function (el, i) {
				el.classList.add('sa-hidden', cfg.cls);
				el.style.transitionDelay = (cfg.delay * (i + 1)) + 's';
			});
		});

		// Stagger table rows
		var rows = document.querySelectorAll('#three .table-wrapper tbody tr');
		rows.forEach(function (row) {
			row.classList.add('sa-table-row');
		});
	}

	/* ---------- observer ---------- */
	var observer = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add('sa-visible');
				observer.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0.15,
		rootMargin: '0px 0px -40px 0px'
	});

	function observe() {
		var targets = document.querySelectorAll('.sa-hidden, .sa-table-row');
		targets.forEach(function (el) { observer.observe(el); });
	}

	/* ---------- kick off ---------- */
	document.addEventListener('DOMContentLoaded', function () {
		init();
		observe();
	});
})();
