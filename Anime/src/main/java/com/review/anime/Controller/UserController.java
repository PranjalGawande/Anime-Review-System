package com.review.anime.Controller;

import com.review.anime.dto.ExtraDTO;
import com.review.anime.dto.ReviewDTO;
import com.review.anime.dto.Token;
import com.review.anime.entites.Review;
import com.review.anime.entites.Role;
import com.review.anime.entites.User;
import com.review.anime.entites.WatchList;
import com.review.anime.service.ReviewService;
import com.review.anime.service.UserService;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin("http://localhost:9292")
@RequestMapping("/")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/login")
    private ResponseEntity<Token> userLogin(@RequestBody User user) {
        Token token = new Token(userService.authenticate(user));
        return ResponseEntity.ok().body(token);
    }

    @PostMapping("/register")
    private ResponseEntity<String> userRegister(@RequestBody User user) {
        User exisitingUser = userService.findUserByEmail(user.getEmail());
        if(exisitingUser != null ) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username/Email is already taken.");
        }

        if (user.getRole() == Role.ADMIN) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Cannot register as Admin.");
        }

        userService.addUser(user);
        return ResponseEntity.ok().body("Registered Successfully.");
    }

    @PostMapping("/addComment")
    @PreAuthorize("hasAuthority('user:post')")
    public ResponseEntity<String> addComment(@RequestBody ExtraDTO extra, @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();

        if(email == null) {
            return ResponseEntity.badRequest().build();
        }

        Review review = new Review();
        review.setRating(extra.getRating());
        review.setComment(extra.getComment());
        review.setAnimeId(extra.getAnimeId());

        User user = userService.findUserByEmail(email);
        review.setUser(user);

        reviewService.saveReview(review);
        return ResponseEntity.ok().body("Successfully add Comment");
    }

    @GetMapping("/getComment")
    public ResponseEntity<List<ReviewDTO>> getComment(@RequestParam Integer animeId) {
        List<Review> reviews = reviewService.getReviewOfAnimeId(animeId);
        List<ReviewDTO> reviewDTOS = new ArrayList<>();

        if(reviews.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        for( Review reviewItem : reviews) {
            ReviewDTO reviewDTO = new ReviewDTO(reviewItem);
            reviewDTOS.add(reviewDTO);
        }

        return ResponseEntity.ok(reviewDTOS);
    }

    @GetMapping("/getWatchList")
    @PreAuthorize("hasAuthority('user:get')")
    public ResponseEntity<Object> getWatchList(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        User user = userService.findUserByEmail(email);

        if (!Objects.equals(user.getUserId(), user.getUserId())) {
            return ResponseEntity.badRequest().build();
        }

        List<WatchList> watchList = user.getWatchLists();

        if (watchList.isEmpty()) {
            JSONObject emptyResponse = new JSONObject().put("data", new JSONArray());
            return new ResponseEntity<>(emptyResponse.toMap(), HttpStatus.OK);
        }

        JSONArray dataArray = new JSONArray();
        for (WatchList watchListItem : watchList) {
            JSONObject animeObject = new JSONObject();
            animeObject.put("animeId", watchListItem.getAnimeId());

            JSONObject imagesObject = new JSONObject();
            imagesObject.put("image_url", watchListItem.getImageUrl());
            animeObject.put("images", imagesObject);

            animeObject.put("title", watchListItem.getTitle());

            dataArray.put(animeObject.toMap());
        }

        JSONObject watchListJson = new JSONObject();
        watchListJson.put("data", dataArray);

        return new ResponseEntity<>(watchListJson.toMap(), HttpStatus.OK);
    }

    @PostMapping("/addWatchList")
    @PreAuthorize("hasAuthority('user:post')")
    public ResponseEntity<String> addWatchList(@RequestBody WatchList watchList, @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        if ( email == null ) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        String result = userService.addWatchedAnimeId(watchList, email);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/deleteWatchList")
    @PreAuthorize("hasAuthority('user:post')")
    public ResponseEntity<String> deleteWatchList(@RequestBody ExtraDTO extraDTO, @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        if(email == null) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        User user = userService.findUserByEmail(email);
        String result = userService.deleteWatchList(extraDTO.getAnimeId(), user);
        return ResponseEntity.ok().body(result);
    }
}