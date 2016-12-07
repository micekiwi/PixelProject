$(function() {
  document.getElementById('image').crossOrigin="Anonymous"
    $('img').mousemove(function(e) {

        if(!this.canvas) {
            this.canvas = $('<canvas />')[0];
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
        }

        var pixelData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;

        $('#output').html('R: ' + pixelData[0] + '<br>G: ' + pixelData[1] + '<br>B: ' + pixelData[2] + '<br>A: ' + pixelData[3]);

        //Set waveform
        var oscillator = context.createOscillator(); // Create sound source
        oscillator.connect(context.destination); // Connect sound to output
        oscillator.type = "sine"; // sine wave
        oscillator.frequency.value = colorCompare(pixelData); // frequency in hertz
        oscillator.start(0); // Play instantly
    });

 //set primary colors ROYGBIV to corresponding frequency values
var colorNotes =  [392,449,467,523,587,600,659,700];

//declare array with ideal color values
var idealRGBarray ={
"Red": [255,0,0],
"Orange": [255,127,0],
"Yellow": [255,255,0],
"Green": [60,255,0],
"Blue": [0,0,255],
"Indigo": [60,60,255],
"Violet": [100,0,180],
"Black": [0,0,0]
}
//compare pixel color to ideal color
function colorCompare(pixelRGB){
  var arrayDiffs =[]; //create empty array
  for(array in idealRGBArray) {
    var tempArray =[] //stores 3 pixel values
    tempArray.push(tempArray[0]-pixelRGB[0]);
    tempArray.push(tempArray[1]-pixelRGB[1]);
    tempArray.push(tempArray[2]-pixelRGB[2]);
    arrayDiffs.push(Math.abs(tempArray[0]+tempArray[1]+tempArray[2]));  //adds difference to arrayDiffs
  }

//compares differnce in RBG value to ideal color index
  var lowestDiff = 1000;
  var lowestDiffIndex = 0;
  arrayDiffs.forEach(function(element,index) {
     if(element < lowestDiff){
     lowestDiff=element;
     lowestDiffIndex=index;
     }
  });
  return colorNotes[lowestDiffIndex];
}

});
