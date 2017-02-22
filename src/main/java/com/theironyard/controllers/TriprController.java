package com.theironyard.controllers;


import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.LatLng;
import com.theironyard.data.ChargeStationData;
import com.theironyard.data.GeoJSON;
import com.theironyard.data.LineString;
import com.theironyard.data.Point;
import com.theironyard.entities.Trip;
import com.theironyard.entities.User;
import com.theironyard.services.TripRepository;
import com.theironyard.services.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class TriprController {

    @Autowired
    TripRepository trips;

    @Autowired
    UserRepository users;

    Trip currentTrip = new Trip();

//    @RequestMapping(path = "/get-chargers", method = RequestMethod.GET)
//    public GeoJSON  chargers() throws Exception {
//        GeoApiContext context = new GeoApiContext().setApiKey("AIzaSyBnADGOsZrhGtk1jSb8C9X49JoeG2m_KU0");
//        DirectionsApiRequest directionsRequest = DirectionsApi.newRequest(context);
//
//        currentTrip = trips.findTripById(2);
//        directionsRequest.origin(currentTrip.getStartAddress());
//        directionsRequest.destination(currentTrip.getEndAddress());
//        DirectionsResult directionsResult = directionsRequest.await();
//
//
//        List<LatLng> latlngs = directionsResult.routes[0].overviewPolyline.decodePath(); //list of latlngs
//        GeoJSON geoRoute = GeoJSON.buildGeoJson(new LineString(latlngs));
//
//        String request = "https://api.data.gov/nrel/alt-fuel-stations/v1/nearby-route.json?api_key=Af8SI3elKk9EhE9KjxEkuk71wbks21M1UtfwmoiL&distance=2.0&fuel_type=ELEC";
//        RestTemplate template = new RestTemplate();
//
//        Map<String, String> postData = new HashMap<>();
//
//        postData.put("route", String.format("LINESTRING(%s)", String.join(",",
//                latlngs.stream()
//                .map(latLng -> latLng.lng + " " + latLng.lat).collect(Collectors.toList()))));
//
//        ChargeStationData stuff = template.postForObject(request, postData, ChargeStationData.class);
//
//        stuff.getFuelStations().forEach(fs -> geoRoute.addGeometry(new Point(fs.getLatitude(), fs.getLongitude())));
//
//        return geoRoute;
//    }

    @RequestMapping(path = "/map/{id}", method = RequestMethod.GET) // returns a route based on trip params
    public GeoJSON directionsWithWaypoints(@PathVariable("id") int id) throws Exception {
        GeoApiContext context = new GeoApiContext().setApiKey("AIzaSyBnADGOsZrhGtk1jSb8C9X49JoeG2m_KU0");
        DirectionsApiRequest directionsRequest = DirectionsApi.newRequest(context);

        currentTrip = trips.findTripById(id);
        directionsRequest.origin(currentTrip.getStartAddress());
        directionsRequest.destination(currentTrip.getEndAddress());
        DirectionsResult directionsResult = directionsRequest.await(); //Object that stored the direction result

        // for each leg in the first route:
        // accumulate a distance traveled int.
        // if distance traveled is > some value (like 200)
        // 1: reset distance traveled to 0,
        // 2: add the closest energy station to the leg's start lat/lang.

        // to find the closest energy station:
        // for every energy station in your repository
        // 1: use pythagorean theorem with the lat/lng of that station
        //      and the lat/lng of the leg's start.
        // 2: the distance is less than your currently recorded smallest,
        //      update a "closest" lat/lng variable.

        // add the "closest" lat/lng variable, which is the closest energy
        // station to the beginning of a leg of your journey, to the
        // waypoints of your directionsResult object.

        // call await again to get an updated DirectionsResponse object.
        // pass the directionsResult object into your GeoJSON like below:


        List<LatLng> latlngs = directionsResult.routes[0].overviewPolyline.decodePath(); //list of latlngs
        GeoJSON geoRoute = GeoJSON.buildGeoJson(new LineString(latlngs));

        String request = "https://api.data.gov/nrel/alt-fuel-stations/v1/nearby-route.json?api_key=Af8SI3elKk9EhE9KjxEkuk71wbks21M1UtfwmoiL&distance=0.3&fuel_type=ELEC";
        RestTemplate template = new RestTemplate();

        Map<String, String> postData = new HashMap<>();

        postData.put("route", String.format("LINESTRING(%s)", String.join(",",
                latlngs.stream()
                        .map(latLng -> latLng.lng + " " + latLng.lat).collect(Collectors.toList()))));

        ChargeStationData stuff = template.postForObject(request, postData, ChargeStationData.class);

        stuff.getFuelStations().forEach(fs -> geoRoute.addGeometry(new Point(fs.getLatitude(), fs.getLongitude())));

        return geoRoute;
}

    @RequestMapping(path = "/new-trip", method = RequestMethod.POST) //adds trip related to user
    public Trip addTrip(HttpSession session, @RequestBody Trip newTrip) { // add http sessions
        String emailAddress = (String) session.getAttribute("emailAddress");
        User user = users.findByEmailAddress(emailAddress);
        Trip trip = trips.findTripById(newTrip.getId());

        if (user != null) {
            if (trip == null) {
                trip = new Trip(newTrip.getTripName(), newTrip.getStartAddress(), newTrip.getEndAddress(), user);
                trips.save(trip);
                return trip;
            }
        }
        return null;
    }

    @RequestMapping(path = "/trip-list", method = RequestMethod.GET) //returns list of trips based on the user
    public List<Trip> tripList(HttpSession session) {
        ArrayList<Trip> listOfTrips;
        String emailAddress = (String) session.getAttribute("emailAddress");
        User user = users.findByEmailAddress(emailAddress);

        if (user != null) {
            listOfTrips = trips.findTripsByUser(user);
            return listOfTrips;
        }
        return null;
    }

    @RequestMapping(path = "/account", method = RequestMethod.GET) //returns current user
    public User currentUser(HttpSession session) {
        String emailAddress = (String) session.getAttribute("emailAddress");
        User user = users.findByEmailAddress(emailAddress);
        if (user != null) {
            return user;
        }
        return null;
    }
}
