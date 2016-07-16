function search(e,t){SC.initialize({client_id:"c381048a8c48b7a419f2be16c079f8da"}),SC.get("/tracks",{q:e,limit:t},function(e){for(var t="",i=0;i<e.length;i++)t+='<li data-link="'+e[i].permalink_url+'"><div class="panel__avatar"><img src="'+e[i].user.avatar_url+'"></div><div class="panel__title"><strong>'+e[i].title+"</strong>"+e[i].user.username+"</div></li>";$(".header__userExperience__panel").empty().html(t)})}function SoundcloudFind(e){SC.initialize({client_id:"c381048a8c48b7a419f2be16c079f8da"}),SC.get("/resolve",{url:e},function(e){musicCurrent=e,console.log("musicCurrent ",musicCurrent);var t=e.stream_url+"?client_id=c381048a8c48b7a419f2be16c079f8da";playerLaunch(t,musicCurrent)})}function playerLaunch(e,t){$(".header__userExperience__panel").empty(),pButton.classList.remove("icon-arrow"),pButton.classList.add("icon-pause-button-outline"),$(".player__cover").animate({opacity:"0"},{queue:!1,duration:500,complete:function(){null==t.artwork_url?cover="http://blog.grainedephotographe.com/wp-content/uploads/2014/03/%C2%A9-Danny-Santos-Portraits-of-Strangers-17.jpg":cover=t.artwork_url,$(".player__cover").css({background:"url("+cover+")","background-repeat":"no-repeat","background-size":"cover"}),$(".player__cover").animate({opacity:"1"},900)}}),$(".player__describe__playlist, .player__describe__title, .player__duration__time").animate({top:"50px"},{queue:!1,duration:500,complete:function(){$(".player__describe__title").text("").text(t.title),$(".player__describe__playlist").text("").text(t.user.username),$(".player__describe__playlist, .player__describe__title, .player__duration__time").animate({top:"0px"},500)}}),music.setAttribute("src",e),music.play()}function countTimeSong(){var e=music.currentTime,t="0"+Math.floor(e/60),i="0"+Math.floor(e%60),n=t.substr(-2)+":"+i.substr(-2);$(".player__duration__time").text(n)}function clickPercent(e){return(e.pageX-timeline.offsetLeft)/timelineWidth}function mouseDown(){onplayhead=!0,window.addEventListener("mousemove",moveplayhead,!0),music.removeEventListener("timeupdate",timeUpdate,!1)}function mouseUp(e){1==onplayhead&&(moveplayhead(e),window.removeEventListener("mousemove",moveplayhead,!0),music.currentTime=duration*clickPercent(e),music.addEventListener("timeupdate",timeUpdate,!1)),onplayhead=!1}function moveplayhead(e){var t=e.pageX-timeline.offsetLeft;t>=0&&t<=timelineWidth&&(playhead.style.marginLeft=t+"px",timelineCurrent.style.width=t+"px"),t<0&&(playhead.style.marginLeft="0px",timelineCurrent.style.width="0px"),t>timelineWidth&&(playhead.style.marginLeft=timelineWidth+"px",timelineCurrent.style.width=timelineWidth+"px")}function timeUpdate(){countTimeSong();var e=timelineWidth*(music.currentTime/duration);playhead.style.marginLeft=e+"px",timelineCurrent.style.width=e+"0px",music.currentTime==duration&&($("#play").removeClass("icon-pause-button-outline"),$("#play").addClass("icon-arrow"),playhead.style.marginLeft="0px",timelineCurrent.style.width="0px",modePlaylist&&(countDay(indexSongCurrent),nextPlaylist(indexSongCurrent)))}function play(){music.paused?(modePlaylist&&$(".listPlaylist__listing tr ").eq(indexSongCurrent).children().eq(0).children().removeClass("icon-arrow").addClass("icon-pause-button-outline"),music.play(),$("#play").removeClass("icon-arrow"),$("#play").addClass("icon-pause-button-outline")):($(".listPlaylist__listing tr ").eq(indexSongCurrent).children().eq(0).children().removeClass("icon-pause-button-outline").addClass("icon-arrow"),music.pause(),$("#play").removeClass("icon-pause-button-outline"),$("#play").addClass("icon-arrow"))}function initMp3Player(){context=new AudioContext,analyser=context.createAnalyser(),canvas=document.getElementById("analyser_render"),canvas.setAttribute("width",document.querySelector(".player__audioplayer").offsetWidth),ctx=canvas.getContext("2d"),source=context.createMediaElementSource(music),source.connect(analyser),analyser.connect(context.destination),frameLooper()}function frameLooper(){window.requestAnimationFrame(frameLooper),fbc_array=new Uint8Array(analyser.frequencyBinCount),analyser.getByteFrequencyData(fbc_array),ctx.clearRect(0,0,canvas.width,canvas.height);var e=ctx.createRadialGradient(0,0,50,0,150,300);e.addColorStop(0,"#65c6bb"),e.addColorStop(.5,"#4c43c4"),ctx.fillStyle=e,bars=1600;for(var t=0;t<bars;t++)bar_x=10*t,bar_width=2,bar_height=-(fbc_array[t]/2),ctx.fillRect(bar_x,canvas.height,bar_width,bar_height)}function nextPlaylist(e){if(1==modePlaylist){var t=e+1;if(canPlay(t)&&t<=totalSongPlaylist){var i=$(".listPlaylist__listing tr ").eq(t).attr("data-label");indexSongCurrent=t,SoundcloudFind(i),songSelectPlaylist(t)}else t==totalSongPlaylist?(indexSongCurrent=-1,nextPlaylist(indexSongCurrent)):(indexSongCurrent=t,nextPlaylist(indexSongCurrent))}}function previousPlaylist(e){if(1==modePlaylist){var t=e-1;if(canPlay(t)&&t>=0){var i=$(".listPlaylist__listing tr ").eq(t).attr("data-label");indexSongCurrent=t,SoundcloudFind(i),songSelectPlaylist(t)}else t<0?(indexSongCurrent=totalSongPlaylist,previousPlaylist(indexSongCurrent)):(indexSongCurrent=t,previousPlaylist(indexSongCurrent))}}function songSelectPlaylist(e){$(".listPlaylist__listing tr ").removeClass("song__active"),$(".listPlaylist__listing tr i").removeClass("icon-pause-button-outline").addClass("icon-arrow"),$(".listPlaylist__listing tr ").eq(e).addClass("song__active"),$(".listPlaylist__listing tr ").eq(e).children().eq(0).children().removeClass("icon-arrow").addClass("icon-pause-button-outline")}function canPlay(e){return"true"==$(".listPlaylist__listing tr").eq(e).attr("data-play")}function countDay(e){var t=$(".listPlaylist__listing tr").eq(e).attr("data-time"),i=t-1;0==i?($(".listPlaylist__listing tr").eq(e).attr("data-play","false"),$(".listPlaylist__listing tr").eq(e).attr("data-time",i),$(".listPlaylist__listing tr").eq(e).removeAttr("data-label")):$(".listPlaylist__listing tr").eq(e).attr("data-time",i)}var musicCurrent;$(".header__userExperience__search input").keyup(function(){var e=$(this).val();e.length>0?($(".header__userExperience__panel").show(),search(e,6)):($(".header__userExperience__panel").empty(),$(".header__userExperience__panel").hide())}),$("body").on("click",".header__userExperience__panel li",function(){SoundcloudFind($(this).data("link")),modePlaylist=!1}),$(".header__logo").click(function(){$(this).toggleClass("toggle--active"),$(".wrapper").toggleClass("wrapper--menu"),$(".menu").slideToggle(800)});var duration,modePlaylist,onLaunch=!0,music=document.getElementById("player__music"),pButton=document.getElementById("play"),playhead=document.getElementById("playhead"),timeline=document.getElementById("timeline"),timelineCurrent=document.getElementById("timeline__current"),onplayhead=!1,timelineWidth=timeline.offsetWidth-playhead.offsetWidth;music.crossOrigin="anonymous",timeline.addEventListener("click",function(e){moveplayhead(e),music.currentTime=duration*clickPercent(e)},!1),playhead.addEventListener("mousedown",mouseDown,!1),window.addEventListener("mouseup",mouseUp,!1),$("#play").click(function(){play()}),music.addEventListener("canplaythrough",function(){duration=music.duration},!1),music.addEventListener("timeupdate",timeUpdate,!1);var canvas,ctx,source,context,analyser,fbc_array,bars,bar_x,bar_width,bar_height;window.addEventListener("load",initMp3Player,!1);var totalSongPlaylist=$(".listPlaylist__listing tr").length,indexSongCurrent;$(".listPlaylist__listing tr").click(function(){if(modePlaylist=!0,indexSongCurrent=$(this).index(),canPlay(indexSongCurrent)){var e=$(this).attr("data-label");SoundcloudFind(e),songSelectPlaylist(indexSongCurrent)}else nextPlaylist(indexSongCurrent)}),$(".player__controll__prev").click(function(){previousPlaylist(indexSongCurrent)}),$(".player__controll__next").click(function(){nextPlaylist(indexSongCurrent)}),$(".listPlaylist__listing tr, #play").click(function(){onLaunch&&($(".footer").animate({opacity:1},1500),onLaunch=!1)});