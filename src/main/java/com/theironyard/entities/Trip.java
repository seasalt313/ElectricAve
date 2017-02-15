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
    String startAddress;

    @Column(nullable = false)
    String endAddress;

    @ManyToOne
    User user;


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