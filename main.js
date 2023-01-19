//import the fs module from the node.js library, which allows you to read and write files
const fs = require("fs");

//read data from the files:
let followers_json = fs.readFileSync("followers.json");
let following_json = fs.readFileSync("following.json");

//parse the data and turn into JS object
followers_json = JSON.parse(followers_json);
following_json = JSON.parse(following_json);

//create an array to store the users who don't follow you back
let following_list = [];

//add all users you follow to the array
for (following of following_json["relationships_following"]) {
  following_list.push(following["string_list_data"][0]["value"]);
}

//if the user is following you back remove them from the array
for (follower of followers_json["relationships_followers"]) {
  if (following_list.includes(follower["string_list_data"][0]["value"])) {
    let index = following_list.indexOf(
      follower["string_list_data"][0]["value"]
    );
    following_list.splice(index, 1);
  }
}

//return all users who do not follow you back
for (user of following_list) {
  console.log(user);
}
