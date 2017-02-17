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
    String userName;

    @Column(nullable = false, unique = true)
    String emailAddress;

    @Column(nullable = false)
    String password;

    @Column(nullable = false)
    String car;

    @OneToMany
    List<Trip> trips;

    public User() {
    }

    public User(int id, String userName, String emailAddress, String password, String car, List<Trip> trips) {
        this.id = id;
        this.userName = userName;
        this.emailAddress = emailAddress;
        this.password = password;
        this.car = car;
        this.trips = trips;
    }

    public User(int id, String userName, String emailAddress, String password, String car) {
        this.id = id;
        this.userName = userName;
        this.emailAddress = emailAddress;
        this.password = password;
        this.car = car;
    }

    public User(String userName, String emailAddress, String password, String car) {
        this.userName = userName;
        this.emailAddress = emailAddress;
        this.password = password;
        this.car = car;
    }

    public User(String emailAddress, String password) {
        this.emailAddress = emailAddress;
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCar() {
        return car;
    }

    public void setCar(String car) {
        this.car = car;
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

    public int getId() {
        return id;
    }
}