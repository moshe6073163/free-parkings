const API_KEY = "0d1d8fa39ae14774b80d34e9c2fe719e";
var requestOptions = { method: "GET" };

// auto complete
export function location(input, setData) {
  fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${API_KEY}`, requestOptions)
    .then((response) => response.json())
    .then((result) =>{
      setData(result.features != undefined ? result.features : []);
   } )
    .catch((error) => console.log("error", error));
  }

  // get current location
  export function getCurrLoc(geo, setData){
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${geo.lat}&lon=${geo.lon}&format=json&apiKey=${API_KEY}`, requestOptions)
    .then((response) => response.json())
    .then((result) =>{
      setData(result.results[0]);
    })
    .catch((error) => console.log("error", error));
  }

  
