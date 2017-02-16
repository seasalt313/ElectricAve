package com.theironyard.services;

import com.theironyard.entities.Trip;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TripRepository extends CrudRepository<Trip, Integer> {
    Trip findTripByTripName(String tripName);
}
