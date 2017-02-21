package com.theironyard.services;

import com.theironyard.entities.Map;
import com.theironyard.entities.Trip;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by temp on 2/20/17.
 */
public interface MapRepository extends CrudRepository<Map, Integer> {
    Map findMapByTrip(Trip trip);
}
