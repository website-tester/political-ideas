"use strict";

const lmnt = selector => document.querySelector(selector),
lmnts = (...selectors) => [...document.querySelectorAll(selectors)]

const body = lmnt(`body`), 
header = lmnt(`header`),
main = lmnt(`main`),
main_sections = lmnts(`main section`),
nav_bar = lmnt(`#nav_bar`)

let set_width
function set_max_widths () {
	set_width = (+document.body.clientWidth)+`px`

	nav_bar.style.width = main.style.width = header.style.width =
	nav_bar.style.maxWidth = main.style.maxWidth = header.style.maxWidth = set_width
	main_sections.forEach(section => section.maxWidth = set_width)
	
	if (body.clientWidth <991) main.classList.add('mobile_resizer')
	else main.classList.remove('mobile_resizer')
}
window.onresize = set_max_widths


/* 
when the user scrolls down, hide the navbar
when the user scrolls up, show the navbar
when fully scrolled up, show navbar and title */
let prev_scroll_pos = window.scrollY
window.onscroll = () => {
	header.style.top = (!window.scrollY ? 0 : 
		nav_bar.clientHeight * (prev_scroll_pos > window.scrollY) 
			- header.clientHeight ) + `px`

	prev_scroll_pos = window.scrollY
}
