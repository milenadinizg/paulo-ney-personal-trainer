package com.pauloney.Newsletter.controller;

import com.pauloney.Newsletter.model.UserSub;
import com.pauloney.Newsletter.services.UserSubService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("api/sub")
public class UserSubController {

    private final UserSubService userSubService;

    public UserSubController(UserSubService userSubService) {
        this.userSubService = userSubService;
    }

    @PostMapping
    public ResponseEntity subscribe(@RequestBody UserSub userSub) {
        try {
            userSubService.sub(userSub);
        } catch (Exception e) {
            Logger.getLogger(UserSubController.class.getName()).log(Level.SEVERE, null, e);
            return ResponseEntity.internalServerError().build();
        }

        return ResponseEntity.ok().build();
    }

}
