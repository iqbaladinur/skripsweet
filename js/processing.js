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

/* blackAndWhiteBinary() function
 * convert type ImageData object from Canvas to single array binary 0 or 1
 * @param {imgData} type ImageData
 */
function blackAndWhiteBinary(imgData) {
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

/*pretty print array 200 x 200*/
function binaryArrayPrettyPrint(array) {
	for (var i = 200, c = 0 ; i < array.length; c++, i +=200) {
		array.splice(i + c, 0, "<br>");
	}
	return array.join('');
}