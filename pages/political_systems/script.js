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
	main_sections.forEach(section => section.maxWidth = (+document.body.clientWidth-10)+`px`)
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

// const input_search = lmnt(`#input_search`),
// btn_search = lmnt(`#btn_search`),
// wage_arguments = lmnts(`[data-wages]`),
// all_arguments = lmnts(`.arguments`),
// subject_select = lmnt(`#subject_select`)


// all_arguments.forEach(argument => {
// 	subject_select.options[subject_select.options.length] = new Option(argument.value, argument.value)
// })

// let results = ``,
// selected_option = subject_select.selectedOptions[0].value

// function search () {
// 	selected_option = subject_select.selectedOptions[0].value
// 	results = lmnts(`[data-${selected_option}]`)
// 	console.log(results)

// 	all_arguments.forEach(argument => {
// 		argument.style.display = "block"
// 		if (selected_option != 'all') {
// 			if (argument.dataset[selected_option] == undefined){
// 				argument.style.display = "none"
// 			} else {
// 				console.log(`else: ${argument.dataset[selected_option]}`)
// 			}
// 		}
// 	})

// 	let not_result = '';
// }

// let datasets = {}, re_dataAttr

// function getDataAttributes(node) {
// 	;[...node.attributes].forEach((value, index, attr) =>{
// 		let attr_node_name = value.value.name
// 		//console.log(`value: ${value}. index: ${JSON.toString(index)}. attr: ${JSON.toString(attr)}`)
// 		// console.log(`value.name: ${value.name}. value.value: ${value.value}`)
// 		let attr_node_value = value.value
// 		if (value.name.includes("data")) {
// 			//Object.assign(datasets, {[value.name]: attr_node_value})
// 			if (!datasets[value.name]) datasets[value.name] = []
// 			datasets[value.name].push(attr_node_value)
// 		}
		
// 	})

// 	return datasets
    // d = {}, 
    // re_dataAttr = /^data\-(.+)$/;

	// re_dataAttr = re_dataAttr.toString();

    // [...node.attributes].forEach = (function (value, index, attr) {
	// 	console.log(re_dataAttr)
    //     if (re_dataAttr.test(attr.nodeName)) {
    //         let key = attr.nodeName.match(re_dataAttr)[1]
    //         d[key] = attr.nodeValue
    //     }
    // })()

    // return d;
// }

// all_arguments.forEach(argument => getDataAttributes(argument))

// let subjects = []

// Object.entries(datasets).forEach((key, value) =>{
// 	// console.log(`key: ${key}. value: ${value}`)
// 	let attr = key[0]
// 	// console.log(attr)
// 	subjects.push(attr.replace(`data-`,''))
// })

// subjects.forEach(subject => {
// 	subject_select.options[subject_select.options.length] = new Option(subject, subject)
// })

/*
var a = [].filter.call(el.attributes, function(at) { return /^data-/.test(at.name); });
*/