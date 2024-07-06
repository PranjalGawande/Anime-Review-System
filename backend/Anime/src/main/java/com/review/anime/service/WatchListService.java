package com.review.anime.service;

import com.review.anime.entites.WatchList;
import com.review.anime.repository.WatchListRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WatchListService {

    private static final Logger logger = LogManager.getLogger(WatchListService.class);

    @Autowired
    private WatchListRepository watchListRepository;
    public void addWatchAnime(WatchList watchList1) {
        logger.info("Adding anime to watch list with ID: {}", watchList1.getAnimeId());
        try {
            watchListRepository.save(watchList1);
            logger.info("Successfully added anime to watch list with ID: {}", watchList1.getAnimeId());
        } catch (Exception e) {
            logger.error("Error adding anime to watch list with ID: {}", watchList1.getAnimeId(), e);
            throw e;
        }
    }
}
