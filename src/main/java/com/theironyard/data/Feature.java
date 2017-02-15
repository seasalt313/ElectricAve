package com.theironyard.data;

import java.util.HashMap;

/**
 * Created by temp on 2/15/17.
 */

public class Feature {
    public String type = "Feature";
    public Geometry geometry;
    public HashMap<String, String> properties;

    public Feature() {
    }

    public Feature(Geometry geometry) {
        this.geometry = geometry;
    }
}
