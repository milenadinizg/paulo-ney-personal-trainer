package com.pauloney.Newsletter.model;

import jakarta.persistence.*;

@Table
@Entity
public class UserSub {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private String email;

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}
