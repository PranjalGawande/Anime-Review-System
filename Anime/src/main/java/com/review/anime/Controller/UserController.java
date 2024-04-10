package com.review.anime.Controller;

import com.review.anime.dto.Token;
import com.review.anime.entites.Role;
import com.review.anime.entites.User;
import com.review.anime.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:9292")
@RequestMapping("/")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    private ResponseEntity<Token> userLogin(@RequestBody User user) {
        Token token = new Token(userService.authenticate(user));
        return ResponseEntity.ok().body(token);
    }

    @PostMapping("/register")
    private ResponseEntity<String> userRegister(@RequestBody User user) {
        User exisitingUser = userService.findUserByEmail(user.getEmail());
        if(exisitingUser != null ) {
            return ResponseEntity.ok().body("Username/Email is already taken.");
        } else {
            if (user.getRole() == Role.ADMIN) {
                return ResponseEntity.ok().body("Cannot register as Admin.");
            }
        }

        userService.addUser(user);
        return ResponseEntity.ok().body("Registered Successfully.");
    }
}
