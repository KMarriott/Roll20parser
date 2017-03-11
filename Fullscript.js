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
				// console.log($(this).find('td').html())
				span = $(this).find('td').html().match(/\([^\)]+\)/g)
				console.log(span[0])
				// title = $(this).attr('title')
				// var rolljson = {}

				// if(title === undefined){
				// 	title = $(this).attr('original-title')
				// }

				// // console.log(title)

				// if(title !== undefined){
				// 	// console.log($(this).attr('title'))
				// 	interiorroll = title.match(/\([^\)]+\)/g)

				// 	// console.log(interiorroll)

				// 	if(interiorroll !== null){

				// 		try{diceres = $(interiorroll[0].slice(1, -1))
				// 			// console.log(diceres.html())
				// 			rolljson.diceres = diceres.text()
				// 			roll_attempt = title.slice(0, title.indexOf("=")-1)
				// 			roll_attempt = roll_attempt.slice(7)
				// 			// console.log(roll_attempt)
				// 		}
				// 		catch(e){}
				// 	}
				// 	rolljson.rollamount = roll_attempt.trim()

				// 		// console.log(rolljson)
				// 		if(rolljson.diceres === undefined){
				// 			$(this).append(" (" + rolljson.rollamount.replace(/\+ 0/g, '').trim()+ ")")
				// 		}

				// 		else
				// 			$(this).append(" (" + rolljson.rollamount.replace(/\+ 0/g, '').trim() + ") " + "(" + rolljson.diceres + ")")

				// 	}
					// console.log($(this).text())
				})



			// console.log($('body').html())

		})
})
