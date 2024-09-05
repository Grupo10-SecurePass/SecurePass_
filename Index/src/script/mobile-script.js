$(document).ready(function(){
    $('#mobile_btn').on('click', function(){
        $('#mobile_menu').toggleClass('active')
        $('#mobile_btn').find('i').toggleClass('fa-x')
    })
})


window.addEventListener('scroll', function() {
    let header = document.querySelector('#header')
    header.classList.toggle('rolagem', window.scrollY > 0)
})