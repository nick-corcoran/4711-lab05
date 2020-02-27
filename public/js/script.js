

function clearArtistFields() {
    var name = document.getElementById("AName").value = "";
    var about = document.getElementById("AAbout").value = "";
    var image = document.getElementById("AImage").value = "";

}

function displayArtistFields() {
    var obj = document.getElementById("aFields")
    var obj2 = document.getElementById("ArtistBox");
    if (obj.style.display == "flex") {
        obj.style.display = "none";
        obj2.style.display = "flex";
        clearArtistFields();
    }
    else {
        obj.style.display = "flex";
        obj2.style.display = "none"
    }

}

function submitFields() {
    var name = document.getElementById("AName").value;
    var about = document.getElementById("AAbout").value;
    var image = document.getElementById("AImage").value;
    if (name.length == 0 || about.length == 0 || image.length == 0) {
        alert("Please Make Sure all fields have input")
    }
    else if (about.length > 40) {
        alert("about cannot be greater than 40")
    }
    else {
        addNewArtistToServer(name, about, image)
        clearArtistFields();
        document.getElementById("aFields").style.display = "none";
    }


}

function deleteArtist(id) {
    console.log(id);
    let url = new URL("https://comp-4711-lab5.herokuapp.com/delete");
    let params = { "id": id }
    url.search = new URLSearchParams(params).toString();
    fetch(url)
        .then(response => response.json())
        .then(data => {
            var array = data;
            console.log(data);
            document.getElementById("ArtistBox").innerHTML = "";
            for (var k = 0; k < array.length; k++) {
                console.log("inside")
                addArtist(array[k].name, array[k].description, array[k].image, k);
            }
        })
        .catch(err => console.log("error reading"))

}



function addNewArtistToServer(name, about, image, count) {
    var artist = { "name": name, "description": about, "image": image, "id": count }
    fetch("https://comp-4711-lab5.herokuapp.com/new",
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(artist)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("ArtistBox").innerHTML = "";
            var array = data;
            for (var k = 0; k < array.length; k++) {
                console.log("inside")
                addArtist(array[k].name, array[k].description, array[k].image, k);
            }
        })
        .catch(err => console.log("error reading"))
}


function search() {
    var searchText = document.getElementById("DirInput").value.toLowerCase();
    console.log("search: " + searchText);
    var array = document.getElementsByTagName("h3");
    for (var k = 0; k < array.length; k++) {
        var word = array[k].textContent.toLowerCase();
        console.log(word);
        if (!(word.includes(searchText))) {
            document.getElementById(k).parentNode.parentNode.style.display = "none";
        }
        else if (searchText.includes(searchText)) {
            document.getElementById(k).parentNode.parentNode.style.display = "flex";
        }
    }
    document.getElementById("DirInput").value = "";
}



function addArtist(name, about, imageURL, count) {

    var artistContainer = document.getElementById("ArtistBox");
    var artist = document.createElement("div");
    artist.classList = "Artist";
    var image = document.createElement("img");
    image.src = imageURL;
    var infoDiv = document.createElement("div");
    var h3 = document.createElement("h3");
    h3.textContent = name;
    h3.id = "h" + count;
    var ptag = document.createElement("p");
    ptag.textContent = about;
    var bDiv = document.createElement("div");
    var button = document.createElement("button");
    button.classList = "delete";
    button.id = count;
    button.textContent = "delete";
    button.addEventListener("click", function () { deleteArtist(button.id) });
    artistContainer.appendChild(artist);
    artist.appendChild(image);
    artist.appendChild(infoDiv);
    artist.appendChild(bDiv);
    infoDiv.appendChild(h3);
    infoDiv.appendChild(ptag);
    bDiv.appendChild(button);
    artistContainer.style.display = "flex";
}



