"use strict";

const lmnt = selector => document.querySelector(selector),
lmnts = (...selectors) => [...document.querySelectorAll(selectors)]

const body = lmnt(`body`), 
header = lmnt(`header`),
main = lmnt(`main`),
nav_bar = lmnt(`#nav_bar`),
main_sections = lmnts(`main section`),
main_top = lmnt(`#main_top`),
header_title = lmnt(`#header_title`),
main_title = lmnt(`#main_title`)

main.style.top = header.clientHeight+'px'
//main.style.padding = "0px 3ch"


let set_width = (+document.body.clientWidth)+`px`

function set_max_widths () {
	set_width = (+document.body.clientWidth)+`px`

	nav_bar.style.width = main.style.width = header.style.width =
	nav_bar.style.maxWidth = main.style.maxWidth = header.style.maxWidth = set_width
	main_sections.forEach(section => section.maxWidth = (+document.body.clientWidth-1)+`px`)

	if (header.clientHeight <991) main.classList.add('mobile_resizer')
	else main.classList.remove('mobile_resizer')
}
set_max_widths ()
window.onresize = set_max_widths

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = reset_heights

function reset_heights () {
	let currentScrollPos = window.pageYOffset;
	let local_header = lmnt(`header`),
	local_nav_bar = lmnt(`nav`)
	let header_minus_nav_height = local_header.clientHeight - local_nav_bar.clientHeight
	
	if (prevScrollpos > currentScrollPos) {
		local_header.style.top = -header_minus_nav_height+"px"// "-52px";
	} else {
		local_header.style.top = -local_header.clientHeight+"px" //"-123px";
	}
	prevScrollpos = currentScrollPos;
	if (window.scrollY==0) {
		local_header.style.top = "0px";
	}
	let temp_main_top = +local_header.clientHeight
	if (temp_main_top < 0) temp_main_top = 0
	main.style.top = temp_main_top+`px`
}



/* page code start */
function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		local_results = regex.exec(url);
	if (!local_results) return null;
	if (!local_results[2]) return '';
	return decodeURIComponent(local_results[2].replace(/\+/g, ' '));
}

let href_page = getParameterByName('page'),
page_select = lmnt(`#page_select`),
page_options_list = lmnts(`#page_select option`),
all_pages = lmnts(`main>div`)

let selected_page = "My POV"



function choose_page () {
	selected_page = page_select.selectedOptions[0].value

	header_title.innerHTML = main_title.innerHTML = selected_page
	set_max_widths ()
	reset_heights ()

	if (selected_page == `My POV`) {
		all_pages.forEach(page => {
			if (page.dataset["page"] != selected_page){
				page.style.display = "none"
			} else {
				page.style.display = "block"
			} 
		})
	} else if (selected_page == `All Arguments`) {
		all_pages.forEach(page => {
			if (page.dataset["page"] != selected_page){
				page.style.display = "none"
			} else {
				page.style.display = "block"
				
				all_arguments.forEach(argument => page.prepend(argument))
			} 
		})
	} else {
		all_pages.forEach(page => {
			if (page.dataset["page"] == `My POV` || page.dataset["page"] == `All Arguments`){
				page.style.display = "none"
			} else {
				page.style.display = "block"
				if (page.dataset["page"] == selected_page) {
					main.prepend(page)
				}

				all_arguments.forEach(argument => {
					if (argument.classList.contains(`class-${page.id}`)) {
						if (argument.parentElement.id != page.id) 
							page.prepend(argument)
					}
				})
			}
		})
	}

	main.prepend(main_top)
}

let page_datasets = {};
all_pages.forEach(page => getDataAttributes(page, page_datasets));
page_datasets = {...page_datasets["data-page"]}
;(function add_page_options () {
	let pages = []
	Object.entries(page_datasets).forEach((key, value) =>{
		if (key[1] != "My POV") pages.push(key[1])
	})
	pages.forEach(page => {
		page_select.options[page_select.options.length] = new Option(page, page)
	})
}) ()

choose_page ()

/* page code end */


///////////////////////////////
// document.querySelectorAll('[data-name="value"]');

const input_search = lmnt(`#input_search`),
btn_search = lmnt(`#btn_search`),
wage_arguments = lmnts(`[data-wages]`),
all_arguments = lmnts(`.arguments`),
subject_select = lmnt(`#subject_select`),
options_list = lmnts(`#subject_select option`)

options_list.forEach(x=>{
	if(x.textContent.length>20)
	x.textContent=x.textContent.substring(0,20)+'...';
})

all_arguments.forEach(argument => {
	argument.classList.add(`class-${argument.parentElement.id}`)
})

let selected_option = subject_select.selectedOptions[0].value

// show all sections on a given subject above the rest
function search () {
	selected_option = subject_select.selectedOptions[0].value

	all_arguments.forEach(argument => {
		argument.style.display = "block"
		if (selected_option != 'all') {

			if (argument.dataset[selected_option] == undefined){
				//argument.style.display = "none"

				// what about if all args are selected in higher selecter
				// if (selected_page != `All Arguments`) {
				// 	all_pages.forEach(page => {
				// 		if (argument.classList.contains(`class-${page.id}`)) {
				// 			page.append(argument)
				// 		}
				// 	})
				// }
			} else {
				//main.prepend(argument)

				// what about if all args are selected in higher selecter
				if (selected_page != `All Arguments`) {
					all_pages.forEach(page => {
						if (argument.classList.contains(`class-${page.id}`)) {
							page.prepend(argument)
						}
					})
				} else {
					lmnt(`#all_args`).prepend(argument)
				}
			}
		}
	})

	// main.prepend(main_top)
}

// Private businesses seek to turn a profit for themselves, and hence only

let datasets = {} // , re_dataAttr // i think re_dataAttr is unused
function getDataAttributes(node, my_datasets) {
	;[...node.attributes].forEach((value, index, attr) =>{
		// let attr_node_name = value.value.name // i think this is unused
		let attr_node_value = value.value
		if (value.name.includes("data")) {
			if (!my_datasets[value.name]) my_datasets[value.name] = []
			my_datasets[value.name].push(attr_node_value)
		}
		
	})

	return my_datasets
}
all_arguments.forEach(argument => getDataAttributes(argument, datasets))

function get_random_dark_color () {
	let random_number_between = (min, max) => 
		~~(Math.random() * (max - min + 1) + min)

	let r = random_number_between(0,125),
	g = random_number_between(0,125),
	b = random_number_between(0,125)

	return `rgb(${r},${g},${b})`
}

(function add_subject_options_and_colors () {
	let subjects = []
	Object.entries(datasets).forEach((key, value) =>{
		let attr = key[0]
		subjects.push(attr.replace(`data-`,''))
	})
	subjects.forEach(subject => {
		subject_select.options[subject_select.options.length] = new Option(subject, subject)

		let random_color = get_random_dark_color()
		lmnts(`[data-${subject}]`).forEach(argument => {
			argument.style.backgroundColor = random_color
		})
	})
}) ()



function selectItemByValue(elmnt, value){
	let element_with_id = lmnt(`#${value}`) || lmnt(`#my_pov`)
	let external_name = element_with_id.dataset[`page`]

	for (let i=0; i < elmnt.options.length; i++) {
		
		if (elmnt.options[i].value == external_name) {
			elmnt.selectedIndex = i;
			break;
		}
	}
	choose_page ()
}
selectItemByValue(page_select, href_page)


