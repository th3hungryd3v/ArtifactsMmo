require("dotenv").config();

/*------- REQUIRED -------*/
const server = "https://api.artifactsmmo.com"; // Base URL
const token = process.env.API_KEY; // API Key
// const character = "d3c0y"; // Character Name
/*------- REQUIRED -------*/

// Character name, x location, y location
async function movement(character, x, y) { 
  const url = server + "/my/" + character + "/action/move";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({x: x, y: y}),
  };

  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

movement("d3c0y", 0, 1);
movement("bigbangboom", 0, 1)
