function SoundcloudFind(e){SC.initialize({client_id:"c381048a8c48b7a419f2be16c079f8da"}),SC.get("/resolve",{url:e},function(e){musicCurrent=e,console.log("musicCurrent ",musicCurrent);var t=e.stream_url+"?client_id=c381048a8c48b7a419f2be16c079f8da";playerLaunch(t,musicCurrent)})}function playerLaunch(e,t){$(".header__userExperience__panel").empty(),pButton.classList.remove("icon-arrow"),pButton.classList.add("icon-pause-button-outline"),$(".player__describe__playlist, .player__describe__title").animate({top:"50px"},{queue:!1,duration:500,complete:function(){$(".player__describe__title").text("").text(t.title),$(".player__describe__playlist, .player__describe__title").animate({top:"0px"},500),music.setAttribute("src",e),music.play()}})}function clickPercent(e){return(e.pageX-timeline.offsetLeft)/timelineWidth}function mouseDown(){onplayhead=!0,window.addEventListener("mousemove",moveplayhead,!0),music.removeEventListener("timeupdate",timeUpdate,!1)}function mouseUp(e){1==onplayhead&&(moveplayhead(e),window.removeEventListener("mousemove",moveplayhead,!0),music.currentTime=duration*clickPercent(e),music.addEventListener("timeupdate",timeUpdate,!1)),onplayhead=!1}function moveplayhead(e){var t=e.pageX-timeline.offsetLeft;t>=0&&t<=timelineWidth&&(playhead.style.marginLeft=t+"px",timelineCurrent.style.width=t+"px"),t<0&&(playhead.style.marginLeft="0px",timelineCurrent.style.width="0px"),t>timelineWidth&&(playhead.style.marginLeft=timelineWidth+"px",timelineCurrent.style.width=timelineWidth+"px")}function timeUpdate(){var e=timelineWidth*(music.currentTime/duration);playhead.style.marginLeft=e+"px",timelineCurrent.style.width=e+"0px",music.currentTime==duration&&($("#play").removeClass("icon-pause-button-outline"),$("#play").addClass("icon-arrow"),playhead.style.marginLeft="0px",timelineCurrent.style.width="0px")}function play(){music.paused?(music.play(),$("#play").removeClass("icon-arrow"),$("#play").addClass("icon-pause-button-outline")):(music.pause(),$("#play").removeClass("icon-pause-button-outline"),$("#play").addClass("icon-arrow"))}function initMp3Player(){context=new AudioContext,analyser=context.createAnalyser(),canvas=document.getElementById("analyser_render"),ctx=canvas.getContext("2d"),source=context.createMediaElementSource(music),source.connect(analyser),analyser.connect(context.destination),frameLooper()}function frameLooper(){window.requestAnimationFrame(frameLooper),fbc_array=new Uint8Array(analyser.frequencyBinCount),analyser.getByteFrequencyData(fbc_array),ctx.clearRect(0,0,canvas.width,canvas.height),ctx.fillStyle="#65c5ba",bars=100;for(var e=0;e<bars;e++)bar_x=3*e,bar_width=2,bar_height=-(fbc_array[e]/2),ctx.fillRect(bar_x,canvas.height,bar_width,bar_height)}function search(e,t){SC.initialize({client_id:"c381048a8c48b7a419f2be16c079f8da"}),SC.get("/tracks",{q:e,limit:t},function(e){for(var t="",a=0;a<e.length;a++)t+='<li data-link="'+e[a].permalink_url+'"><div class="panel__avatar"><img src="'+e[a].user.avatar_url+'"></div><div class="panel__title"><strong>'+e[a].title+"</strong>"+e[a].user.username+"</div></li>";$(".header__userExperience__panel").empty().html(t)})}var musicCurrent;$("body").on("click",".header__userExperience__panel li",function(){SoundcloudFind($(this).data("link")),$(".header__userExperience__panel").hide(),$(".header__userExperience__bar").val("")}),$(".header__logo").click(function(){$(this).toggleClass("toggle--active"),$(".wrapper").toggleClass("wrapper--menu"),$(".menu").slideToggle(800)});var music=document.getElementById("player__music"),duration,pButton=document.getElementById("play"),playhead=document.getElementById("playhead"),timeline=document.getElementById("timeline"),timelineCurrent=document.getElementById("timeline__current"),timelineWidth=timeline.offsetWidth-playhead.offsetWidth;music.crossOrigin="anonymous",music.addEventListener("timeupdate",timeUpdate,!1),timeline.addEventListener("click",function(e){moveplayhead(e),music.currentTime=duration*clickPercent(e)},!1),playhead.addEventListener("mousedown",mouseDown,!1),window.addEventListener("mouseup",mouseUp,!1);var onplayhead=!1;$("#play").click(function(){play()}),music.addEventListener("canplaythrough",function(){duration=music.duration},!1);var canvas,ctx,source,context,analyser,fbc_array,bars,bar_x,bar_width,bar_height;window.addEventListener("load",initMp3Player,!1),$(".header__userExperience__search input").keyup(function(){var e=$(this).val();e.length>0?($(".header__userExperience__panel").show(),search(e,6)):($(".header__userExperience__panel").empty(),$(".header__userExperience__panel").hide())});