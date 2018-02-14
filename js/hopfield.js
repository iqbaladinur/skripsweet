/**
 * Pattern is a class contains trained pattern on the hopfield neural network
 * the object store input pattern and the labels
 */

function Pattern(arrayOfPattern, labelName, trueval = null){
	this.pattern = arrayOfPattern;
	this.label   = labelName;
	this.trueVal = (trueval)||this.countTrue();
}

/**
 * [compare description]
 * @param  {[array]} input [array of compared]
 * @return {[number]}      [amount of matching pattern]
 */
Pattern.prototype.compare = function(input) {
	if (input.length !== this.pattern.length)
		throw "pattern length not match, shoulf be match!";
	/*do compare here*/
	let matches_vector = 0;
	for (let i = 0; i < this.pattern.length; i++) {
		matches_vector += this.pattern[i] === input[i] && this.pattern[i] === 1 ? 1 : 0;
	}

	return matches_vector;
}

Pattern.prototype.countTrue = function(){
	let count = 0;
	for (let i = 0; i < this.pattern.length; i++) {
		count += this.pattern[i] === 1 ? 1 : 0;
	}

	return count;
}


/**
 * Node is a single hopfield node class. Each node takes in the weight array
 * which denotes the connectivity of the node.
 */
function Node(weights, activation, index) {
	this.weights = weights; // Weight vector as a javacript array
	this.activation = activation; // The activation of the node
	this.index = index; // Position in the network
}

/**
 * addTransposedPattern will take in a new pattern and add it to the current weights.
 * newPattern will contain the transposed bit pattern for the matrix. The 
 * transposition should happen before this point otherwise the network will
 * not store the weights correctly.
 */
Node.prototype.addTransposedPattern = function(newPattern) {
	if (newPattern.length !== this.weights.length)
		throw "Node " + this.index + ": has a different sized weight vector than the new pattern";
	// Make sure the self connection is zeroed
	newPattern[this.index] = 0;
	for (var i = 0; i < this.weights.length; i++) {
		this.weights[i] += newPattern[i];
	}
}

/**
 * calculateActivation takes in the activations of all the nodes and then
 * updates the nodes activation based on the hopfield regeneration algorithm.
 * calculateActivation returns the new activation for the node.
 */
Node.prototype.calculateActivation = function(activations) {
	var sum = 0;
	var newActivation = 0;
	for (var i = 0; i < activations.length; i++) {
		sum += activations[i] * this.weights[i];
	}
	if (sum > 0)
		newActivation = 1;
	/*if (sum == 0)
		newActivation = 0;*/
	if (sum <= 0)
		newActivation = -1;
	this.activation = newActivation;
	return newActivation;		
}

/**
 * HopfieldNetwork is a hopfield network built using object oriented principles
 */
function HopfieldNetwork(nodeNum=4) {
	this.nodeNum = nodeNum; // Number of nodes that is in the network
	this.nodes = []; // Array to contain the nodes
	this.pattern = []; // Array to contain the learned patterns
	this.costToRecover = 0;
}

/**
 * [getSavedPattern description] return whole saved pattern
 * @return {[type]} [description] array of pattern object
 */
HopfieldNetwork.prototype.getSavedPattern = function() {
	return this.pattern;
}

/**
 * [getCost description] get the loop cost, must be call after recover method
 * @return {[type]} [description]
 */
HopfieldNetwork.prototype.getCost = function() {
	return this.costToRecover;
}

/**
 * pushPatternLabeled will save pattern learned in network object for checking later
 * @param  {[array]} pattern [binary array of pattern]
 * @param  {[string]} label  [String text for naming the pattern]
 * @return {[void]}
 */
HopfieldNetwork.prototype.pushPatternLabeled = function(pattern, label) {
	this.pattern.push(new Pattern(pattern, label));
}

/**
 * [compareOutput description] compareOutput from recover check the best matched pattern that was learned
 * @param  {[array]} outputArray [binary array of output pattern]
 * @return {[object]}            [return object of matched pattern]
 */
HopfieldNetwork.prototype.compareOutput = function(outputArray) {
	const sum = (accumulator, currentValue) => accumulator + currentValue;
	let countAllMatches = [];
	if (outputArray.reduce(sum) !== 0) {
		/*compate pattern here*/
		for (let i = 0; i < this.pattern.length; i++) {
			countAllMatches[i] = this.pattern[i].compare(outputArray);
		}
		const indexOfMatchedPattern = countAllMatches.indexOf(Math.max.apply(Math, countAllMatches));

		const matchedPattern = {
			matchValue : countAllMatches[indexOfMatchedPattern],
			totalValue : this.pattern[indexOfMatchedPattern].trueVal,
			label: this.pattern[indexOfMatchedPattern].label
		}

		return matchedPattern;
	}else{
		return false;
	}
}

