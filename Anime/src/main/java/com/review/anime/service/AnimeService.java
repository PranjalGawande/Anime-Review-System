package com.review.anime.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Random;

@Service
public class AnimeService {

    private static final String JIKAN_API_URL = "https://api.jikan.moe/v4/";


    public List<String> getBackgroundImages() {
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(JIKAN_API_URL + "seasons/now", String.class);

        // Parse JSON response
        ObjectMapper objectMapper = new ObjectMapper();
        List<String> imageUrls = new ArrayList<>();
        try {
            JsonNode rootNode = objectMapper.readTree(response);
            JsonNode animeNode = rootNode.path("data"); // Access the "data" field
            Random random = new Random();
            int totalAnimeCount = animeNode.size();
            int count = Math.min(totalAnimeCount, 20); // Ensure we don't select more than total anime count
            for (int i = 0; i < count; i++) {
                int randomIndex = random.nextInt(totalAnimeCount);
                JsonNode anime = animeNode.get(randomIndex);
                JsonNode imagesNode = anime.path("images");
                String imageUrl = imagesNode.path("jpg").path("large_image_url").asText();
                imageUrls.add(imageUrl);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return imageUrls;
    }


    public String getCurrentSeasonAnime(String filter, Integer limit, Integer page) {
        RestTemplate restTemplate = new RestTemplate();

        // Build the URI with query parameters
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(JIKAN_API_URL + "seasons/now");

        if (Objects.nonNull(filter)) {
            builder.queryParam("filter", filter);
        }

        if (Objects.nonNull(limit)) {
            builder.queryParam("limit", limit);
        }

        if (Objects.nonNull(page)) {
            builder.queryParam("page", page);
        }

        try {
            // Make the GET request and return the response
            return restTemplate.getForObject(builder.toUriString(), String.class);
        } catch (HttpClientErrorException e) {
            // If an HTTP error occurs (e.g., 403 Forbidden), handle it here
            throw new RuntimeException("Error fetching current season anime: " + e.getStatusCode() + " - " + e.getStatusText());
        } catch (Exception e) {
            // For other exceptions, handle them here
            throw new RuntimeException("Error fetching current season anime: " + e.getMessage());
        }
    }


    public String getUpcomingAnime() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            return restTemplate.getForObject(JIKAN_API_URL + "seasons/upcoming", String.class);
        } catch (HttpClientErrorException.Forbidden e) {
            throw new RuntimeException("Access to upcoming anime API is forbidden. Check authorization.");
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving upcoming anime: " + e.getMessage());
        }
    }


    public String getTopAnime() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            return restTemplate.getForObject(JIKAN_API_URL + "top/anime", String.class);
        } catch (HttpClientErrorException.Forbidden e) {
            throw new RuntimeException("Access to top anime API is forbidden. Check authorization.");
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving top anime: " + e.getMessage());
        }
    }


    public String getTopCharacters() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            return restTemplate.getForObject(JIKAN_API_URL + "top/characters", String.class);
        } catch (HttpClientErrorException.Forbidden e) {
            throw new RuntimeException("Access to top characters API is forbidden. Check authorization.");
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving top characters: " + e.getMessage());
        }
    }


    public String getRandomAnime() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            return restTemplate.getForObject(JIKAN_API_URL + "random/anime", String.class);
        } catch (HttpClientErrorException.Forbidden e) {
            throw new RuntimeException("Access to random anime API is forbidden. Check authorization.");
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving random anime: " + e.getMessage());
        }
    }

    public String getAnimeGenres() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            return restTemplate.getForObject(JIKAN_API_URL + "genres/anime?filter=genres", String.class);
        } catch (HttpClientErrorException.Forbidden e) {
            throw new RuntimeException("Access to anime genres API is forbidden. Check authorization.");
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving anime genres: " + e.getMessage());
        }
    }

    public String getAnimeList() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            return restTemplate.getForObject(JIKAN_API_URL + "anime", String.class);
        } catch (HttpClientErrorException.Forbidden e) {
            throw new RuntimeException("Access to anime list API is forbidden. Check authorization.");
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving anime list: " + e.getMessage());
        }
    }


    public String getAnimeDetailsById(String id) {
        RestTemplate restTemplate = new RestTemplate();
        try {
            return restTemplate.getForObject(JIKAN_API_URL + "anime/" + id + "/full", String.class);
        } catch (HttpClientErrorException e) {
            return "Anime details not found for ID: " + id;
        } catch (Exception e) {
            return "Error retrieving anime details for ID: " + id + ". " + e.getMessage();
        }
    }

    public String getAnimeCharactersList(String id) {
        RestTemplate restTemplate = new RestTemplate();
        try {
            return restTemplate.getForObject(JIKAN_API_URL + "anime/" + id + "/characters", String.class);
        } catch (HttpClientErrorException e) {
            return "Anime characters not found for ID: " + id;
        } catch (Exception e) {
            return "Error retrieving anime characters for ID: " + id + ". " + e.getMessage();
        }
    }

    public String getAnimeStaffList (String id) {
        RestTemplate restTemplate = new RestTemplate();
        try {
            return restTemplate.getForObject(JIKAN_API_URL + "anime/" + id + "/staff", String.class);
        } catch (HttpClientErrorException e) {
            return "Anime staff not found for ID: " + id;
        } catch (Exception e) {
            return "Error retrieving anime staff for ID: " + id + ". " + e.getMessage();
        }
    }


    public String getAnimeStatistics(String id) {
        RestTemplate restTemplate = new RestTemplate();
        try {
            return restTemplate.getForObject(JIKAN_API_URL + "anime/" + id + "/statistics", String.class);
        } catch (HttpClientErrorException e) {
            return "Anime statistics not found for ID: " + id;
        } catch (Exception e) {
            return "Error retrieving anime statistics for ID: " + id + ". " + e.getMessage();
        }
    }

    public String getRecommendedAnime(String id) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            return restTemplate.getForObject(JIKAN_API_URL + "anime/" + id + "/ recommendations", String.class);
        } catch (HttpClientErrorException.Forbidden e) {
            throw new RuntimeException("Access to recommended anime API is forbidden. Check authorization.");
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving recommended anime: " + e.getMessage());
        }
    }

    public String getAnimeRelations(String id) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            return restTemplate.getForObject(JIKAN_API_URL + "anime/" + id + "/relations", String.class);
        } catch (HttpClientErrorException.Forbidden e) {
            throw new RuntimeException("Access to anime relations API is forbidden. Check authorization.");
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving anime relations: " + e.getMessage());
        }
    }
}
