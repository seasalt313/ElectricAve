package com.theironyard.services;

import com.theironyard.entities.Trip;
import org.springframework.data.repository.CrudRepository;

public interface TripRepository extends CrudRepository<Trip, Integer> {
    Trip findTripByUser(String userName);
    Trip findTripByTripName(String tripName);
}
