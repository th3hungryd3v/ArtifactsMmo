require("dotenv").config();

/*------- REQUIRED -------*/
const server = "https://api.artifactsmmo.com"; // Base URL
const token = process.env.API_KEY; // API Key
const character = "d3c0y"; // Character Name
/*------- REQUIRED -------*/

async function movement() {
  const url = server + "/my/" + character + "/action/move";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: '{"x":3,"y":1}', //change the position here
  };

  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

movement();