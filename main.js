video = "";
Status = "";
objetos =[]; 

function preload(){
    video = createVideo('video.mp4');
    video.hide();
}

 function setup(){
    canvas = createCanvas(600, 400);
    canvas.center();
 }

 function draw(){
    image(video, 0, 0, 600, 400);
    if(Status != ""){
      detector.detect(video, gotResults);
      for(i = 0; i < objetos.length; i++){
         document.getElementById("status").innerHTML = "Status: Objetos detectados";
         document.getElementById("n_items").innerHTML = "Numero de objetos detectados :  " + objetos.length;
         fill("#00ff00");
         porcentaje = floor(objetos[i].confidence *100);
         text(objetos[i].label + " " + porcentaje + "%", objetos[i].x + 15, objetos[i].y + 15);
         noFill();
         stroke("#ff0000");
         rect(objetos[i].x, objetos[i].y, objetos[i].width, objetos[i].height);
      }
    }
 }

 function start(){
    detector = ml5.objectDetector('cocossd' , modelloaded);
    document.getElementById("status").innerHTML = "Estado: detectando objetos";
 }

 function modelloaded(){
    console.log("Modelo cargado");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0); 
 }

function gotResults(error, results){
   if(error){
      console.log(error);
   }
   console.log(results);
   objetos = results;
} 