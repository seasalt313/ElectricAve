package com.theironyard.controllers;

import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.LatLng;
import com.theironyard.data.GeoJSON;
import com.theironyard.data.LineString;
import com.theironyard.entities.Trip;
import com.theironyard.entities.User;
import com.theironyard.services.TripRepository;
import com.theironyard.services.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class TriprController {

    @Autowired
    TripRepository trips;

    @Autowired
    UserRepository users;

    @RequestMapping(path ="/map/{tripName}", method = RequestMethod.GET)
    public GeoJSON directions(@RequestParam(value = "tripName") String tripName) throws Exception {
        GeoApiContext context = new GeoApiContext().setApiKey("AIzaSyBnADGOsZrhGtk1jSb8C9X49JoeG2m_KU0");
        DirectionsApiRequest directionsRequest = DirectionsApi.newRequest(context);

        Trip currentTrip = trips.findTripByTripName(tripName);

        directionsRequest.origin(currentTrip.getStartAddress());
        directionsRequest.destination(currentTrip.getEndAddress());

        DirectionsResult directionsResult = directionsRequest.await();

        List<LatLng> latlngs = directionsResult.routes[0].overviewPolyline.decodePath();

        return GeoJSON.buildGeoJson(new LineString(latlngs));
    }

//    @RequestMapping(path = "/map", method= RequestMethod.GET)
//    public GeoJSON home(@RequestParam(value = "trip") String trip) throws Exception {
//        GeoApiContext context = new GeoApiContext().setApiKey("AIzaSyBnADGOsZrhGtk1jSb8C9X49JoeG2m_KU0");
//
//        DirectionsApiRequest directionsRequest = DirectionsApi.newRequest(context);
//
//        directionsRequest.origin("222 South Church Street, Charlotte, NC");
//        directionsRequest.destination("New York, New York");
//
//        DirectionsResult directionsResult = directionsRequest.await();
//
//        List<LatLng> latlngs = directionsResult.routes[0].overviewPolyline.decodePath();
//
//        return GeoJSON.buildGeoJson(new LineString(latlngs));
//    }

    @RequestMapping(path = "/new-trip", method = RequestMethod.POST)
    public Trip addTrip(HttpSession session, @RequestBody Trip newTrip) { // add http sessions

        String emailAddress = (String) session.getAttribute("emailAddress");
        User user = users.findByEmailAddress(emailAddress);
        Trip trip = trips.findTripByTripName(newTrip.getTripName());
//        if(user != null) {
            if (trip == null) {
                trip = new Trip(newTrip.getTripName(), newTrip.getStartAddress(), newTrip.getEndAddress(), user);
                trips.save(trip);
            }
        return trip;
    }

    @RequestMapping(path = "/trip-list", method = RequestMethod.GET)
    public Iterable<Trip> tripList() {
        return trips.findAll();
    }
}
