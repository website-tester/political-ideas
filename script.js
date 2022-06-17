"use strict";

const temp_top = header.clientHeight

let my_interval = setInterval(function () {
	if (temp_top == header.clientHeight) return
	main.style.top = +header.clientHeight+`px`
	clearInterval(my_interval)
}, 5) 

// main.style.padding = `0px 1ch`
set_max_widths ()
