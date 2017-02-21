package com.theironyard.entities;


import javax.persistence.*;

/**
 * Created by temp on 2/20/17.
 */
@Entity
@Table(name = "maps")
public class Map {
    @Id
    @GeneratedValue
    int id;

    @Column(columnDefinition="text")
    String routeString;

    @OneToOne
    Trip trip;

    public Map() {
    }

    public Map(int id, String routeString, Trip trip) {
        this.id = id;
        this.routeString = routeString;
        this.trip = trip;
    }

    public Map(String routeString, Trip trip) {
        this.routeString = routeString;
        this.trip = trip;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRouteString() {
        return routeString;
    }

    public void setRouteString(String routeString) {
        this.routeString = routeString;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }
}
