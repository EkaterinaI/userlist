$(document).ready(function(){

	var userMale = 0;
	var userFemale = 0;
	var userGender;
	var female = "female";
	var userFirst = [];
	var userFirstSearch = "";
	var userNumber;
	var userGenderIcon;

	for(var i=0;i<7;i++){
		$.ajax({
	 		url: 'https://randomuser.me/api/',
	 		dataType: 'json',
	 		async: false,
	  		success: function(data) {
	   			// console.log(data); 
	   			userGender = data.results["0"].gender;

	   			if(userGender == female) {
					userFemale = userFemale + 1;
					userGenderIcon = '<i class="fa fa-female" aria-hidden="true"></i>'
	  			} else {
	  				userMale = userMale + 1;
	  				userGenderIcon = '<i class="fa fa-male" aria-hidden="true"></i>'
	  			}

	  		userFirst[i] = 	data.results["0"].name.first;

			$('.userList').append(
				'<div class="user">' +
					'<div class="userInfo">' + 
						'<img src="' + data.results["0"].picture.thumbnail + '">'+
						'<span>' + data.results["0"].name.last + '</span>' + 
						'<span>' + data.results["0"].name.first + '</span>' +
						'<span>' + data.results["0"].login.username + '</span>' +
						'<span>' + data.results["0"].cell + '</span>' +
						'<span>' + data.results["0"].location.state + '</span>' +
						'<span class="plus"><div class="horizontal"><div class="vertical"></div></div></span>' +
					'</div>' + 
			     
			        '<div class="userInfoMore">' +
			       		'<p class="userInfoMoreName">' + data.results["0"].name.first + userGenderIcon + '</p>' +

				        '<div class="userInfoMoreItem">' + 
				        	'<p><span class="userInfoList">Username</span> <span>' + data.results["0"].login.username + '</span></p>' +
				        	'<p><span class="userInfoList">Registered</span> <span>' + data.results["0"].registered + '</span></p>' +
				        	'<p><span class="userInfoList">Email</span> <span>' + data.results["0"].email + '</span></p>' +
				        '</div>' + 
				        '<div class="userInfoMoreItem">' +
				        	'<p><span class="userInfoList">Address</span> <span>' + data.results["0"].location.street + '</span></p>' +
				        	'<p><span class="userInfoList">City</span> <span>' + data.results["0"].location.city + '</span></p>' +
				        	'<p><span class="userInfoList">Zip code</span> <span>' + data.results["0"].location.postcode + '</span></p>' +
				        '</div>' + 
				        '<div class="userInfoMoreItem">' +
				        	'<p><span class="userInfoList">Birthday</span> <span>' + data.results["0"].dob + '</span></p>' +
				        	'<p><span class="userInfoList">Phone</span> <span>' + data.results["0"].phone + '</span></p>' +
				        	'<p><span class="userInfoList">Cell</span> <span>' + data.results["0"].cell + '</span></p>' +
				        '</div>' + 
				        '<div class="userInfoMoreItem">' +
				        	'<img src="' + data.results["0"].picture.large + '">' +
				        '</div>' + 
				    '</div>' + 
				'</div>'
	        );
	    
	  		}	
		});
	}

	$(document).on('click', '.userInfo', function() {
		if(!$(this).parent().hasClass("active")){
			$(".user").removeClass("active")
			$($(this).parent().addClass("active"))
			$(".vertical").css({
				transform: "rotateY(0deg)",
				transition: "0.1s"
			})
			$(this).find(".vertical").css({
				transform: "rotateY(90deg)",
				transition: "0.1s"
			})

		} else {
			$(this).parent().removeClass("active")
			$(this).find(".vertical").css({
				transform: "rotateY(0deg)",
				transition: "0.1s"
			})
		}
	})

	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawChart);

	function drawChart() {
		var data = google.visualization.arrayToDataTable([
		  ['Task', 'Hours per Day'],
		  ['Male',     userMale],
		  ['Female',      userFemale]
		]);

		var options = {'title':'Gender Users',
		               'width':500,
		               'height':500};

		var chart = new google.visualization.PieChart(document.getElementById('piechart'));
		chart.draw(data, options);
	}

	$("button").click(function() {
		$("#piechart").css({
			display: "block",
			opacity: 1
		})
		$("body").append("<div class='overlay'></div>")
	})

    $(document).on('click', '.overlay', function() {
    	$("#piechart").css({
			display: "none",
			opacity: 0
		})
		$(".overlay").css({
			display: "none"
		})    	
    })

    $(".submit").click(function() {
    	if (userNumber % 2 == 0) {
    		$(".user").eq(userNumber).css({
    			backgroundColor: "#CCCCCC"
    		})
    	} else {
    		$(".user").eq(userNumber).css({
    			backgroundColor: "#EDEDED"
    		})
    	}
    	
    	userFirstSearch = $(".search").val();
    	for(var i = 0; i < 7; i++) {
    		if(userFirst[i] == userFirstSearch) {
    			userNumber = i;
    			$(".user").eq(userNumber).css({
	    			backgroundColor: "#84cec3",
	    			transition: "1s"
	    		})
    		} 
    	}
    })
});