"use strict";

const lmnt = selector => document.querySelector(selector),
lmnts = (...selectors) => [...document.querySelectorAll(selectors)]

const body = lmnt(`body`), 
header = lmnt(`header`),
main = lmnt(`main`),
nav_bar = lmnt(`#nav_bar`),
main_sections = lmnts(`main section`)

main.style.top = header.clientHeight+'px'
main.style.padding = "0px 3ch"

let set_width = (+document.body.clientWidth)+`px`

function set_max_widths () {
	set_width = (+document.body.clientWidth)+`px`

	nav_bar.style.width = main.style.width = header.style.width =
	nav_bar.style.maxWidth = main.style.maxWidth = header.style.maxWidth = set_width
	main_sections.forEach(section => section.maxWidth = set_width)
}
set_max_widths ()
window.onresize = set_max_widths

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  const header_minus_nav_height = header.clientHeight - nav_bar.clientHeight
  if (prevScrollpos > currentScrollPos) {
    header.style.top = -header_minus_nav_height+"px"// "-52px";
  } else {
    header.style.top = -header.clientHeight+"px" //"-123px";
  }
  prevScrollpos = currentScrollPos;
  if (window.scrollY==0) {
	header.style.top = "0px";
  }
}



///////////////////////////////
// document.querySelectorAll('[data-name="value"]');

const wage_arguments = [lmnts(`[data-wages]`)]




