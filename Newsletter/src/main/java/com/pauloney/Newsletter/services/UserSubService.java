package com.pauloney.Newsletter.services;

import com.pauloney.Newsletter.model.UserSub;
import com.pauloney.Newsletter.repository.UserSubRepository;
import org.springframework.stereotype.Service;

import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class UserSubService {

    MailService mailService;
    UserSubRepository userSubRepository;

    public UserSubService(MailService mailService, UserSubRepository userSubRepository) {
        this.mailService = mailService;
        this.userSubRepository = userSubRepository;
    }

    public void sub(UserSub userSub) throws Exception {
        try {
            userSubRepository.save(userSub);
            mailService.enviarNewsletter(userSub.getEmail(), userSub.getName());
        } catch (Exception e) {
            Logger.getAnonymousLogger().log(Level.WARNING, e.getMessage());
            throw new Exception("Couldn't persist or send email");
        }
    }

}
