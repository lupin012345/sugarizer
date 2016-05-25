define(["sugar-web/datastore"], function(){
    var datastore = require("sugar-web/datastore")
    var filePicker = {};
    
    filePicker.hidden = true;

    filePicker.close = function(){
	var modal = document.getElementById("filepicker-modal");

	if (modal === undefined)
	    console.error("No filepicker-modal found to display the files");
	else
	    modal.style.visibility = "hidden";
	filePicker.hidden = true;
    }

    filePicker.sendFileToCallBack = function(image){
	filePicker.callback(image);
	filePicker.close();
    }

    filePicker.browseImages = function(callback){
	filePicker.callback = callback;
	var images = filePicker.getImages();
	var modal = document.getElementById("filepicker-modal");

	if (filePicker.hidden == true){
	    if (modal === undefined)
		console.log("No filepicker-modal found to display the files");
	    else
	    {
		modal.style.visibility = "visible";
		modal.innerHTML = "";
		modal.innerHTML += "<div class='filepicker-toolbar'>"+
		    "<button class='filepicker-button-close' id='filepicker-close'/></div"
		for (var i = 0; i < images.length; i++){
		    modal.innerHTML += "<div class='filepicker-image'>"+images[i].outerHTML+"</div>";
		}
	    }
	    var imagesDiv = document.getElementsByClassName("filepicker-image");
	    
	    for (var i = 0;i < imagesDiv.length; i++)
	    {
		imagesDiv[i].onclick = function(){filePicker.sendFileToCallBack(this.getElementsByTagName('img')[0].src)};
	    }
		     
	    document.getElementById("filepicker-close").onclick = filePicker.close;
	    filePicker.hidden = false;
	}
    };
    
    filePicker.getImages = function(){
	var images = [];
	
	if (datastore.localStorage !== undefined){    
	    var files = filePicker.getFiles();
	    console.log(files);
	    for (var key in files) {
		if (files.hasOwnProperty(key)) {
		    if (typeof JSON.parse(files[key]) == "string"){
			if (files[key].indexOf("data:image") > -1){
			    img = new Image();
			    img.src = JSON.parse(files[key]);
			    images.push(img);
			}
		    }
		}
	    }
	}
	else {
	    console.log("Localstorage is empty");
	}
	return images;
    };

    filePicker.getImagesWithCallBack = function(callback){
	callback(filePicker.getImages())
    }

    filePicker.getDataStoreEntries = function(){
	if (datastore.localstorage !== undefined)
	{
	    datastoreorg.olpcfrance.MediaViewerActivity
	}
    }
    
    filePicker.getFiles = function(){
	return datastore.localStorage.getAll();
    }
    
    return filePicker;
});
