require("dotenv").config();

const server = "https://api.artifactsmmo.com"; // Base URL
const token = process.env.API_KEY; // API Key
//Put your character name here
const character = "d3c0y";

async function movement() {
  const url = server + "/my/" + character + "/action/move";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: '{"x":0,"y":0}', //change the position here
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
