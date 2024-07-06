package com.review.anime.service;

import com.review.anime.entites.Role;
import com.review.anime.entites.User;
import com.review.anime.entites.WatchList;
import com.review.anime.repository.UserRepository;
import com.review.anime.security.JwtService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
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

    private static final Logger logger = LogManager.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String authenticate(User user) {
        logger.info("Authenticating user with email: {}", user.getEmail());
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
                            user.getPassword()
                    )
            );
            User user1 = userRepository.findByEmail(user.getEmail());
            String token = jwtService.generateToken(user1);
            logger.info("Authentication successful for user with email: {}", user.getEmail());
            return token;
        } catch (Exception e) {
            logger.error("Authentication failed for user with email: {}", user.getEmail(), e);
            throw e;
        }
    }

    public List<User> getAdminList() {
        logger.info("Fetching list of admin users");
        try {
            List<User> admins = userRepository.getAdmins(Role.ADMIN);
            logger.info("Successfully fetched {} admin users", admins.size());
            return admins;
        } catch (Exception e) {
            logger.error("Error fetching admin users", e);
            throw e;
        }
    }

    public void addUser(User user) {
        logger.info("Adding new user with email: {}", user.getEmail());
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            logger.info("Successfully added user with email: {}", user.getEmail());
        } catch (Exception e) {
            logger.error("Error adding user with email: {}", user.getEmail(), e);
            throw e;
        }
    }

    public User findUserByEmail(String email) {
        logger.info("Finding user by email: {}", email);
        try {
            User user = userRepository.findByEmail(email);
            if (user != null) {
                logger.info("User found with email: {}", email);
            } else {
                logger.warn("User not found with email: {}", email);
            }
            return user;
        } catch (Exception e) {
            logger.error("Error finding user by email: {}", email, e);
            throw e;
        }
    }

    public String addWatchedAnimeId(WatchList watchList, String email) {
        logger.info("Adding watched anime ID: {} for user with email: {}", watchList.getAnimeId(), email);
        try {
            Optional<User> user = Optional.ofNullable(findUserByEmail(email));
            if (user.isEmpty()) {
                logger.warn("User not found with email: {}", email);
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

                logger.info("Anime ID: {} added to watch list for user with email: {}", watchList.getAnimeId(), email);
                return "Anime added to watch list.";
            } else {
                logger.info("Anime ID: {} already in watch list for user with email: {}", watchList.getAnimeId(), email);
                return "Anime already in watch list.";
            }
        } catch (Exception e) {
            logger.error("Error adding watched anime ID: {} for user with email: {}", watchList.getAnimeId(), email, e);
            throw e;
        }
    }

    public String deleteWatchList(Integer animeId, User user) {
        logger.info("Deleting watched anime ID: {} for user with email: {}", animeId, user.getEmail());
        try {
            List<WatchList> watchLists = user.getWatchLists();
            boolean removed = watchLists.removeIf(watchList -> watchList.getAnimeId().equals(animeId));

            if (removed) {
                userRepository.save(user);
                logger.info("Successfully removed anime ID: {} from watch list for user with email: {}", animeId, user.getEmail());
                return "Anime removed from watch list successfully.";
            } else {
                logger.warn("Anime ID: {} not found in watch list for user with email: {}", animeId, user.getEmail());
                return "Anime not found in watch list.";
            }
        } catch (Exception e) {
            logger.error("Error deleting watched anime ID: {} for user with email: {}", animeId, user.getEmail(), e);
            throw e;
        }
    }

    public boolean verifyCurrentPassword(String email, String oldPassword) {
        logger.info("Verifying current password for user with email: {}", email);
        try {
            User user = userRepository.findByEmail(email);

            if (user == null) {
                logger.warn("User not found with email: {}", email);
                return false;
            }

            boolean matches = passwordEncoder.matches(oldPassword, user.getPassword());
            if (matches) {
                logger.info("Current password verified for user with email: {}", email);
            } else {
                logger.warn("Current password verification failed for user with email: {}", email);
            }
            return matches;
        } catch (Exception e) {
            logger.error("Error verifying current password for user with email: {}", email, e);
            throw e;
        }
    }

    public void updateUser(String email, String newPassword) {
        logger.info("Updating user password for email: {}", email);
        try {
            newPassword = passwordEncoder.encode(newPassword);

            User user = findUserByEmail(email);
            if (user != null) {
                user.setPassword(newPassword);
                userRepository.save(user);
                logger.info("Successfully updated password for user with email: {}", email);
            } else {
                logger.warn("User not found with email: {}", email);
            }
        } catch (Exception e) {
            logger.error("Error updating password for user with email: {}", email, e);
            throw e;
        }
    }
}
