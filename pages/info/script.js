"use strict";

const lmnt = selector => document.querySelector(selector),
lmnts = (...selectors) => [...document.querySelectorAll(selectors)]

const body = lmnt(`body`), 
header = lmnt(`header`),
main = lmnt(`main`),
nav_bar = lmnt(`#nav_bar`),
main_sections = lmnts(`main section`),
main_top = lmnt(`#main_top`)

main.style.top = header.clientHeight+'px'
//main.style.padding = "0px 3ch"


let set_width = (+document.body.clientWidth)+`px`

function set_max_widths () {
	set_width = (+document.body.clientWidth)+`px`

	nav_bar.style.width = main.style.width = header.style.width =
	nav_bar.style.maxWidth = main.style.maxWidth = header.style.maxWidth = set_width
	main_sections.forEach(section => section.maxWidth = (+document.body.clientWidth-10)+`px`)

	if (header.clientHeight <991) main.classList.add('mobile_resizer')
	else main.classList.remove('mobile_resizer')
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

const input_search = lmnt(`#input_search`),
btn_search = lmnt(`#btn_search`),
all_info = lmnts(`.info`),
subject_select = lmnt(`#subject_select`),
options_list = lmnts(`option`)

options_list.forEach(x=>{
	if(x.textContent.length>20)
	x.textContent=x.textContent.substring(0,20)+'...';
})

// all_arguments.forEach(argument => {
// 	subject_select.options[subject_select.options.length] = new Option(argument.value, argument.value)
// })

let results = ``,
selected_option = subject_select.selectedOptions[0].value

function search () {
	selected_option = subject_select.selectedOptions[0].value
	results = lmnts(`[data-${selected_option}]`)
	//console.log(results)

	all_info.forEach(argument => {
		argument.style.display = "block"
		if (selected_option != 'all') {
			if (argument.dataset[selected_option] == undefined){
				//argument.style.display = "none"
			} else {
				//console.log(`else: ${argument.dataset[selected_option]}`)
				main.prepend(argument)
			}
		}
	})

	main.prepend(main_top)

	let not_result = '';
}

let datasets = {}, re_dataAttr

function getDataAttributes(node) {
	;[...node.attributes].forEach((value, index, attr) =>{
		let attr_node_name = value.value.name
		//console.log(`value: ${value}. index: ${JSON.toString(index)}. attr: ${JSON.toString(attr)}`)
		// console.log(`value.name: ${value.name}. value.value: ${value.value}`)
		let attr_node_value = value.value
		if (value.name.includes("data")) {
			if (!datasets[value.name]) datasets[value.name] = []
			datasets[value.name].push(attr_node_value)
		}
		
	})

	return datasets
}

all_info.forEach(info => getDataAttributes(info))

let subjects = []

Object.entries(datasets).forEach((key, value) =>{
	// console.log(`key: ${key}. value: ${value}`)
	let attr = key[0]
	// console.log(attr)
	subjects.push(attr.replace(`data-`,''))
})

function create_Class(name,rules){
    var style = document.createElement('style');
    style.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
    if(!(style.sheet||{}).insertRule) 
        (style.styleSheet || style.sheet).addRule(name, rules);
    else
        style.sheet.insertRule(name+"{"+rules+"}",0);
}


function get_random_dark_color () {
	let random_number_between = (min, max) => 
		~~(Math.random() * (max - min + 1) + min)

	let r = random_number_between(0,125),
	g = random_number_between(0,125),
	b = random_number_between(0,125)

	return `rgb(${r},${g},${b})`
}

subjects.forEach(subject => {
	subject_select.options[subject_select.options.length] = new Option(subject, subject)

	let random_color = get_random_dark_color()
	lmnts(`[data-${subject}]`).forEach(argument => {
		argument.style.backgroundColor = random_color
	})
})
