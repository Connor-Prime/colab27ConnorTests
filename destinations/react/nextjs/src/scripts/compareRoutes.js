import { useState, useEffect } from 'react'
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps"
import { getWaypointArray } from '../scripts/waypointFromString';
// import { getRouteTime } from '../scripts/compareRoutes';
// export function compareRoutes(){

//     let testArray=[]

//     testArray=getWaypointArray();
//     console.log(testArray);
    
//     for(let i=0;i<testArray.length-1;i++){
//         let routeString = testArray[i]+"~to~"+testArray[i+1];


//     }
// }

// getRouteTime("Oakland", "San Fransisco, CA")
    
export async function getRouteTime(start, end, directionsService){

  directionsService.route({
     
    //   origin: start,
    //   // waypoints: [
    //   //   { location: "oceanside, ca" }, 
    //   //   { location: "temecula, ca" },
    //   //   { location: stops }  
    //   // ],
    
      origin:start,
    //   waypoints: testArray
      
    //   [
    //     { location: "oceanside, ca" }, 
    //     { location: "temecula, ca" },
    //     { location: 'San Diego, CA' }  
    // ]
     
    // ,
      destination:end,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    })
    .then((res) => {
    //   directionsRenderer.setDirections(res);
    //   setRoutes(res.routes);

      let durationSum=0;
      let minuteSum=0;

      for(let i=0;i<res.routes.length;i++){
        for(let j=0; j< res.routes[i].legs.length;j++){
            durationSum= durationSum+res.routes[i].legs[j].duration.value;
            minuteSum= minuteSum+Math.ceil(res.routes[i].legs[j].duration.value/60);
        }
      }
      
    //   console.log("About "+Math.round(durationSum/60)+" minutes");
      console.log(minuteSum+" minutes");
      console.log(durationSum);
    
    })
    .catch(error => {
        console.log(error("error fetching directions:", error))
    })
}
    
  

