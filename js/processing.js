function grayScale(imgData){
    for (var i = 0; i < imgData.data.length; i+=4) {
        var x =(imgData.data[i]+imgData.data[i+1]+imgData.data[i+2])/3;
        imgData.data[i]   = x;   //red
        imgData.data[i+1] = x;   //green
        imgData.data[i+2] = x;   //blue/
    }
    return imgData;
};

function biner(imgData , treshold = 125){

    for (var i = 0; i < imgData.data.length; i+=4) {
        var x =(imgData.data[i]+imgData.data[i+1]+imgData.data[i+2])/3;
        if (x > treshold) {
            imgData.data[i]   = imgData.data[i+1] = imgData.data[i+2] = 255;   //rgbA    
        }else{
            imgData.data[i]   = imgData.data[i+1] = imgData.data[i+2] = 0;   //rgb
        }
    }
    return imgData;
};

function blackAndWhiteBinary(imgData) {
	var binaryData = [];
	for (var i = 0; i < imgData.data.length; i+=4) {
        var x = imgData.data[i+2];
        if (x == 255)
        	binaryData.push(0);
        else{
        	binaryData.push(1);
        } 
    }
    return binaryData;
}

function makeText(array) {
	var text=null;
	array.forEach( function(element, index) {
		text = text + element;
		if (index != 0 && index % 200 == 0)
			text = text + "<br>";
	});
	return text;
}