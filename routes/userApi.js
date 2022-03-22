import express from 'express';
import fetch from 'node-fetch';

var router = express.Router();

/* GET users listing. */
router.get('/profile', async function(req, res) { 
  let userId = req.query.userId;
  try {
    let response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    let userJson = await response.json();
    res.json(userJson);
  } catch (error) {
    res.json({"status": "error", "error": error}); 
  }
});

router.get('/posts', async function(req, res) { 
  let userId = req.query.userId;
  try {
    let postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    let postJson = await postResponse.json();
    res.json(postJson);
  } catch (error) {
    res.json({"status": "error", "error": error}); 
  }
});

router.get('/albums', async function(req, res) { 
  let userId = req.query.userId;
  try {
    let albumResponse = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
    let albumJson = await albumResponse.json();
    res.json(albumJson);
  } catch (error) {
    res.json({"status": "error", "error": error}); 
  }
});

router.get('/photos', async function(req, res) { 
  let albumId = req.query.albumId;
  try {
    let photoResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
    let photoJson = await photoResponse.json();
    res.json(photoJson);
  } catch (error) {
    res.json({"status": "error", "error": error}); 
  }
});


router.get('/deletePost', async function(req, res) { 
  let postId = req.query.postId;
  try{
    let response = fetch(`https://jsonplaceholder.typicode.com/posts?postId=${postId}`, {
      method: 'DELETE',
      body: JSON.stringify({postId: postId}),
      headers: {'Content-Type': 'application/json'}
    });
    let responseJson = await response.json();
    res.json({"status": "success"})
  } catch(error){
      console.log("Error:" + error);
  }
})


export default router;