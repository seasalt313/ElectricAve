package com.theironyard.services;

import com.theironyard.entities.Trip;
import com.theironyard.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;
import java.util.List;

public interface TripRepository extends CrudRepository<Trip, Integer> {
    Trip findTripById(int id);
    ArrayList<Trip> findTripsByUser(User user);
}
