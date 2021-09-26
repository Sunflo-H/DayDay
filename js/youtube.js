addEventListener('load', function () {
    let videoListBox = document.querySelector('.video-list-box');
    let youtubeBox = document.querySelector('.youtube-box');
    let video = document.querySelector('.video');
    let setting = document.querySelector('.setting');
    let listBox = document.querySelectorAll('.list-box');
    let removeVideoButton = document.querySelectorAll('.remove-video-button');
    let form = document.querySelector('.form');
    let addVideoButton = document.querySelector('.add-video-button');
    let title = document.querySelector('#title');
    let src = document.querySelector('#src');
    let check = document.querySelector('#check');

    addVideoButton.addEventListener('click', () => {
        videoListBox.insertAdjacentHTML(
            "beforeend",
            `<div class="list-box">
            <span>${title.value}</span>
            <input type="button" value="X" class="remove-video-button">
        </div>`
        )
        // console.log(videoListBox.lastElementChild.lastElementChild);
        // videoListBox.lastElementChild.lastElementChild.classList.add('remove-video-button');
        // 제거버튼 갱신
        removeVideoButton = document.querySelectorAll('.remove-video-button');
        //함수도 갱신
        removeclick();
        console.log(removeVideoButton);
    })
    let removeclick = function () {
        for (let i = 0; i < removeVideoButton.length; i++) {
            removeVideoButton[i].addEventListener('click', () => {
                console.log(removeVideoButton[i].parentElement);
                console.log(removeVideoButton);
                if (this.confirm("정말 삭제하시겠습니까?") == true) {
                    removeVideoButton[i]
                        .parentElement
                        .remove();
                } else {
                    return;
                }
            })
        }
    }

    removeclick();
    setting.addEventListener('click', function () {
        if (check.checked == false) {
            console.log("체크!");
            console.log(check.checked);
            youtubeBox
                .classList
                .remove('open-youtube');
            youtubeBox
                .classList
                .add('close-youtube');
            setTimeout(function () {
                youtubeBox
                    .classList
                    .add('open-setting');
                youtubeBox
                    .classList
                    .remove('close-youtube');

                video
                    .classList
                    .add('hidden');
                form
                    .classList
                    .remove('hidden');
            }, 1100);
        } else {
            console.log("체크!");
            console.log(check.checked);
            youtubeBox
                .classList
                .add('close-setting');
            youtubeBox
                .classList
                .remove('open-setting');

            setTimeout(function () {
                // youtubeBox     .classList     .remove('close-youtube');
                youtubeBox
                    .classList
                    .add('open-youtube');
                youtubeBox
                    .classList
                    .remove('close-setting');

                video
                    .classList
                    .remove('hidden');
                form
                    .classList
                    .add('hidden');
            }, 1100);
        }

    })

})
// let openYoutube=document.querySelector('#open'); let
// closeYoutube=document.querySelector('#close');
// openYoutube.addEventListener('click',()=>{
// youtubebox.classList.add('open-youtube');
// youtubebox.classList.remove('close-youtube'); })
// closeYoutube.addEventListener('click',()=>{
// youtubebox.classList.add('close-youtube');
// youtubebox.classList.remove('open-youtube'); })