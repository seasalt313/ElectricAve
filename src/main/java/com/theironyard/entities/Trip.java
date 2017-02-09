package com.theironyard.entities;

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
    String startLocation;

    @Column(nullable = false)
    String endLocation;

    @ManyToOne
    User user;

    public Trip(String tripName, String startLocation, String endLocation, User user) {
        this.tripName = tripName;
        this.startLocation = startLocation;
        this.endLocation = endLocation;
        this.user = user;
    }

    public Trip(String tripName, String startLocation, String endLocation) {
        this.tripName = tripName;
        this.startLocation = startLocation;
        this.endLocation = endLocation;
    }

    public String getTripName() {
        return tripName;
    }

    public void setTripName(String tripName) {
        this.tripName = tripName;
    }

    public String getStartLocation() {
        return startLocation;
    }

    public void setStartLocation(String startLocation) {
        this.startLocation = startLocation;
    }

    public String getEndLocation() {
        return endLocation;
    }

    public void setEndLocation(String endLocation) {
        this.endLocation = endLocation;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
