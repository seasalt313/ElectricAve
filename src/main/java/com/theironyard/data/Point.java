package com.theironyard.data;


/**
 * Created by temp on 2/15/17.
 */

public class Point extends Geometry {
    public String type = "Point";
    public double[] coordinates = new double[2];

    public Point(double lat, double lng) {
        coordinates[1] = lat;
        coordinates[0] = lng;
    }
}
