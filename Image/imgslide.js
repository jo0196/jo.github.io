var images = [];
images.push("aaaa.jpg")
images.push("bbbb.jpg")
images.push("cccc.jpg")
images.push("dddd.jpg")

currentImage = 0;

document.querySelector("#prevButton").addEventListener("click",function(){
    currentImage --;
    if(currentImage<0)
        currentImage = images.length -1;
    showImage();
});

document.querySelector("#nextButton").addEventListener("click",function(){
        currentImage ++;
        if(currentImage>=images.length)
            currentImage = 0;
        showImage();
});

function showImage(){
    pc = document.getElementById('pic');
    pc.src = images[currentImage];
}

