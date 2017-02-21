package com.theironyard.entities;

import com.fasterxml.jackson.annotation.*;

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

    @OneToOne
    Map map;

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

    public Trip(String tripName, String startAddress, String endAddress, Map map, User user) {
        this.tripName = tripName;
        this.startAddress = startAddress;
        this.endAddress = endAddress;
        this.map = map;
        this.user = user;
    }

    public Map getMap() {
        return map;
    }

    public void setMap(Map map) {
        this.map = map;
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