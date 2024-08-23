$(document).ready(function(){
    $('#mobile_btn').on('click', function(){
        $('#mobile_menu').toogleClass('active')
        $('#mobile_btn').find('i').toogleClass('fa-x')
    })
})