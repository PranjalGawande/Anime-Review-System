package com.review.anime.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriBuilder;
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
//                JsonNode imagesNode = anime.path("images");
//                String imageUrl = imagesNode.path("jpg").path("large_image_url").asText();
                JsonNode imageNode = anime.path("trailer").path("images");
                String imageUrl = imageNode.path("maximum_image_url").asText();
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
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(JIKAN_API_URL + "seasons/now?sfw=true");

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


    public String getUpcomingAnime(Integer page) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(JIKAN_API_URL + "seasons/upcoming?sfw=true");

            if (Objects.nonNull(page)) {
                builder.queryParam("page", page);
            }

            return restTemplate.getForObject(builder.toUriString(), String.class);
        } catch (HttpClientErrorException.Forbidden e) {
            throw new RuntimeException("Access to upcoming anime API is forbidden. Check authorization.");
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving upcoming anime: " + e.getMessage());
        }
    }


    public String getTopAnime(Integer page) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(JIKAN_API_URL + "top/anime?sfw=true");

            if (Objects.nonNull(page)) {
                builder.queryParam("page", page);
            }

            return restTemplate.getForObject(builder.toUriString(), String.class);
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

//    public String getAnimeList() {
//        try {
//            RestTemplate restTemplate = new RestTemplate();
//            return restTemplate.getForObject(JIKAN_API_URL + "anime", String.class);
//        } catch (HttpClientErrorException.Forbidden e) {
//            throw new RuntimeException("Access to anime list API is forbidden. Check authorization.");
//        } catch (Exception e) {
//            throw new RuntimeException("Error retrieving anime list: " + e.getMessage());
//        }
//    }

    public String getAnimeExplore(
            Boolean unapproved, Integer page, Integer limit, String q, String type, Double score, Double min_score, Double max_score,
            String status, String rating, Boolean sfw, String genres, String genres_exclude, String order_by, String sort, String letter,
            String producers, String start_date, String end_date
    ) {
        try {
            StringBuilder urlBuilder = new StringBuilder(JIKAN_API_URL + "anime?sfw=true");
            // Construct the URL based on the provided query parameters
            // Append each parameter to the URL accordingly

            // Example: Append the sfw parameter
            if (page != null) {
                urlBuilder.append("&page=").append(page);
            }
            if (genres != null && !genres.isEmpty()) {
                urlBuilder.append("&genres=").append(genres);
            }

            if (sort != null && !sort.isEmpty()) {
                urlBuilder.append("&sort=").append(sort);
            }

            // Add other parameters similarly

            // Build the URL
            String url = urlBuilder.toString();

            RestTemplate restTemplate = new RestTemplate();
            return restTemplate.getForObject(url, String.class);
        } catch (HttpClientErrorException.Forbidden e) {
            throw new RuntimeException("Access to anime list API is forbidden. Check authorization.");
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving anime list: " + e.getMessage());
        }
    }

    public String getAnimeSearch(String query, int page) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = buildSearchUrl(query, page);
            return restTemplate.getForObject(url, String.class);
        } catch (HttpClientErrorException.Forbidden e) {
            throw new RuntimeException("Error in accessing Anime Api.");
        } catch (Exception e) {
            throw new RuntimeException("Error searching anime: " + e.getMessage());
        }
    }

    private String buildSearchUrl(String query, int page) {
        return JIKAN_API_URL + "anime?q=" + query +
                "&page=" + page +
                "&sfw=true";
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

//    public String getAllAnimeDetails(String id) {
//        try {
//            RestTemplate restTemplate = new RestTemplate();
//            String animeDetailsResponse = restTemplate.getForObject(JIKAN_API_URL + "anime/" + id + "/full", String.class);
//            String charactersListResponse = restTemplate.getForObject(JIKAN_API_URL + "anime/" + id + "/characters", String.class);
//            String staffListResponse = restTemplate.getForObject(JIKAN_API_URL + "anime/" + id + "/staff", String.class);
//            String animeStatisticsResponse = restTemplate.getForObject(JIKAN_API_URL + "anime/" + id + "/statistics", String.class);
//            String recommendedAnimeResponse = restTemplate.getForObject(JIKAN_API_URL + "anime/" + id + "/recommendations", String.class);
//
//            // Combine all the responses into a single JSON object
//            String jsonResponse = "{"
//                    + "\"animeDetails\": " + animeDetailsResponse + ","
//                    + "\"charactersList\": " + charactersListResponse + ","
//                    + "\"staffList\": " + staffListResponse + ","
//                    + "\"animeStatistics\": " + animeStatisticsResponse + ","
//                    + "\"recommendedAnime\": " + recommendedAnimeResponse
//                    + "}";
//
//            return jsonResponse;
//        } catch (HttpClientErrorException e) {
//            // Handle HTTP client errors
//            throw new RuntimeException("Error retrieving anime details: " + e.getStatusCode() + " - " + e.getStatusText());
//        } catch (Exception e) {
//            // Handle other exceptions
//            throw new RuntimeException("Error retrieving anime details: " + e.getMessage());
//        }
//    }

//    public String getAllAnimeDetails(String id) {
//        try {
//            RestTemplate restTemplate = new RestTemplate();
//            StringBuilder jsonResponseBuilder = new StringBuilder("{");
//
//            // Fetch anime details
//            String animeDetailsResponse = restTemplate.getForObject(JIKAN_API_URL + "anime/" + id + "/full", String.class);
//            jsonResponseBuilder.append("\"animeDetails\": ").append(animeDetailsResponse).append(",");
//
//            // Introduce a delay of 1 second before the next request
//            Thread.sleep(500);
//
//            // Fetch characters list
//            String charactersListResponse = restTemplate.getForObject(JIKAN_API_URL + "anime/" + id + "/characters", String.class);
//            jsonResponseBuilder.append("\"charactersList\": ").append(charactersListResponse).append(",");
//
//            // Introduce a delay of 1 second before the next request
//            Thread.sleep(500);
//
//            // Fetch staff list
//            String staffListResponse = restTemplate.getForObject(JIKAN_API_URL + "anime/" + id + "/staff", String.class);
//            jsonResponseBuilder.append("\"staffList\": ").append(staffListResponse).append(",");
//
//            // Introduce a delay of 1 second before the next request
//            Thread.sleep(500);
//
//            // Fetch anime statistics
//            String animeStatisticsResponse = restTemplate.getForObject(JIKAN_API_URL + "anime/" + id + "/statistics", String.class);
//            jsonResponseBuilder.append("\"animeStatistics\": ").append(animeStatisticsResponse).append(",");
//
//            // Introduce a delay of 1 second before the next request
//            Thread.sleep(500);
//
//            // Fetch recommended anime
//            String recommendedAnimeResponse = restTemplate.getForObject(JIKAN_API_URL + "anime/" + id + "/recommendations", String.class);
//            jsonResponseBuilder.append("\"recommendedAnime\": ").append(recommendedAnimeResponse);
//
//            jsonResponseBuilder.append("}");
//
//            return jsonResponseBuilder.toString();
//        } catch (HttpClientErrorException e) {
//            // Handle HTTP client errors
//            throw new RuntimeException("Error retrieving anime details: " + e.getStatusCode() + " - " + e.getStatusText());
//        } catch (InterruptedException e) {
//            // Handle interruption exception
//            throw new RuntimeException("Error during request delay: " + e.getMessage());
//        } catch (Exception e) {
//            // Handle other exceptions
//            throw new RuntimeException("Error retrieving anime details: " + e.getMessage());
//        }
//    }


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
