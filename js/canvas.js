/* canvas Object by iqbal adi nur
 * 
 * 
 */
var Canvas = function (cvs) {
	
	/*canvas element*/
	this.cvs = cvs;
	this.ctx = this.cvs.getContext("2d");
	
	/*methods*/
	this.clear = function () {
		this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
	}

	this.drawFromImage = function(img) {
		this.clear();
		this.ctx.drawImage(img, 0, 0);	
	}

	this.getImageData = function(){
		return this.ctx.getImageData(0,0, this.cvs.width, this.cvs.height);
	}

	this.drawImageByData = function (data) {
		this.ctx.putImageData(data, 0, 0);
	}
}