/*
 * saveCurrentData will return json of nodes object that actually contains trained data
 */
HopfieldNetwork.prototype.saveCurrentData = function() {
	/*const jsonNode = JSON.stringify(this.nodes);
	return jsonNode;*/
	var jsonCurrentState = {
		nodes: this.nodes,
		savedPattern: this.pattern
	};

	return JSON.stringify(jsonCurrentState);
}

/*
 * importData will import nodes object that contains data to initialized network
 */
HopfieldNetwork.prototype.importData = function(nodes, pattern) {
	this.nodes = [];
	this.pattern = [];
	for (let i = 0; i < nodes.length; i++) {
		this.nodes[i] = new Node(nodes[i].weights, nodes[i].activations, nodes[i].index );
	}

	for (let i = 0; i < pattern.length; i++) {
		this.pattern[i] = new Pattern(pattern[i].pattern, pattern[i].label, pattern[i].trueVal);
	}

	this.convertByCurrentAct(this.getActivations());
	console.log("loaded");
}

/**
 * initialiseNodes will create all of the nodes for the hopfield network and
 * give them default values.
 */
HopfieldNetwork.prototype.initialiseNodes = function() {
	var activation = 0;
	for(var i = 0; i < this.nodeNum; i++) {
		var weights = [];
		for(var j = 0; j < this.nodeNum; j++) { // new weight array each time
			weights[j] = 0;
		}
		var nodeWeights = weights.slice(); // Shallow copy of zeroed weights
		this.nodes[i] = new Node(weights, activation, i);
	}

	this.pattern = [];
}

/**
 * addPattern will add an aditional pattern to the network. The pattern should
 * be in the form of an array and should contain the same number of elements as
 * the network has nodes. Otherwise the function will return an error.
 */
HopfieldNetwork.prototype.addPattern = function(patternArray) {
	if(typeof patternArray === 'undefined' || 
			patternArray === null ||
			patternArray.length !== this.nodeNum) { // Check if the pattern is ok
		throw "Bad Pattern!";
	}
	var newPattern = []; // The transposed pattern to add the node weights
	for (var i = 0; i < patternArray.length; i++) {
		// Calculate the transpose for the node i
		for (var j = 0; j < patternArray.length; j++) {
			newPattern[j] = patternArray[i] * patternArray[j];
			if (i === j)
				newPattern[j] = 0;
		}
		this.nodes[i].addTransposedPattern(newPattern);
	} 
}

/**
 * addActivationsPattern will add a new pattern to the network based on the 
 * current activations for the nodes.
 */
HopfieldNetwork.prototype.addActivationsPattern = function() {
	return this.addPattern(this.getActivations());
}

/**
 * setActivations will set the activations of the nodes in the network.
 */
HopfieldNetwork.prototype.setActivations = function(activations) {
	if (activations.length !== this.nodes.length) {
		throw "Number of activations does not match number of network nodes!";
	}
	for (var i = 0; i < this.nodes.length; i++) {
		this.nodes[i].activation = activations[i];
	}
}

HopfieldNetwork.prototype.convertByCurrentAct = function (activations) {
	if (activations.length !== this.nodes.length)
		throw "Number of activations does not match number of network nodes!";

	for (var i = 0; i < this.nodes.length; i++) {
		if (this.nodes[i].activation === 0 && activations[i] === 0 ) {
			this.nodes[i].activation = 0
		}else if(this.nodes[i].activation === 1 && activations[i] === 0) {
			this.nodes[i].activation = -1
		}else if(this.nodes[i].activation === -1 && activations[i] === 0) {
			this.nodes[i].activation = -1
		}else{
			this.nodes[i].activation = 1
		}
	}	
}

/**
 * getActivations will return an array of all the activations in order of the
 * nodes.
 */
HopfieldNetwork.prototype.getActivations = function() {
	var activations = [];
	for (var i = 0; i < this.nodes.length; i++)
		activations[i] = this.nodes[i].activation;
	return activations;
}

/**
 * recover will run the hopfield recovery algorithm until the activations of
 * the nodes no longer change and the network has converged. recover will then
 * return an array of the activations.
 */
HopfieldNetwork.prototype.recover = function() {
	var nodeChanged = true;
	var activations = this.getActivations();
	this.costToRecover = 0;
	while (nodeChanged) {
		nodeChanged = false; // reset nodeChanged each loop
		var nodeOrder = this.nodes.slice(0); // nodes copy
		// loop through all the nodes in the network randomly
		while (nodeOrder.length != 0) {
			var ri = Math.floor(Math.random() * nodeOrder.length);
			var node = nodeOrder[ri];
			var act = node.calculateActivation(activations);
			nodeOrder.splice(ri, 1); // remove the node
			if (act !== activations[node.index]) {
				nodeChanged = true;
				activations[node.index] = act;
				this.costToRecover ++;
			}
		}
	}
	return activations;
}