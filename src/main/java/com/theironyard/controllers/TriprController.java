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


    @RequestMapping(path = "/show-map/{id}", method = RequestMethod.GET)
    public GeoJSON directions(@RequestParam(value = "id") int id) throws Exception {
        GeoApiContext context = new GeoApiContext().setApiKey("AIzaSyBnADGOsZrhGtk1jSb8C9X49JoeG2m_KU0");
        DirectionsApiRequest directionsRequest = DirectionsApi.newRequest(context);

        Trip currentTrip = trips.findTripById(id);
        //Waypoint chargeStations = waypoints.findWaypointsByTrip(currentTrip)

        directionsRequest.origin(currentTrip.getStartAddress());
        //directionsRequest.waypoints(chargeStations)
        directionsRequest.destination(currentTrip.getEndAddress());


        DirectionsResult directionsResult = directionsRequest.await();

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
        List<LatLng> latlngs = directionsResult.routes[0].overviewPolyline.decodePath();

        return GeoJSON.buildGeoJson(new LineString(latlngs));
    }

    @RequestMapping(path = "/new-trip", method = RequestMethod.POST)
    public Trip addTrip(HttpSession session, @RequestBody Trip newTrip) { // add http sessions

        String emailAddress = (String) session.getAttribute("emailAddress");
        User user = users.findByEmailAddress(emailAddress);
        Trip trip = trips.findTripById(newTrip.getId());
        if (user != null) {
            if (trip == null) {
                trip = new Trip(newTrip.getTripName(), newTrip.getStartAddress(), newTrip.getEndAddress(), user);
                trips.save(trip);
            }
            return trip;
        }
        return null;
    }

//        @RequestMapping(path = "/trip-list", method = RequestMethod.GET)
//        public Iterable<Trip> tripList () {
//            return trips.findAll();
//        }
}
