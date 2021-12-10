const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanet = [];


function isHabitable(planet) {
    return planet["koi_disposition"] === "CONFIRMED"
    && planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11 && planet["koi_prad"] < 1.6
}

fs.createReadStream("kepler_data.csv")
.pipe(parse({
        comment : "#" ,
        columns : true,
    }))
.on("data" , (data) => {
    if(isHabitable(data)){
        habitablePlanet.push(data)
    }
})
.on("error" , (err) => {
    console.log(err);
})
.on("end" , () =>{
    console.log(`${habitablePlanet.length} habitablePlanets found`);
    console.log(habitablePlanet.map((planet) => {
        return planet["kepler_name"]
    }))
})
  

// parse only deals with stream dat why we need our fs (node modules)