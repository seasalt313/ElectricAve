package com.theironyard.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.maps.model.LatLng;

import java.util.List;

/**
 * Created by temp on 2/15/17.
 */
public class LineString extends Geometry {
    public String type = "LineString";

    @JsonIgnore
    public List<LatLng> coordinates;

    @JsonProperty(value = "coordinates")
    public Double[][] getCoordinates() {
        return coordinates.stream().map(c -> {
            Double[] coords = new Double[2];

            coords[0] = c.lng;
            coords[1] = c.lat;

            return coords;
        }).toArray(Double[][]::new);
    }

    public LineString() {
    }

    public LineString(List<LatLng> coordinates) {
        this.coordinates = coordinates;
    }
}
