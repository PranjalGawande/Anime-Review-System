package com.review.anime.service;

import com.review.anime.entites.Role;
import com.review.anime.entites.User;
import com.review.anime.repository.UserRepository;
import com.review.anime.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String authenticate(User user) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        user.getPassword()
                )
        );
        User user1 = userRepository.findByEmail(user.getEmail());
        String token = jwtService.generateToken(user1);

        return token;
    }

    public List<User> getAdminList() {
        return userRepository.getAdmins(Role.ADMIN);
    }

    public void addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<Integer> getAnimeWatchList(Integer userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return user.get().getWatchedAnimeIds();
        } else {
            return Collections.emptyList();
        }
    }

    public String addWatchedAnimeId(Integer animeId, String email) {
        Optional<User> user = Optional.ofNullable(findUserByEmail(email));
        if (user.isEmpty()) {
            return "User not Found";
        }

        List<Integer> watchedAnimeList = user.get().getWatchedAnimeIds();

        if(!watchedAnimeList.contains(animeId)) {
            watchedAnimeList.add(animeId);
            userRepository.save(user.get());
            return "Anime added to watch list.";
        }
        else {
            return "Anime already in watch list.";
        }
    }
}
