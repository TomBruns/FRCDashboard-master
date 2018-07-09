let autonChooserWindow = document.getElementById("autonChooserWindow"),
    autonChooserBtnContainer = document.getElementById("autonChooserBtnContainer"),
    selectedAuton = document.getElementById("selectedAuton"),
    //selectedSide = document.getElementById("selectedSide"),
    openChooserWindowBtn = document.getElementById("openChooserWindowBtn"),
    autonGroupbox = document.getElementById("auton-groupbox"),
    leftSideAutonBtn = document.getElementById("leftSideBtn"),
    rightSideAutonBtn = document.getElementById("rightSideBtn");    

// dynamically add a button object to the container
function addButton(label) {
    //Create an input type dynamically. 
    var newButton = document.createElement("BUTTON");
    newButton.value = label;

    //add the label 
    var t = document.createTextNode(label);
    newButton.appendChild(t);
    newButton.classList.add('auton-button');

    newButton.onclick = function(e) {
        var targ;
        if (!e) var e = window.event;
        if (e.target) targ = e.target;
        else if (e.srcElement) targ = e.srcElement;

        if (targ.nodeType == 3) // defeat Safari bug
            targ = targ.parentNode;

        // grab the value (selected auton) of the button
        selectedAuton.value = targ.value;
        NetworkTables.putValue('/SmartDashboard/AUTON MODE: /selected', selectedAuton.value);

        // close autonChooserWindow
        autonChooserWindow.style.visibility = 'hidden';
        autonChooserBtnContainer.style.visibility = 'hidden';
        autonChooserWindow.style.display = 'none';
        autonChooserBtnContainer.style.display = 'none';
    }

    //Append the element in page
    autonChooserBtnContainer.appendChild(newButton);
}

// dynamically add a button object to the container
function addSideButton(label) {
    //Create an input type dynamically. 
    var newButton = document.createElement("BUTTON");
    newButton.value = label;

    //add the label 
    var t = document.createTextNode(label);
    newButton.appendChild(t);
    newButton.classList.add('auton-side-button');

    newButton.onclick = function(e) {
        var targ;
        if (!e) var e = window.event;
        if (e.target) targ = e.target;
        else if (e.srcElement) targ = e.srcElement;

        if (targ.nodeType == 3) // defeat Safari bug
            targ = targ.parentNode;

        // grab the value (selected auton) of the button
        NetworkTables.putValue('/SmartDashboard/AUTON MODE: /selected', selectedAuton.value);
    }

    //Append the element in page
    autonGroupbox.appendChild(newButton);
}

//Delete Current Buttons in Button Container [prevents repeats]
function clearButtons(){
    var autonButtonList = autonChooserBtnContainer.getElementsByClassName("auton-button");

    while (autonButtonList.length > 0) {
        autonChooserBtnContainer.removeChild(autonButtonList.lastChild);
    }
}

// button _onclick handler
openChooserWindowBtn.onclick = () => {
    autonChooserWindow.style.display = 'block';
    autonChooserBtnContainer.style.display = 'block';
    autonChooserWindow.style.visibility = 'visible';
    autonChooserBtnContainer.style.visibility = 'visible';
};

leftSideAutonBtn.onclick = () => {
    NetworkTables.putValue('/SmartDashboard/AUTON STARTING SIDE: /selected', "LEFT");
    leftSideAutonBtn.style = "background-color:green;"
    rightSideAutonBtn.style = "background-color:#444;"
}

rightSideAutonBtn.onclick = () => {
    NetworkTables.putValue('/SmartDashboard/AUTON STARTING SIDE: /selected', "RIGHT");
    rightSideAutonBtn.style = "background-color:green;"
    leftSideAutonBtn.style = "background-color:#444;"
}

/*
// hide
    div.style.visibility = 'hidden';
    // OR
    div.style.display = 'none';

    // show
    div.style.visibility = 'visible';
    // OR
    div.style.display = 'block';
*/