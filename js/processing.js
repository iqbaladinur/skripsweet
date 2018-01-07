/* processing.js
 * contains function to processing ImageData from canvas
 * author iqbaladinur@gmail.com
 */


/* grayscale() function
 * convert type ImageData object from Canvas to grayscale 8bit true color
 * @param {imgData} type ImageData
 */
function grayScale(imgData){
    for (var i = 0; i < imgData.data.length; i+=4) {
        var x =(imgData.data[i]+imgData.data[i+1]+imgData.data[i+2])/3;
        imgData.data[i]   = x;   //red
        imgData.data[i+1] = x;   //green
        imgData.data[i+2] = x;   //blue/
    }
    return imgData;
};

/* biner() function
 * convert type ImageData object from Canvas to black and white 8bit true color rgba(255, 255, 255, 1) or rgba(0, 0, 0, 1)
 * @param {imgData} type ImageData
 * @param {tresshold} type int
 */
function biner(imgData , tresshold = 125){

    for (var i = 0; i < imgData.data.length; i+=4) {
        var x =(imgData.data[i]+imgData.data[i+1]+imgData.data[i+2])/3;
        if (x > tresshold) {
            imgData.data[i]   = imgData.data[i+1] = imgData.data[i+2] = 255;   //rgbA    
        }else{
            imgData.data[i]   = imgData.data[i+1] = imgData.data[i+2] = 0;   //rgb
        }
    }
    return imgData;
};

/* getBinaryData() function
 * convert type ImageData object from Canvas to single array binary 0 or 1
 * @param {imgData} type ImageData
 */
function getBinaryData(imgData) {
	var binaryData = [];
	for (var i = 0; i < imgData.data.length; i+=4) {
        var x = imgData.data[i];
        if (x == 255)
        	binaryData.push(0);
        else
        	binaryData.push(1);
    }
    return binaryData;
}

/* blackAndWhiteBinary() function
 * convert type ImageData object from Canvas to single array binary -1 or 1
 * @param {imgData} type ImageData
 */
function getBipolarData(imgData) {
	var binaryData = [];
	for (var i = 0; i < imgData.data.length; i+=4) {
        var x = imgData.data[i];
        if (x == 255)
        	binaryData.push(-1);
        else
        	binaryData.push(1);
    }
    return binaryData;
}

/*pretty print array 100 x 100*/
function binaryArrayPrettyPrint(array) {
	for (var i = 100, c = 0 ; i < array.length; c++, i +=100) {
		array.splice(i + c, 0, "<br>");
	}
	var text = array.join('');
	array.length = 0;
	return text;
}