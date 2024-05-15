package com.review.anime.service;

import com.review.anime.entites.Review;
import com.review.anime.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;
    public void saveReview(Review review) {
        reviewRepository.save(review);
    }

    public List<Review> getReviewOfAnimeId(Integer animeId) {
        return reviewRepository.findAllByAnimeId(animeId);
    }
}
