package com.review.anime.Controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.review.anime.service.AnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@CrossOrigin("http://localhost:9292")
@RequestMapping(value = "/api/anime", produces = "application/json")
public class AnimeController {

    @Autowired
    private AnimeService animeService;

    @GetMapping("/background-images")
    public ResponseEntity<List<String>> getBackgroundImages() {
        try {
            List<String> backgroundImages = animeService.getBackgroundImages();
            return ResponseEntity.ok(backgroundImages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/current-season")
    public ResponseEntity<String> getCurrentSeasonAnime(
            @RequestParam(value = "filter", required = false) String filter,
            @RequestParam(value = "limit", required = false) Integer limit,
            @RequestParam(value = "page", required = false) Integer page){
        try {
            String currentSeasonAnime = animeService.getCurrentSeasonAnime(filter, limit, page);
            return ResponseEntity.ok(currentSeasonAnime);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving current season anime: " + e.getMessage());
        }
    }

    @GetMapping("/upcoming-anime")
    public ResponseEntity<String> getUpcomingAnime(
            @RequestParam(value = "page", required = false) Integer page
    ) {
        try {
            String upcomingAnime = animeService.getUpcomingAnime(page);
            return ResponseEntity.ok(upcomingAnime);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving upcoming anime: " + e.getMessage());
        }
    }


    @GetMapping("/top-anime")
    public ResponseEntity<String> getTopAnime(
            @RequestParam(value = "page", required = false) Integer page
    ) {
        try {
            String topAnime = animeService.getTopAnime(page);
            return ResponseEntity.ok(topAnime);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving top anime: " + e.getMessage());
        }
    }

    @GetMapping("/top-characters")
    public ResponseEntity<String> getTopCharacters() {
        try {
            String topCharacters = animeService.getTopCharacters();
            return ResponseEntity.ok(topCharacters);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving top characters: " + e.getMessage());
        }
    }


    @GetMapping("/random-anime")
    public ResponseEntity<String> getRandomAnime() {
        try {
            String randomAnime = animeService.getRandomAnime();
            return ResponseEntity.ok(randomAnime);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving random anime: " + e.getMessage());
        }
    }

    @GetMapping("/get-anime-genres")
    public ResponseEntity<String> getAnimeGenres() {
        try {
            String animeGenres = animeService.getAnimeGenres();
            return ResponseEntity.ok(animeGenres);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving anime genres: " + e.getMessage());
        }
    }

//    @GetMapping("get-anime-list")
//    public ResponseEntity<String> getAnimeList() {
//        try {
//            String animeDetails = animeService.getAnimeList();
//            return ResponseEntity.ok(animeDetails);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving anime details: " + e.getMessage());
//        }
//    }

    @GetMapping("explore")
    public ResponseEntity<String> exploreAnimeList(
            @RequestParam(required = false) Boolean unapproved,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer limit,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Double score,
            @RequestParam(required = false) Double min_score,
            @RequestParam(required = false) Double max_score,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String rating,
            @RequestParam(required = false) Boolean sfw,
            @RequestParam(required = false) String genres,
            @RequestParam(required = false) String genres_exclude,
            @RequestParam(required = false) String order_by,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String letter,
            @RequestParam(required = false) String producers,
            @RequestParam(required = false) String start_date,
            @RequestParam(required = false) String end_date
    ) {
        try {
            String animeDetails = animeService.getAnimeExplore(
                    unapproved, page, limit, q, type, score, min_score, max_score, status, rating, sfw, genres, genres_exclude,
                    order_by, sort, letter, producers, start_date, end_date
            );
            return ResponseEntity.ok(animeDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving anime details: " + e.getMessage());
        }
    }

    @GetMapping("search")
    public ResponseEntity<String> searchAnime(
            @RequestParam(name = "q") String query,
            @RequestParam(name = "page", defaultValue = "1") int page
    ) {
        try {
            String animeDetails = animeService.getAnimeSearch(query, page);
            return ResponseEntity.ok(animeDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error searching anime: " + e.getMessage());
        }
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<String> getAnimeDetailsById(@PathVariable("id") String id) {
        try {
            String animeDetails = animeService.getAnimeDetailsById(id);
            return ResponseEntity.ok(animeDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving anime details: " + e.getMessage());
        }
    }

    @GetMapping("/characters-list/{id}")
    public ResponseEntity<String> getAnimeCharactersList(@PathVariable("id") String id) {
        try {
            String charactersList = animeService.getAnimeCharactersList(id);
            return ResponseEntity.ok(charactersList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving anime characters list: " + e.getMessage());
        }
    }

    @GetMapping("/staff-list/{id}")
    public ResponseEntity<String> getAnimeStaffList(@PathVariable("id") String id) {
        try {
            String staffList = animeService.getAnimeStaffList(id);
            return ResponseEntity.ok(staffList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving anime staff list: " + e.getMessage());
        }
    }

    @GetMapping("/anime-stats/{id}")
    public ResponseEntity<String> getAnimeStatistics(@PathVariable("id") String id) {
        try {
            String animeStatistics = animeService.getAnimeStatistics(id);
            return ResponseEntity.ok(animeStatistics);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving anime statistics: " + e.getMessage());
        }
    }

    @GetMapping("/recommendation/{id}")
    public ResponseEntity<String> getRecommendedAnime(@PathVariable("id") String id) {
        try {
            String recommendedAnime = animeService.getRecommendedAnime(id);
            return ResponseEntity.ok(recommendedAnime);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving recommended anime: " + e.getMessage());
        }
    }

//    @GetMapping("/all-details/{id}")
//    public ResponseEntity<String> getAllAnimeDetails(@PathVariable("id") String id) {
//        try {
//            String animeDetails = animeService.getAnimeDetailsById(id);
//            String charactersList = animeService.getAnimeCharactersList(id);
//            String staffList = animeService.getAnimeStaffList(id);
//            String animeStatistics = animeService.getAnimeStatistics(id);
//            String recommendedAnime = animeService.getRecommendedAnime(id);
//
//            // Combine all the responses into a single JSON object
//            String jsonResponse = "{"
//                    + "\"animeDetails\": " + animeDetails + ","
//                    + "\"charactersList\": " + charactersList + ","
//                    + "\"staffList\": " + staffList + ","
//                    + "\"animeStatistics\": " + animeStatistics + ","
//                    + "\"recommendedAnime\": " + recommendedAnime
//                    + "}";
//
//            return ResponseEntity.ok(jsonResponse);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Error retrieving anime details: " + e.getMessage());
//        }
//    }

//    @GetMapping("/all-details/{id}")
//    public ResponseEntity<String> getAllAnimeDetails(@PathVariable("id") String id) {
//        try {
//            String allAnimeDetails = animeService.getAllAnimeDetails(id);
//            return ResponseEntity.ok(allAnimeDetails);
//        } catch (RuntimeException e) {
//            if (e.getCause() instanceof HttpClientErrorException) {
//                HttpClientErrorException httpClientErrorException = (HttpClientErrorException) e.getCause();
//                return ResponseEntity.status(httpClientErrorException.getStatusCode())
//                        .body("Error retrieving anime details: " + httpClientErrorException.getStatusText());
//            }
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Error retrieving anime details: " + e.getMessage());
//        }
//    }

    @GetMapping("/relations/{id}")
    public ResponseEntity<String> getAnimeRelations(@PathVariable("id") String id) {
        try {
            String animeRelations = animeService.getAnimeRelations(id);
            return ResponseEntity.ok(animeRelations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving anime relations: " + e.getMessage());
        }
    }
}