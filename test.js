// Replace with your details
const channelId = "2998470";
const apiKey = "5DZHDT3SGKHE5BKN";

// ThingSpeak URL for latest feed
const url = `https://api.thingspeak.com/channels/${channelId}/feeds/last.json?api_key=${apiKey}`;

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("Latest Feed Data:");
    console.log(`Created at: ${data.created_at}`);
    console.log(`Entry ID: ${data.entry_id}`);
    console.log(`Grain's Moisture (field1): ${data.field1}`);
    console.log(`Grain's Temp (field2): ${data.field2}`);
    console.log(`Air Humidity (field3): ${data.field3}`);
  })
  .catch(err => {
    console.error("Error fetching data:", err);
  });
