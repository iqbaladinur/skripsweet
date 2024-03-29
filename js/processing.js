/* processing.js
 * contains function to processing ImageData from canvas
 * author iqbaladinur@gmail.com
 */


/* grayscale() function
 * convert type ImageData object from Canvas to grayscale 8bit true color
 * @param {imgData} type ImageData
 */
function grayScale(imgData){
    for (let i = 0; i < imgData.data.length; i+=4) {
        var x =(imgData.data[i]+imgData.data[i+1]+imgData.data[i+2])/3;
        imgData.data[i]   = x;   //red
        imgData.data[i+1] = x;   //green
        imgData.data[i+2] = x;   //blue/
    }
    return imgData;
};

/* invertColor() function
 * convert type ImageData object from Canvas to inverted true color
 * @param {imgData} type ImageData
 */
function invertColor(imgData){
    for (let i = 0; i < imgData.data.length; i+=4) {
        imgData.data[i] = 255 - imgData.data[i];        //red
        imgData.data[i+1] = 255 - imgData.data[i+1];    //green
        imgData.data[i+2] = 255 - imgData.data[i+2];    //blue
    }
    return imgData;
};

/* biner() function
 * convert type ImageData object from Canvas to black and white 8bit true color rgba(255, 255, 255, 1) or rgba(0, 0, 0, 1)
 * @param {imgData} type ImageData
 * @param {tresshold} type int
 */
function biner(imgData , tresshold = 125){

    for (let i = 0; i < imgData.data.length; i+=4) {
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
	for (let i = 0; i < imgData.data.length; i+=4) {
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
	for (let i = 0; i < imgData.data.length; i+=4) {
        var x = imgData.data[i];
        if (x == 255)
        	binaryData.push(-1);
        else
        	binaryData.push(1);
    }
    return binaryData;
}

function binaryToBipolar(array) {
    let bipolar = [];
    array.forEach(function (el) {
        if (el == 0)
            bipolar.push(-1);
        else
            bipolar.push(1);
    })
    return bipolar;
}

function clearArray(array) {
    let clearBiner = [];
    for (let i = 0; i < array.length; i++) {
        clearBiner[i] = array[i] === -1 ? 0 : array[i];
    }
    return clearBiner;
}

/*pretty print array 100 x 100*/
function binaryArrayPrettyPrint(array) {
    //let array = clearArray(arrayInput);
    let dimen = Math.sqrt(array.length);
	for (let i = dimen, c = 0 ; i < array.length; c++, i +=dimen) {
		array.splice(i + c, 0, "<br>");
	}
	var text = array.join('');
	array.length = 0;
	return text;
}