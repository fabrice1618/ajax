
var _xmlHttp = null; //l'objet xmlHttpRequest utilisé pour contacter le serveur
var _spantemp = null;

// Fonction executee au moment du chargement de la page
window.onload = function(){
    _spantemp = document.getElementById('spantemp');

    mainLoop();
}

// tourne en permanence pour suggérer suite à un changement du champ texte
function mainLoop(){

    temp = callTemperature();

    console.log(temp);

  setTimeout("mainLoop()",20000); // la fonction mainLoop() se redéclenchera dans 200 ms
  return true
}

// Recherche sur l'API des sugestions correspondant à la saisie dans le champ input
function callTemperature(){
    var temp = 0;
    var token = "--TOKEN--"

  // Annule une precedente requete si elle n'avait pas ete terminee
  if(_xmlHttp&&_xmlHttp.readyState!=0){
    _xmlHttp.abort()
  }

  // declare un nouvel objet
  _xmlHttp= new XMLHttpRequest();

  if(_xmlHttp){
//    console.log('appel='+valeur);
    _xmlHttp.open("GET","http://api.openweathermap.org/data/2.5/weather?lat=45.41315&lon=4.3866&appid="+token+"&units=metric",true);
    // gestionnaire d'evenement pour readystate
    // Fonction anonyme de callback quand readystate change de valeur
    _xmlHttp.onreadystatechange=function() {
      if(_xmlHttp.readyState===4&&_xmlHttp.status === 200) {
          // readystate=4 -> la requete est terminee
          // Status = 200 code HTTP 200 la requete a abouti

          // Decodage resultat json et stockage dans un tableau javascript
          var meteo = JSON.parse(_xmlHttp.responseText);
          console.log(meteo);
      }
    };
    // envoi de la requête
    _xmlHttp.send(null)
  }

  return(temp);
}


