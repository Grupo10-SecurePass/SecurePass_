function senha() {

    if (ver_senha.checked == true){
        input_senha.type = "text";
        olhoFechado.style.display = "flex";
        olhoAberto.style.display = "none";

    }else{
        input_senha.type = "password";
        olhoFechado.style.display = "none";
        olhoAberto.style.display = "flex";

    }

}