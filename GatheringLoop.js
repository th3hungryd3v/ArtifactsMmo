require("dotenv").config();

const server = "https://api.artifactsmmo.com";
const token = process.env.API_KEY;
//Put your character name here
const character = "d3c0y";
let cooldown;
// let timeout; // Unused Variable??

//This script is an example of how to loop each time cooldown is complete.
async function performGathering() {
  const url = server + "/my/" + character + "/action/gathering";

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + token,
  };

  return fetch(url, {
    method: "POST",
    headers: headers,
  }).then((gatheringResponse) => {
    if (gatheringResponse.status === 498) {
      console.log("The character cannot be found on your account.");
      return;
    } else if (gatheringResponse.status === 497) {
      console.log("Your character's inventory is full.");
      return;
    } else if (gatheringResponse.status === 499) {
      console.log("Your character is in cooldown.");
      return;
    } else if (gatheringResponse.status === 493) {
      console.log("The resource is too high-level for your character.");
      return;
    } else if (gatheringResponse.status === 598) {
      console.log("No resource on this map.");
      return;
    } else if (gatheringResponse.status !== 200) {
      console.log("An error occurred while gathering the resource.");
      return;
    }

    if (gatheringResponse.status === 200) {
      gatheringResponse.json().then((data) => {
        console.log("Your character successfully gathered the resource.");
        cooldown = data.data.cooldown.total_seconds;
        setTimeout(performGathering, cooldown * 1000);
      });
    }
  });
}

performGathering();
