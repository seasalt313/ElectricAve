package com.theironyard.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CurrentLocation {
    //has a list of category
    public List<Result> results;


    public CurrentLocation() {
    }

    public CurrentLocation(List<Result> results) {
        this.results = results;
    }

    public List<Result> getResults() {
        return results;
    }

    public void setResults(List<Result> results) {
        this.results = results;
    }

    @Override
    public String toString() {
        return "CurrentLocation{" +
                "results=" + results +
                '}';
    }
}
