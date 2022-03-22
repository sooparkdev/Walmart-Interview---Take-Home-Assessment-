 
async function loadUsers() {
    let response = await fetch('https://jsonplaceholder.typicode.com/users')
    let userJson = await response.json();
    console.log(userJson);

    let userHTML = userJson.map(user => {
        return `
        <div id="user-single" class="tooltip" onclick="loadUserPage()">
            <p> <a href="/userInfo.html?userId=${encodeURIComponent(user.id)}">${user.name}</a> </p>
            <span class="tooltiptext"> 
                <p> Username: ${user.username} </p>
                <p> Email: ${user.email} </p>
            </span>
        </div>`
    }).join("<br>")
    console.log(userHTML);

    document.getElementById("user-list").innerHTML = userHTML;
}



// async function loadUserPage() {
//     // redirect to the userInfo page
//     location.href = "/userInfo.html"

// }

// async function uploadData(){
//     // get the data that the user typed in
//     // let myData = {}
    
//     // myData.first_name = document.getElementById("user-list").value

//     // myData.last_name = document.getElementById("last_name_input").value

//     // myData.favorite_ice_cream = document.getElementById("favorite_ice_cream_input").value

//     //load user list from server
//     let response = await fetch("/users");
//     let userJson = await response.json();

//     //allItemIds = itemsJson.map(itemInfo => itemInfo._id);

//     //display users
//     let userHTML = userJson.map(user => {
//         return `
//         <hr>
//         <div>
//             <p>Item: ${user.name}</p>
//         </div>`
//     }).join("<hr>")

//     document.getElementById("user-list").innerHTML = userHTML; 

//     // see what the server said
// }