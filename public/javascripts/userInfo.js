
async function loadUserPage() {
   loadUserProfile();
   loadUserPost();
   loadUserAlbum();
}

async function loadUserProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    let response = await fetch(`userApi/profile?userId=${encodeURIComponent(userId)}`); // sends to the server to fetch;
    let userJson = await response.json();
    console.log(userJson);
    document.getElementById("nameRetrieved").innerHTML = userJson.name
    document.getElementById("usernameRetrieved").innerHTML = userJson.username
    document.getElementById("emailRetrieved").innerHTML = userJson.email
    document.getElementById("phoneRetrieved").innerHTML = userJson.phone
    document.getElementById("websiteRetrieved").innerHTML = userJson.website
}


async function loadUserPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    //let postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    let postResponse = await fetch(`userApi/posts?userId=${encodeURIComponent(userId)}`);
    let postJson = await postResponse.json();

    let postHTML = postJson.map(post => {
        return `
        <div id="individual-post">
            <button onclick='updatePost("${post.id}")' id="updateBtn"> Update </button>
            <button onclick='deletePost("${post.id}")' id="deleteBtn"> Delete </button>
            <h3> ${post.title} </h3>
            <p> ${post.body} </p>
            <button onclick='toggleComments("${post.id}")'> Comments </button>
            <div id='commentBox-${post.id}' class="comment-box d-none">
                <div id='existingComments-${post.id}'></div>
                    <p><strong> New Comment: </strong></p>
                    <textarea type="textbox-title" id="new-title-${post.id}"> </textarea>
                    <textarea type="textbox-body" id="new-body-${post.id}"> </textarea>
                    <button onclick='postComment("${post.id}")' id="postBtn">Post Comment</button>
                </div>
            </div>
        </div>
        `
    }).join("\n");

    document.getElementById("user-posts").innerHTML = postHTML;
}


async function toggleComments(postId) {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    let commentBox = document.getElementById(`commentBox-${postId}`);

    if (!commentBox.classList.contains("d-none")) {
        commentBox.classList.add("d-none");
    } else{
        commentBox.classList.remove("d-none");
        let existingComments = document.getElementById(`existingComments-${postId}`);
        if(existingComments.innerHTML == ""){ // load comments if not yet loaded
            try{
                let commentResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
                let commentJson = await commentResponse.json();

                let commentHTML = commentJson.map(comment => {
                    return `
                    <div id="individual-comment">
                        <span><strong> Name: </strong> ${comment.name} </span>
                        <a href=${comment.email}>${comment.email}</a>
                        <p> ${comment.body} </p>
                    </div>
                    `
                }).join("\n");
            
                existingComments.innerHTML = commentHTML;

            } catch(error){
                commentsElement.innerText ="error" + error
            }            
        }
    }
    
}


async function postComment(postId) {
    let newCommentTitle = document.getElementById(`new-title-${postId}`).value;
    let newCommentBody = document.getElementById(`new-body-${postId}`).value;
    console.log(newCommentTitle);
    console.log(newCommentBody);


    let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: newCommentTitle,
            body: newCommentBody,
            userId: 1,
            postId: postId
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        let responseJson = await response.json();
        console.log(responseJson) // GETS FEEDBACK
        loadUserPost();
  
}


async function updatePost(postId) {
    
}


async function deletePost(postId) {
    try{
        fetch(`https://jsonplaceholder.typicode.com/posts?postId=${postId}`, {
            method: 'DELETE',
            // body: JSON.stringify({postId: postId}),
            // headers: {'Content-Type': 'application/json'}
        });
        loadUserPost();
    } catch(error){
        console.log("Error:" + error);
    }
}

async function loadUserAlbum() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    let response = await fetch(`userApi/albums?userId=${encodeURIComponent(userId)}`); // sends to the server to fetch;
    let albumJson = await response.json();

    let albumHTML = albumJson.map(album => {
        return `
        <div id="individual-album" onclick='loadPhotos("${album.id}")'>
            <a href="/userAlbum.html?albumId=${encodeURIComponent(album.id)}">${album.title}</a> 
        </div>
        `
    }).join("\n");
    
    document.getElementById("user-album").innerHTML = albumHTML;
}


async function loadPhotos() {
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('albumId');
    let response = await fetch(`userApi/photos?albumId=${encodeURIComponent(albumId)}`); // sends to the server to fetch;
    let photoJson = await response.json();
    console.log(photoJson)

    let photoHTML = photoJson.map(photo => {
        return `
        <div id="individual-photo">
            <img src=${photo.url} alt="Paris">
            <p> ${photo.title} </p>
        </div>
        `
    }).join("\n");

    document.getElementById("photoContainer").innerHTML = photoHTML;
}