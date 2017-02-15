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
import com.theironyard.services.PasswordStorage;
import com.theironyard.services.TripRepository;
import com.theironyard.services.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class TriprController {

    @Autowired
    TripRepository trips;

    @Autowired
    TripRepository users;

    @RequestMapping(path ="/test-map", method = RequestMethod.GET)
    public GeoJSON town() throws Exception {
        GeoApiContext context = new GeoApiContext().setApiKey("AIzaSyBnADGOsZrhGtk1jSb8C9X49JoeG2m_KU0");
        DirectionsApiRequest directionsRequest = DirectionsApi.newRequest(context);

        Trip currentTrip = new Trip();
        currentTrip.setTripName("Test");
        currentTrip.setStartAddress("222 South Church Street, Charlotte, NC");
        currentTrip.setEndAddress("New York, New York");

        trips.save(currentTrip);

        directionsRequest.origin(trips.findTripByTripName("Test").getStartAddress());
        directionsRequest.destination(trips.findTripByTripName("Test").getEndAddress());

        DirectionsResult directionsResult = directionsRequest.await();

        List<LatLng> latlngs = directionsResult.routes[0].overviewPolyline.decodePath();

        return GeoJSON.buildGeoJson(new LineString(latlngs));
    }

    @RequestMapping(path = "/map", method= RequestMethod.GET)
    public GeoJSON home() throws Exception {
        GeoApiContext context = new GeoApiContext().setApiKey("AIzaSyBnADGOsZrhGtk1jSb8C9X49JoeG2m_KU0");

        DirectionsApiRequest directionsRequest = DirectionsApi.newRequest(context);

        directionsRequest.origin("222 South Church Street, Charlotte, NC");
        directionsRequest.destination("New York, New York");

        DirectionsResult directionsResult = directionsRequest.await();

        List<LatLng> latlngs = directionsResult.routes[0].overviewPolyline.decodePath();

        return GeoJSON.buildGeoJson(new LineString(latlngs));
    }
}
