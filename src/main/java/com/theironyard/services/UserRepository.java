package com.theironyard.services;

import com.theironyard.entities.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by temp on 2/9/17.
 */
public interface UserRepository extends CrudRepository<User, Integer> {
    User findByEmailAddress(String emailAddress);
}
