require("dotenv").config();

const server = "https://api.artifactsmmo.com";
const token = process.env.API_KEY;
//Put your character name here
const character = "bigbangboom";
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
  }).then(async (gatheringResponse) => { // Added async to the callback
    switch (gatheringResponse.status) {
      case 498:
        console.log("The character doesn't exist on your account.");
        return;
      case 497:
        console.log(character + "'s" + " inventory is full.");
        await movement(-2, -3); // This works as intended
        return;
      case 499:
        console.log(character + " is in cooldown.");
        return;
      case 493:
        console.log(character + "'s level is too low for this resource.");
        return;
      case 598:
        console.log("No resource on this map.");
        return;
      default:
        if (gatheringResponse.status !== 200) {
          console.log(
            "An error occurred while gathering the resource or Muigetsu did something again."
          );
          return;
        }
        console.log(character + " successfully gathered the resource.");
        gatheringResponse.json().then((data) => {
          cooldown = data.data.cooldown.total_seconds;
          setTimeout(performGathering, cooldown * 1000);
        });
    }
  });
}

async function movement(x, y) {
  const url = server + "/my/" + character + "/action/move";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ x: x, y: y }),
  };

  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

performGathering();
