package com.theironyard.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.theironyard.data.CurrentLocation;
import org.springframework.web.client.RestTemplate;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "trips")
public class Trip {
    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false)
    String tripName;

    @Column(nullable = false)
    String startAddress;

    @Column(nullable = false)
    String endAddress;

    @Column(nullable = false)
    Double latitude;

    @Column(nullable = false)
    Double longitude;


    @ManyToOne
    User user;

    @JsonIgnore
    public void setLatLongValues() {
        Map<String, String> urlParms = new HashMap<>();
        urlParms.put("accessKey", System.getenv("GOOGLE_API_KEY"));
        urlParms.put("start-address", getStartAddress());
        urlParms.put("end-address", getEndAddress());
        CurrentLocation startLocation = new RestTemplate().getForObject("https://maps.googleapis.com/maps/api/geocode/json?address={start-address}&key={accessKey}", CurrentLocation.class, urlParms);
        CurrentLocation endLocation = new RestTemplate().getForObject("https://maps.googleapis.com/maps/api/geocode/json?address={end-address}&key={accessKey}", CurrentLocation.class, urlParms);

        if (startLocation.getResults().size() >= 1) {
            this.latitude = startLocation.getResults().get(0).getGeometry().getLocation().getLat();
            this.longitude = startLocation.getResults().get(0).getGeometry().getLocation().getLng();
        }

        if (endLocation.getResults().size() >= 1) {
            this.latitude = endLocation.getResults().get(0).getGeometry().getLocation().getLat();
            this.longitude = endLocation.getResults().get(0).getGeometry().getLocation().getLng();
        }
    }

    public Trip() {
    }

    public Trip(String tripName, String startAddress, String endAddress) {
        this.tripName = tripName;
        this.startAddress = startAddress;
        this.endAddress = endAddress;
    }

    public String getTripName() {
        return tripName;
    }

    public void setTripName(String tripName) {
        this.tripName = tripName;
    }

    public String getStartAddress() {
        return startAddress;
    }

    public void setStartAddress(String startAddress) {
        this.startAddress = startAddress;
    }

    public String getEndAddress() {
        return endAddress;
    }

    public void setEndAddress(String endAddress) {
        this.endAddress = endAddress;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public int getId() {
        return id;
    }

    public User getUser() {
        return user;
    }
}