/* -------------------------------------- 
	SCRIPT 
-------------------------------------- */

var SITE_URL = 'http://www.kevinrignault.fr/';

$(function(){
	
	//---------------
	//-- NAVIGATION
	//---------------
	
	//-- Navigation
	$(window).scroll(function(){
		//-- Navigation : Not for mobile
		if($(window).width() > 767){
			if($(window).scrollTop() > 40){
				$("#navigation-bar").css({
					"background":"#303236",
					"transition-duration":"0.5s"
				});
			}
			else {
				$("#navigation-bar").css({
					"background":"rgba(0,0,0,0.5)",
					"transition-duration":"0.5s"
				});
			}
		}
	});
	
	$(".menu-icon").click(function(){
		if(!$("#navigation").hasClass("active")){
			$("#navigation").stop().slideToggle(function(){
				$("#navigation").addClass("active");
			});
		}
		else {
			$("#navigation").stop().slideToggle(function(){
				$("#navigation").removeClass("active");
			});
		}
		return false;
	});
	
	$(window).resize(function(){
		if($(window).width() > 767){
			$("#navigation").show();
		}
		else {
			$("#navigation").hide();
			$("#navigation").removeClass("active");
		}
	});	
	
	
	//---------------
	//-- GLOBAL SEARCH
	//---------------
	
	//-- Show/Hide search
	var searchHeight = $("#search-bar").outerHeight();
	$("body").on("touchstart click", function(e){
		if($(e.target).hasClass("search-icon")){
      		if(!$("#search-bar").hasClass("active")){
	      		$(".picto.search").addClass("active");
				$("#search-bar").addClass("active");
				$("#search-bar").stop().animate({"margin-top":"0px"},300, function(){
					$("#search").focus();
					$("#search").trigger('touchstart'); 
				});
			}
			else {
				$(".picto.search").removeClass("active");
				$("#search-bar").removeClass("active");
				$("#search-bar").stop().animate({"margin-top":"-"+searchHeight+"px"},300);
			}
			return false;
    	}
    	//-- PC
    	else if(e.clientY){
    		if(e.clientY > searchHeight){
	    		if($("#search-bar").hasClass("active")){
			    	$(".picto.search").removeClass("active");
			    	$("#search-bar").removeClass("active");
		    		$("#search-bar").stop().animate({"margin-top":"-"+searchHeight+"px"},300);
		    		return false;
		    	}
		    }
    	}
    	//-- MOBILE
    	else if(e.originalEvent){
    		if(e.originalEvent.touches[0].clientY > searchHeight){
	    		if($("#search-bar").hasClass("active")){
			    	$(".picto.search").removeClass("active");
			    	$("#search-bar").removeClass("active");
		    		$("#search-bar").stop().animate({"margin-top":"-"+searchHeight+"px"},300);
		    		return false;
		    	}
		    }
    	}
	});
	
	//-- Show clean search
	$("#search-bar input").keyup(function(){
		if($(this).val().length > 0){
			$("#search-bar input#search").prop("placeholder", "Rechercher");
			$("#search-bar .cancel").show();
		}
		else {
			$("#search-bar .cancel").hide();
		}
	});
	
	//-- Clean search
	$("#search-bar .cancel").click(function(){
		$("#search-bar input#search").val("");
		$("#search").focus();
		$(this).hide();
	});
	
	//-- Submit search
	$("form.search-form").submit(function(){
		if($("#search-bar input#search").val() == ""){
			$("#search-bar input#search").prop("placeholder", "Veuillez saisir votre recherche");
			return false;
		}
	});
	
	
	//---------------
	//-- BACK TO TOP
	//---------------
	
	//-- Back to top
	$(window).scroll(function(){
		if($(this).scrollTop() >= 450) $("#to-top").fadeIn();
		else $("#to-top").fadeOut();
	});
	
	$(window).load(function(){
		if($(this).scrollTop() >= 450) $("#to-top").fadeIn();
		else $("#to-top").fadeOut();
	});
	
	$("#to-top").click(function(){
		$("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
	});
	
	
	//---------------
	//-- ABOUT
	//---------------
	
	//-- Skillbar animation
	$(window).scroll(function(){
		if($(this).scrollTop() >= 915){
			$(".skillbar-bar").each(function(){
				var thisPercent = $(this).parent().attr("data-percent");
				$(this).animate({
					width:thisPercent+"%"
				}, 1500);
			});
		}
	});
	
	//-- Set about image
	$(window).load(function(){
		if($(window).width() > 767){
			var bHeight = $(".all_domain").outerHeight();
			$(".illustration").css({height:bHeight});
		}	
	});
	
	$(window).resize(function(){
		if($(window).width() > 767){
			var bHeight = $(".all_domain").outerHeight();
			$(".illustration").css({height:bHeight});
		}
	});
	
	
	//---------------
	//-- RESOURCES
	//---------------
	
	//-- Search ressources
	$("#search-resources").keyup(function(){
		var thisValue = $(this).val().toLowerCase();
		
		$(".item-resource").each(function(){
			var $this = $(this);
			var thisTitle = $this.find("p.title").html().toLowerCase();
			var thisDescription = $this.find("p.description").html().toLowerCase();
			
			if(thisTitle.indexOf(thisValue) != -1 || thisDescription.indexOf(thisValue) != -1){
				$this.parent().fadeIn();
			}
			else {
				$this.parent().fadeOut();
			}
		});
		
	});
	
	
	//---------------
	//-- CONTACT
	//---------------
	
	//-- Load map
	if($('.contact-map').length != 0){
		var latitude = $(".contact-map").attr("data-latitude");
		var longitude = $(".contact-map").attr("data-longitude");
		var mapOptions = {
			zoom: 12,
			scrollwheel: false,
			draggable: false,
			panControl: false,
			zoomControl: true,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			overviewMapControl: false,
			zoomControlOptions: {
		        style: google.maps.ZoomControlStyle.LARGE,
		        position: google.maps.ControlPosition.LEFT_CENTER
		    },
			center: new google.maps.LatLng(latitude,longitude),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		var map = new google.maps.Map($(".contact-map").get(0), mapOptions);

		var image = "http://www.kevinrignault.fr/assets/templates/kevin/images/spot.png";
		var coordGPS = new google.maps.LatLng(latitude,longitude);
		var marker = new google.maps.Marker({
			position: coordGPS,
			map: map,
			icon: image
		});
	}
	
	//-- Form validate
	$("form#contact-form").validate();

	//-- Send mail
	$("#contact-send").click(function(){
		if($("form#contact-form").valid()){
			$.ajax({
				url : SITE_URL+'api/mail/send.php',
				type : 'post',
				dataType : 'json',
				data : {
					contact_nom : $("#contact-name").val(),
					contact_email : $("#contact-email").val(),
					contact_message : $("#contact-message").val(),
				},
				success : function(data){
					$("input").val("");
					$("textarea").val("");
					$(".message.return p").html(data.response);
					$(".message.return").fadeOut(function(){
						$(".message.return").fadeIn();
					});
				},
				error : function(data){
					$(".message.return p").html("Une erreur est survenue. Veuillez réessayer.");
					$(".message.return").fadeOut(function(){
						$(".message.return").fadeIn();
					});
				}
			});
		}
		return false;
	});
	
	$(".message.return span").click(function(){
		$(".message.return").fadeOut();
	});
	
	//-- ANALYTICS
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create','UA-27162950-1','kevinrignault.fr');ga('send','pageview');

});