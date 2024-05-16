package com.review.anime.service;

import com.review.anime.entites.WatchList;
import com.review.anime.repository.WatchListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WatchListService {

    @Autowired
    private WatchListRepository watchListRepository;
    public void addWatchAnime(WatchList watchList1) {
        watchListRepository.save(watchList1);
    }
}
