package com.review.anime.Controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.review.anime.service.AnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    @GetMapping("/api/anime/current-season")
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
    public ResponseEntity<String> getUpcomingAnime() {
        try {
            String upcomingAnime = animeService.getUpcomingAnime();
            return ResponseEntity.ok(upcomingAnime);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving upcoming anime: " + e.getMessage());
        }
    }


    @GetMapping("/top-anime")
    public ResponseEntity<String> getTopAnime() {
        try {
            String topAnime = animeService.getTopAnime();
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

    @GetMapping("get-anime-list")
    public ResponseEntity<String> getAnimeList() {
        try {
            String animeDetails = animeService.getAnimeList();
            return ResponseEntity.ok(animeDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving anime details: " + e.getMessage());
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