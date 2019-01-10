document.addEventListener("DOMContentLoaded", launchAPI);

function getCurrentTab() {
    return browser.tabs.query({currentWindow: true, active:true});
}

function hideIcons(){
    $("#icon-toma").hide();
}

function launchAPI() {
    hideIcons()
    getCurrentTab().then((tab) => {
       var url = tab[0].url;

       var xhr = new XMLHttpRequest();
       xhr.open("GET", "https://toma.ht/backend/api/v0.1/request/?link="+url, true);
       xhr.send();

       xhr.onreadystatechange = function(){
            if (this.readyState == 4){
                if (this.status == 200) {
                    // success
                    data = JSON.parse(this.responseText);

                    if(data.error){
                        var recommandation = data.message;
                    }else if(data.has_ressources){
                        var recommandation = data.recommandations;

                        recommandation = recommandation.split("<br/><br/>");
                        recommandation = recommandation.slice(0,2);
                        recommandation = recommandation.join("<br/><br/>");

                    }

                    $("#spinner-area").remove();
                    $("#logo-text").remove();
                    $("#logo-toma").remove();
                    $("#icon-toma").show();

                    $("#recommandation-title").html("Recommandations");
                    $("#recommandation-text").html(recommandation);

                }else{
                    // Error
                    $("#spinner-area").remove();
                    $("#recommandation-title").html("Erreur");
                    $("#recommandation-text").html("Erreur côté serveur. Veuillez recommencer");

                }

            }
       }
   
    })
}