package com.theironyard.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.theironyard.data.GeoJSON;
import org.springframework.stereotype.Controller;

import javax.persistence.*;

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
    GeoJSON routeForChargers;

    @JsonIgnore
    @ManyToOne
    User user;


    public Trip() {
    }

    public Trip(String tripName, String startAddress, String endAddress) {
        this.tripName = tripName;
        this.startAddress = startAddress;
        this.endAddress = endAddress;
    }

    public Trip(int id) {
        this.id = id;
    }

    public Trip(int id, String tripName, String startAddress, String endAddress) {
        this.id = id;
        this.tripName = tripName;
        this.startAddress = startAddress;
        this.endAddress = endAddress;
    }

    public Trip(GeoJSON routeForChargers) {
        this.routeForChargers = routeForChargers;
    }

    public Trip(String tripName, String startAddress, String endAddress, User user) {
        this.tripName = tripName;
        this.startAddress = startAddress;
        this.endAddress = endAddress;
        this.user = user;
    }

    public Trip(int id, String tripName, String startAddress, String endAddress, User user) {
        this.id = id;
        this.tripName = tripName;
        this.startAddress = startAddress;
        this.endAddress = endAddress;
        this.user = user;
    }

    public GeoJSON getRouteForChargers() {
        return routeForChargers;
    }

    public void setRouteForChargers(GeoJSON routeForChargers) {
        this.routeForChargers = routeForChargers;
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}