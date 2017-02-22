package com.theironyard.data;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by temp on 2/22/17.
 */
public class ChargeStationData {
    @JsonProperty("fuel_stations")
    private List<FuelStation> fuelStations;

    public List<FuelStation> getFuelStations() {
        return fuelStations;
    }

    public void setFuelStations(List<FuelStation> fuelStations) {
        this.fuelStations = fuelStations;
    }
}
