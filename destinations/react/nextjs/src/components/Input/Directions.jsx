import { useState, useEffect } from 'react'
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps"
// import ParentComponent from '../ParentComponent'

export default function DirectionMapSpace(startLocation, stops) {
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

function Directions( {startLocation, stops } ){
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

    directionsService.route({
     
      origin: startLocation,
      waypoints: stops.map(stop => ({ location: stop })),
      destination: stops[stops.length - 1],
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
  }, [directionsService, directionsRenderer, start, stops]);

 return null;
}

