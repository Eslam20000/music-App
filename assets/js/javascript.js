 //       <!-- made by Islam Tafesh +970592584234-->
 allMusic = Motivation;
const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector("img"),
    musicName = wrapper.querySelector(".name"),
    musicArtist = wrapper.querySelector(".artist"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    mainAudio = wrapper.querySelector("#main-audio"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar"),
    list_btn =  wrapper.querySelector(".fi-sr-list").parentElement,
    player = document.querySelectorAll(".player"),
    list_items = document.querySelector(".song-List"),
    title_page = wrapper.querySelector('.p-now'),
    img_area_player = wrapper.querySelector('.img-area').querySelector('img');
    let musicIndex = Math.floor((Math.random() * allMusic.length)+1);
    isMusicPaused = true;

    var songs = list_items.querySelectorAll('.song');
    var box_grid_item_color = document.querySelectorAll('.box-grid-item-color');
    var grid_div = document.querySelector('.grid');
    const song_list_item = document.querySelector('.song-list-item');

    window.addEventListener("load",()=>{
        loadMusic(musicIndex);
    });

    function loadMusic (indexNumb) {
        musicName.innerText = allMusic[indexNumb - 1].name;
        musicArtist.innerText = allMusic[indexNumb -1].artist;
        musicImg.src=`assets/images/${allMusic[indexNumb - 1].src}.jpg`;
        mainAudio.src=`assets/audio/${allMusic[indexNumb - 1].src}.mp3`;
    }

    function playMusic () {
        wrapper.classList.add("paused");
        musicImg.classList.add("rotate");
        playPauseBtn.innerHTML = `<i class="fi fi-sr-pause"></i>`;
        mainAudio.play();
    }
 //       <!-- made by Islam Tafesh +970592584234-->
    function pauseMusic () {
        wrapper.classList.remove("paused");
        musicImg.classList.add("rotate");
        playPauseBtn.innerHTML = `<i class="fi fi-sr-play"></i>`;
        mainAudio.pause();
    }

    function prevMusic() {
        musicIndex--;
        musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
        loadMusic(musicIndex);
        playMusic();
    }
 //       <!-- made by Islam Tafesh +970592584234-->
    function nextMusic() {
        musicIndex++;
        musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
        loadMusic(musicIndex);
        playMusic();
    }
 //       <!-- made by Islam Tafesh +970592584234-->
    playPauseBtn.addEventListener("click", ()=> {
        const isMusicPlay = wrapper.classList.contains("paused");
        isMusicPlay ? pauseMusic() : playMusic();
    });

    prevBtn.addEventListener("click", ()=>{
        prevMusic();
    });
 //       <!-- made by Islam Tafesh +970592584234-->
    nextBtn.addEventListener("click", ()=>{
        nextMusic();
    });

    mainAudio.addEventListener("timeupdate" , (e)=>{
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        let progressWidth = (currentTime / duration) * 100;
        progressBar.style.width = `${progressWidth}%`;

        let musicCurrentTime = wrapper.querySelector(".current-time"),
            musicDuration = wrapper.querySelector(".max-duration");
        
        mainAudio.addEventListener("loadeddata", ()=>{
            let mainAdDuration = mainAudio.duration;
            let totalMin = Math.floor(mainAdDuration / 60);
            let totalSec = Math.floor(mainAdDuration % 60);
            if(totalSec < 10) {
                totalSec = `0${totalSec}`;
            }

            musicDuration.innerText = `${totalMin}:${totalSec}`;

        });
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if(currentSec < 10) {
            currentSec = `0${currentSec}`;
        }
        musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
    });
 //       <!-- made by Islam Tafesh +970592584234-->
    progressArea.addEventListener("click", (e)=>{
        let progressWidth = progressArea.clientWidth;
        let clickedOffsetX= e.offsetX;
        let SongDuration = mainAudio.duration;

        mainAudio.currentTime = (clickedOffsetX / progressWidth) * SongDuration;
        playMusic();
    });

    mainAudio.addEventListener("ended" , ()=> {
        nextMusic();
    });

 //       <!-- made by Islam Tafesh +970592584234-->



 /*   Here the code of the list of music    */
    
    Category_clicked = false;

    list_btn.addEventListener("click", ()=>{
        for (let player_num = 0; player_num < player.length; player_num++) {
            player[player_num].classList.toggle('hidden-player');
        }
        wrapper.classList.toggle('min_height_wrapper');
        list_items.classList.toggle('add_mr_1');
        list_items.classList.toggle('hidden-song-List');

        if(!Category_clicked){
            title_page.innerText = "Select Mode";
            Category_clicked = true;
        }else {
            title_page.innerText = "Playing now";
            Category_clicked = false;
        }

    });


    /* Here the list of the color for the category*/
    var grid_colors = [
     '#dc3545','#0d6efd','#0dcaf0','#d63384','#fd7e14',
     '#6f42c1','#198754','#20c997','#ffc107'
    ];

    
    for (let ii = 0; ii < box_grid_item_color.length ; ii++) {
        box_grid_item_color[ii].style.color = grid_colors[ii];
        box_grid_item_color[ii].style.borderColor = grid_colors[ii];
    }

    for (let box_grid_item = 0; box_grid_item < box_grid_item_color.length ; box_grid_item++) {
        box_grid_item_color[box_grid_item].addEventListener("click", function() {
                    for(let box_grid_item_hide = 0 ; box_grid_item_hide<box_grid_item_color.length ; box_grid_item_hide++)
                    box_grid_item_color[box_grid_item_hide].classList.toggle('box-grid-item-color-hide');
                    
                    box_grid_item_color[box_grid_item].classList.toggle('box-grid-item-color-hide');
                    grid_div.classList.toggle('grid-hide')
                    allMusic=category_mods[box_grid_item_color[box_grid_item].id];
                    clear_list_items();
                    fetch_all_music();
                    songs = list_items.querySelectorAll('.song');
                    song_played();
                    check_is_song_played_now();
        });
    }
 
    function add_color_box_grid_item () {
        
        for (var i = 0; i < box_grid_item_color.length; ++i) {
            box_grid_item_color[i].style.color = grid_colors[i];
            box_grid_item_color[i].style.borderColor = grid_colors[i];
          }

    }

    function clear_list_items () {
        song_list_item.innerHTML='';
    }


    function fetch_all_music (){

        for (var song_item = 0 ; song_item < allMusic.length ; ++song_item){
        
        let name = allMusic[song_item].name;
        let artist = musicArtist.innerText = allMusic[song_item].artist;
        let src = allMusic[song_item].src;
            var name_of_music_for_now = wrapper.querySelector(".name");
            var Song='';
        if(name == name_of_music_for_now.innerText){
             Song = `<div class="song">
                    <div class="song-info">
                        <div class="song-photo">
                            <img src="./assets/images/${src}.jpg" alt="">
                        </div>
                        <div class="song-information">
                            <div class="song-name">
                                ${name}
                            </div>
                            <div class="song-artist">
                                ${artist}
                            </div>
                        </div>
                    </div>
                    <div class="song-played played">
                        <i class="fi fi-sr-play"></i>
                    </div>
                </div>`;
        }
        else {
             Song = `<div class="song">
                <div class="song-info">
                    <div class="song-photo">
                        <img src="./assets/images/${src}.jpg" alt="">
                    </div>
                    <div class="song-information">
                        <div class="song-name">
                            ${name}
                        </div>
                        <div class="song-artist">
                            ${artist}
                        </div>
                    </div>
                </div>
                <div class="song-played">
                    <i class="fi fi-sr-play"></i>
                </div>
            </div>`;
        }

        

            song_list_item.insertAdjacentHTML(
                'beforeend',
                Song
              );

        }
    }


function song_played (){


    for (let i = 0; i < songs.length; i++) {
        songs[i].addEventListener("click", function() {
            musicIndex=i+1;
            loadMusic(musicIndex);
            playMusic();
            for (let j = 0; j < songs.length; j++) {
                songs[j].querySelector(".song-played").classList.remove("played");
            }
            songs[i].querySelector(".song-played").classList.add("played")
        });
    }
}

function check_is_song_played_now () {

}

song_played();

    /* Here the code of make full screen when click at full screen btn */

   

     let myDocument = document.documentElement;
     let btn = document.getElementById("full_sec");
     var btn_fullScreen_clicked=false;
     btn.addEventListener("click", ()=>{
         if(!btn_fullScreen_clicked){
             if (myDocument.requestFullscreen) {
                    myDocument.requestFullscreen();
                } 
                else if (myDocument.msRequestFullscreen) {
                    myDocument.msRequestFullscreen();
                } 
                else if (myDocument.mozRequestFullScreen) {
                    myDocument.mozRequestFullScreen();
                }
                else if(myDocument.webkitRequestFullscreen) {
                    myDocument.webkitRequestFullscreen();
                }
    
                screen.orientation.lock('portrait-primary');

                img_area_player.style.maxWidth  = '40vh';

                btn_fullScreen_clicked = true;
            }
            else{
                if(document.exitFullscreen) {
                    document.exitFullscreen();
                }
                else if(document.msexitFullscreen) {
                    document.msexitFullscreen();
                }
                else if(document.mozexitFullscreen) {
                    document.mozexitFullscreen();
                }
                else if(document.webkitexitFullscreen) {
                    document.webkitexitFullscreen();
                }
                btn_fullScreen_clicked = false;
                screen.orientation.lock('portrait-primary');

                img_area_player.style.maxWidth  = null;


            }
        });

        screen.addEventListener("orientationchange", () => {
            console.log(`The orientation of the screen is: ${screen.orientation}`);
          });
    
