"use strict";

const lmnt = selector => document.querySelector(selector),
lmnts = (...selectors) => [...document.querySelectorAll(selectors)]

const nav_bar = lmnt(`#nav_bar`),
btn_nav = lmnt(`#btn_nav`)

let nav_default = nav_bar.style.display || `block`
if (nav_default == ``) nav_default = `block`

function hide_show_nav () {
	console.log(`hide_show_nav running`)
	if (nav_bar.style.display == `none`) 
		nav_bar.style.display = nav_default
	else nav_bar.style.display = `none`
}

if (btn_nav.onclick=="hide_show_nav()") console.log("yes")
else console.log(btn_nav.onclick)