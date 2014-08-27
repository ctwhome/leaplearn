/**
 * Created by ctw on 27/08/14.
 */
function changePages(e){
    if (e.currentTarget.getAttribute('data-button') === "help"){
        document.getElementById('index').classList.add('hide');
        document.getElementById('help').classList.remove('hide');
    }
    else{
        document.getElementById('help').classList.add('hide');
        document.getElementById('index').classList.remove('hide');
    }
}asdf