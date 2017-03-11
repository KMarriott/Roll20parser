var jsdom = require("jsdom"),
fs = require('fs');

file = './Wholepage.html'

fs.readFile(file, 'utf8', function(err, data) {
	if (err) throw err;

	jsdom.env(
		data,
		["http://code.jquery.com/jquery.js"],
		function (errors, window) {
			var $ = window.$;
			// $(div).attr('.spacer')
			$('div').find('.tstamp').remove()
			// $('div').find('.message desc').remove()
			$('div').find('.avatar').remove()
			$('img').remove()
			// console.log($('div')[0])




			//cleans up rolls
			$('.rollresult').each(function(){

				var formula = $(this).find(".formula")
				var rolling_string = formula.clone().text().replace(/(\r\n|\n|\r|(  ))/gm, "")
				var rollres = formula.clone().text().replace(/(\r\n|\n|\r|(  ))/gm, "")
				var rolling_string = rolling_string.slice(rolling_string.indexOf('g')+1)
				formula.text("Rolled: " + $(this).find('.rolled').text().trim() + " - " + rolling_string.trim())
			})

			$('.rollresult').each(function(){
				$(this).find('.formattedformula').remove()
				$(this).find('strong').remove()
				$(this).find('.rolled').remove()
			})




			var rolljson = {}
			var dice = []
			var roll_attempt = ""

			//cleans up inline rolls
			$('.sheet-rolltemplate-default').each(function(){
				$(this).find('td').not(':first').remove()

				$td = $(this).find('td')
				td_html = $td.html().slice($td.html().indexOf("<")-1)
				td_title = $(td_html).attr('original-title')
				if(td_title !== undefined){
					dice.style = td_title.slice(td_title.indexOf("g")+1, td_title.indexOf("=")-1).replace(/\+ 0/g, '').trim()
				}
				else{
					dice.style = 'Problem'
				}

				span = $(this).find('td').html().match(/\([^\)]+\)/g)
				if($(span)['0']!==undefined){
					span_parsed = $(span)['0'].slice(1, -1)
				}


				span_html = $(span_parsed)
				dice.roll = span_html.text()
				dice.result = span_html.html()
				$td.append("<br>Rolled: " + dice.style + " - " + dice.roll)
				console.log(dice)

				})



			console.log($('body').html())

		})
})
