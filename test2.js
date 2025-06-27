async function getStateName(lat, lon) {
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
  const data = await response.json();
  
  // Extract state (or similar) from address
  const state = data.address.state || data.address.region || data.address.county;
  console.log("State:", state);
  
  return state;
}

// Example usage
getStateName(22.5699518, 88.4296796); // Coordinates of New Delhi
