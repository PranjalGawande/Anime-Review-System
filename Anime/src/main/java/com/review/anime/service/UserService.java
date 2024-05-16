package com.review.anime.service;

import com.review.anime.entites.Role;
import com.review.anime.entites.User;
import com.review.anime.entites.WatchList;
import com.review.anime.repository.UserRepository;
import com.review.anime.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.json.JSONArray;
import org.json.JSONObject;


import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WatchListService watchListService;

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

    public String addWatchedAnimeId(WatchList watchList, String email) {
        Optional<User> user = Optional.ofNullable(findUserByEmail(email));
        if (user.isEmpty()) {
            return "User not Found";
        }

        List<WatchList> watchedAnimeList = user.get().getWatchLists();
        boolean alreadyInWatchList = false;

        for (WatchList wl : watchedAnimeList) {
            if (wl.getAnimeId().equals(watchList.getAnimeId())) {
                alreadyInWatchList = true;
                break;
            }
        }

        if (!alreadyInWatchList) {
            WatchList newWatchList = new WatchList();
            newWatchList.setAnimeId(watchList.getAnimeId());
            newWatchList.setImageUrl(watchList.getImageUrl());
            newWatchList.setTitle(watchList.getTitle());
            newWatchList.setUser(user.get());

            watchedAnimeList.add(newWatchList);
            userRepository.save(user.get());

            return "Anime added to watch list.";
        } else {
            return "Anime already in watch list.";
        }
    }

}
