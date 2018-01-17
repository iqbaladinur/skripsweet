// Parameters
learnrate = 1
running=1

// Initialize arrays
nodes = new Array(63)
synapses = new Array(63)
for(i=0;i<63;i++) {
   nodes[i] = -1; 
   synapses[i] = new Array(63)
   for(j=0;j<63;j++){
     synapses[i][j] = 0; 
   }  
}

function Energy(place) {
   synsum = 0;
   for(i=0;i<63;i++) {
       for(j=0;j<63;j++) {
          synsum = synsum - synapses[i][j]*nodes[j]*nodes[i]; 
       }
   }
   ener1string = "document.eneraform.enera.value = " + synsum;
   ener2string = "document.enerbform.enerb.value = " + synsum;
   if(place>0) { eval(ener2string) } else { eval(ener1string) } 
   
}


function changeState(evt,row,col) {
   ind = row*7+col;
   //evt = e || window.event;
   if(! evt.shiftKey) {
       //if(nodes[ind]<0) {
       exstring = "document.i"+row+"c"+col+".src='boxb.gif'";
       nodes[ind]=1  }
   else {
       exstring = "document.i"+row+"c"+col+".src='boxt.gif'";
       nodes[ind]=-1 }
   eval(exstring);
   Energy(0);
}

function showout() { //reveal current neuro state in output
     col = -1;
     row = 0 ;
     for(ii=0;ii<63;ii++) {
          col++;
          if(col==7) {
             row++;
             col=0 }
       if(nodes[ii]==1) {
           eval("document.o"+row+"c"+col+".src='boxb.gif'") }
       else {
           eval("document.o"+row+"c"+col+".src='boxt.gif'") }
    }  
  }

function clearall() {
     row = 0;
     col = -1;
     for(i=0;i<63;i++) {
          col++;
          if(col==7) {
             row++;
             col=0 }
       nodes[i]=-1;
       eval("document.i"+row+"c"+col+".src='boxt.gif'");
       eval("document.o"+row+"c"+col+".src='boxt.gif'");
    } 
  Energy(0);
  Energy(1); 
  }

function clearin() {
     row = 0;
     col = -1;
     for(i=0;i<63;i++) {
          col++;
          if(col==7) {
             row++;
             col=0 }
       nodes[i]=-1;
       eval("document.i"+row+"c"+col+".src='boxt.gif'");
       //eval("document.o"+row+"c"+col+".src='boxt.gif'");
    } 
  //Energy(0);
  //Energy(1); 
  }

  
function resetall() {
     clearall()
     for(i=0;i<63;i++) {
        for(j=0;j<63;j++){
           synapses[i][j] = 0; 
        }  
     }
  Energy(0);
  Energy(1);
  
}
  
function learnonce() { 
   for(i=0;i<63;i++) {
      for(j=0;j<63;j++){
         synapses[i][j] = synapses[i][j] + learnrate*nodes[i]*nodes[j]; 
       }
   }
  showout();
  Energy(1);
  clearin();
}



function runonce() {
   for(col=0;col<7;col++) {
      for(row=0;row<9;row++) {
         ind = row*7+col;
   
         synsum = 0;
         for(j=0;j<63;j++) {
            synsum = synsum + synapses[ind][j]*nodes[j]; 
         }
   
      if(synsum>0) {
         nodes[ind]=1  }
      else {
         nodes[ind]=-1 }
    }} //end loops
}

function ranrunonce() {
   row = Math.floor(9*Math.random() );
   col = Math.floor(7*Math.random() );
   ind = row*7+col;
   
   synsum = 0;
   for(j=0;j<63;j++) {
      synsum = synsum + synapses[ind][j]*nodes[j]; }
   
      if(synsum>0) {
         nodes[ind]=1  }
      else {
         nodes[ind]=-1 }
}



function runnet() {
   runonce();
   showout();
   Energy(1);

}

function rannet(runamount) {
   showout();
   for(jj=0;jj<runamount;jj++) {
      ranrunonce(); }
   
   showout();
   Energy(1);

}