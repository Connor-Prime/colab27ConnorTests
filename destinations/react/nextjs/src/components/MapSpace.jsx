import { useState, useEffect } from 'react'
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps"
import { getWaypointArray } from '../scripts/waypointFromString';
import { getRouteTime } from '../scripts/compareRoutes';

export default function DirectionMapSpace() {
      const position = {
        lat: 32.748994,
        lng: -117.231647
    }

    return (
      <div style={{height: "100vh", width: "100%"}}>
        <APIProvider apiKey='AIzaSyAR-r8GJmwcm-9s2gqKkKHa3K4Km145a7Q'
        >

          <Map  ></Map>
            <Directions />
        </APIProvider>  
      </div>
    )

}

function Directions( {start, stops }){
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes')
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([])
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex]
  // const leg = selected?.legs[0];


  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    let testArray=[]

    testArray=getWaypointArray();
    console.log(testArray);

    getRouteTime("82 Eucalyptus Rd, Berkeley, CA 94705","Fisherman's Wharf, San Francisco, CA",directionsService);

    directionsService.route({
     
      // origin: start,
      // waypoints: [
      //   { location: "oceanside, ca" }, 
      //   { location: "temecula, ca" },
      //   { location: stops }  
      // ],

      origin: sessionStorage.getItem("startPoint"),
      waypoints: testArray
      
    //   [
    //     { location: "oceanside, ca" }, 
    //     { location: "temecula, ca" },
    //     { location: 'San Diego, CA' }  
    // ]
     
    ,
      destination:sessionStorage.getItem("startPoint"),
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    })
    .then((res) => {
      directionsRenderer.setDirections(res);
      setRoutes(res.routes);
      console.log(routes)

    })
    .catch(error => {
        console.log(error("error fetching directions:", error))
    })
  }, [directionsService, directionsRenderer]);

 



}



// import { useState, useEffect } from 'react'
// import {
//   APIProvider,
//   Map,
//   useMapsLibrary,
//   useMap,
//   Marker,
// } from "@vis.gl/react-google-maps"

// export default function MapSpace() {
//   // const [currentLocation, setCurrentLocation] = useState(null);

//       const position = {
//         lat: 32.748994,
//         lng: -117.231647
//     }

    

//     return (
//       <div style={{height: "100vh", width: "100%"}}>
//         <APIProvider apiKey='AIzaSyAR-r8GJmwcm-9s2gqKkKHa3K4Km145a7Q'
//         >

//           <Map center={position} zoom={7}>
//           <Marker position={position} />
//           </Map>
//           <Marker />
//         </APIProvider>  
//       </div>
//     )

// }

    // useEffect(() => {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     setCurrentLocation({
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude,
    //     });
    //   });
    // }, []);
