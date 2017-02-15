package com.theironyard.entities;


import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false)
    String name;

    @Column(nullable = false, unique = true)
    String email;

    @Column(nullable = false)
    String pass;

    @Column(nullable = false)
    String car;

    @OneToMany()
    List<Trip> trips;

    public User() {
    }

    public User(String name, String email, String pass, String car, List<Trip> trips) {
        this.name = name;
        this.email = email;
        this.pass = pass;
        this.car = car;
        this.trips = trips;
    }

    public User(String name, String email, String pass, String car) {
        this.name = name;
        this.email = email;
        this.pass = pass;
        this.car = car;
    }

    public User(String email, String pass) {
        this.email = email;
        this.pass = pass;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Trip> getTrips() {
        return trips;
    }

    public void setTrips(List<Trip> trips) {
        this.trips = trips;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getCar() {
        return car;
    }

    public void setCar(String car) {
        this.car = car;
    }
}
