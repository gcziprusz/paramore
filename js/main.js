/**Loader Module**/
var loaderModule = {
	config: {
    	videoContainer: "bg",
  		videoId:"bg_video",
  		videoName:"bg",
  		mobileBreakpoint:700
  	},
  	loadBackgroundVideo: function () {
  		$("#"+this.config.videoContainer).html(
    	'<video id="'+this.config.videoId+'" autoplay loop>' +
       		'<source src="videos/'+this.config.videoName+'.mp4"  type="video/mp4" />' +
        	'<source src="videos/'+this.config.videoName+'.webm" type="video/webm" />' +
        	'<source src="videos/'+this.config.videoName+'.ogv"  type="video/ogg" />' +
    	'</video>');
  	},
  	isLargeScreen:function(){
		return (window.innerWidth > this.config.mobileBreakpoint) ? true : false;
  	}
};

/**Image Slider Module**/
var sliderModule = {
	config: {
		sliderType: "large",
  		sliderInitEl:"button",
  		sliderId:"slider",
  		sliderOverlay:"slider_overlay",
  		sliderWrap:".bx-wrapper",
  		sliderCached:false
  	},
  	sliderOptions:{
  		largeScreen:{
  				mode:"fade",
				slideWidth:600,
  				buildPager: function(slideIndex){
    				switch(slideIndex){
      					case 0:
        					return '<img alt="Peep one" src="img/slider/thumbs/1.jpg">';
      					case 1:
       						return '<img  alt="Peep two" src="img/slider/thumbs/2.jpg">';
      					case 2:
        					return '<img  alt="Peep three" src="img/slider/thumbs/3.jpg">';
        				case 3:
        					return '<img  alt="Peep four" src="img/slider/thumbs/4.jpg">';
    				}
  				}
		},
		smallScreen:{
			mode:"fade",
			slideWidth:300,
			pager:false
		}
  	},
  	setSliderType:function(){	
  		this.config.sliderType = (loaderModule.isLargeScreen()) ? "large" : "small";
  	},
  	setupSlider:function(){
   		this.setSliderType();

  		var dis = this;
  		$(document).on( "click", this.config.sliderInitEl, function() {
  			if(dis.config.sliderCached){
  				dis.showSlider();
  			}
  			else{
  				dis.createSlider();
  			}
  		});
  	},
  	showSlider:function(){
		$(this.config.sliderWrap).show();
		$("#"+this.config.sliderOverlay).show();	
	},
	hideSlider:function(){
		$(this.config.sliderWrap).hide();
		$("#"+this.config.sliderOverlay).hide();
	},
	createSlider:function(){
		this.cteateOverlay();
		$('<ul id="'+this.config.sliderId+'"></ul>')
			.append('<li><img  alt="Peep one" src="img/slider/1-'+this.config.sliderType+'.jpg" /></li>')
			.append('<li><img  alt="Peep two" src="img/slider/2-'+this.config.sliderType+'.jpg" /></li>')
			.append('<li><img  alt="Peep three" src="img/slider/3-'+this.config.sliderType+'.jpg" /></li>')
			.append('<li><img  alt="Peep four" src="img/slider/4-'+this.config.sliderType+'.jpg" /></li>')
			.appendTo($("body"))
			.bxSlider(this.loadSliderConfig());
		this.config.sliderCached=true;
	},
	loadSliderConfig:function(){
		return (this.config.sliderType == "small") ? this.sliderOptions.smallScreen : this.sliderOptions.largeScreen
	},
	cteateOverlay:function(){
		var slider_overlay = $("<a id='"+this.config.sliderOverlay+"' href='#'>slider overlay</a>")
		slider_overlay.appendTo($("body"));
		var dis = this;
		slider_overlay.on( "click", function(e) {
			e.preventDefault();
			dis.hideSlider();
		});
	}
};
/**INIT**/
$(function() {
	sliderModule.setupSlider();
	
	/** load video background in 
		modern desktop browsers **/
	if(!Modernizr.touch && Modernizr.video){
		loaderModule.loadBackgroundVideo();
	}
});