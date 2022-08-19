 //       <!-- made by Islam Tafesh +970592584234-->


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
    player = document.querySelector(".player"),
    list_items = document.querySelector(".song-List"),
    songs = list_items.querySelectorAll('.song');
    let musicIndex = Math.floor((Math.random() * allMusic.length)+1);
    isMusicPaused = true;

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

    list_btn.addEventListener("click", ()=>{
        player.classList.toggle('hidden-player');
        wrapper.classList.toggle('min_height_wrapper');
        list_items.classList.toggle('add_mr_1');
        list_items.classList.toggle('hidden-song-List');
    });

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
    
                screen.orientation.lock("landscape");

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
                screen.orientation.lock("portrait"); 

            }
        });
    
