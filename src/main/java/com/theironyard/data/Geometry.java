package com.theironyard.data;

/**
 * Created by temp on 2/14/17.
 */
public class Geometry {

    public Location location;

    public Geometry() {
    }

    public Geometry(Location location) {
        this.location = location;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "Geometry{" +
                "location=" + location +
                '}';
    }
}
