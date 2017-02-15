package com.theironyard.data;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by temp on 2/15/17.
 */
public class GeoJSON {
    public String type = "FeatureCollection";

    public List<Feature> features = new ArrayList<>();

    public static GeoJSON buildGeoJson(Geometry g) {
        GeoJSON results = new GeoJSON();

        results.features.add(new Feature(g));

        return results;
    }
}
