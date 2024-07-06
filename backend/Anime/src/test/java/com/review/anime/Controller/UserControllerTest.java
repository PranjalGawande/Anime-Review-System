package com.review.anime.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.review.anime.dto.ExtraDTO;
import com.review.anime.dto.ReviewDTO;
import com.review.anime.entites.Review;
import com.review.anime.entites.Role;
import com.review.anime.entites.User;
import com.review.anime.entites.WatchList;
import com.review.anime.security.JwtService;
import com.review.anime.security.LoginDetailService;
import com.review.anime.security.SecurityConfig;
import com.review.anime.service.ReviewService;
import com.review.anime.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(UserController.class)
@Import(SecurityConfig.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private ReviewService reviewService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private LoginDetailService loginDetailService;

    @Autowired
    private ObjectMapper objectMapper;

    private User adminUser;
    private User user;

    @BeforeEach
    void setup() {
        adminUser = new User();
        adminUser.setEmail("hari@gmail.com");
        adminUser.setPassword("Hari");
        adminUser.setRole(Role.ADMIN);
        adminUser.setStatus(true);
        adminUser.setName("Hari");

        user = new User();
        user.setEmail("malliga@gmail.com");
        user.setPassword("Malliga");
        user.setRole(Role.USER);
        user.setStatus(true);
        user.setName("Malliga");

        Mockito.when(userService.findUserByEmail("malliga@gmail.com")).thenReturn(user);
        Mockito.when(userService.findUserByEmail("hari@gmail.com")).thenReturn(adminUser);
        Mockito.when(userService.addWatchedAnimeId(Mockito.any(WatchList.class), Mockito.anyString()))
                .thenReturn("WatchList added successfully");

    }

    @Test
    @WithMockUser(username = "malliga@gmail.com", authorities = {"user:post"})
    void addComment() throws Exception {
        ExtraDTO extra = new ExtraDTO();
        extra.setRating(9.5F);
        extra.setComment("Great anime!");
        extra.setAnimeId(1);

        Mockito.when(userService.findUserByEmail("malliga@gmail.com")).thenReturn(user);

        mockMvc.perform(post("/addComment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(extra)))
                .andExpect(status().isOk())
                .andExpect(content().string("Successfully added Comment"));

        Mockito.verify(reviewService, Mockito.times(1)).saveReview(Mockito.any());
    }

    @Test
    @WithMockUser(username = "malliga@gmail.com", authorities = {"user:get"})
    void getComments_Success() throws Exception {
        Review review = new Review();
        review.setAnimeId(1);
        review.setRating(9.5F);
        review.setComment("Great anime!");
        review.setUser(user);

        List<Review> reviews = Collections.singletonList(review);
        List<ReviewDTO> reviewDTOS = Collections.singletonList(new ReviewDTO(review));

        Mockito.when(reviewService.getReviewOfAnimeId(1)).thenReturn(reviews);

        mockMvc.perform(get("/getComment")
                        .param("animeId", "1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(new ObjectMapper().writeValueAsString(reviewDTOS)));

        Mockito.verify(reviewService, Mockito.times(1)).getReviewOfAnimeId(1);
    }

    @Test
    @WithMockUser(username = "malliga@gmail.com", authorities = {"user:get"})
    void getComments_Failure_NoComments() throws Exception {
        Mockito.when(reviewService.getReviewOfAnimeId(1)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/getComment")
                        .param("animeId", "1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

        Mockito.verify(reviewService, Mockito.times(1)).getReviewOfAnimeId(1);
    }

    @Test
    @WithMockUser(username = "malliga@gmail.com", authorities = {"user:get"})
    void getWatchList_Success() throws Exception {
        WatchList watchListItem = new WatchList();
        watchListItem.setAnimeId(1);
        watchListItem.setImageUrl("http://example.com/image.jpg");
        watchListItem.setTitle("Example Anime");

        List<WatchList> watchList = Collections.singletonList(watchListItem);
        user.setWatchLists(watchList);

        Mockito.when(userService.findUserByEmail("malliga@gmail.com")).thenReturn(user);

        ArrayNode dataArray = objectMapper.createArrayNode();
        ObjectNode animeObject = objectMapper.createObjectNode();
        animeObject.put("animeId", watchListItem.getAnimeId());

        ObjectNode imagesObject = objectMapper.createObjectNode();
        imagesObject.put("image_url", watchListItem.getImageUrl());
        animeObject.set("images", imagesObject);

        animeObject.put("title", watchListItem.getTitle());

        dataArray.add(animeObject);

        ObjectNode watchListJson = objectMapper.createObjectNode();
        watchListJson.set("data", dataArray);

        mockMvc.perform(get("/getWatchList")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(watchListJson.toString()));

        Mockito.verify(userService, Mockito.times(1)).findUserByEmail("malliga@gmail.com");
    }

    @Test
    @WithMockUser(username = "malliga@gmail.com", authorities = {"user:get"})
    void getWatchList_Empty() throws Exception {
        user.setWatchLists(Collections.emptyList());

        Mockito.when(userService.findUserByEmail("malliga@gmail.com")).thenReturn(user);

        ObjectNode emptyResponse = objectMapper.createObjectNode();
        emptyResponse.set("data", objectMapper.createArrayNode());

        mockMvc.perform(get("/getWatchList")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(emptyResponse.toString()));

        Mockito.verify(userService, Mockito.times(1)).findUserByEmail("malliga@gmail.com");
    }

    @Test
    @WithMockUser(username = "malliga@gmail.com", authorities = {"user:post"})
    void addWatchList_Success() throws Exception {
        WatchList watchList = new WatchList();
        watchList.setAnimeId(1);
        watchList.setImageUrl("http://example.com/image.jpg");
        watchList.setTitle("Example Anime");

        mockMvc.perform(post("/addWatchList")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(watchList)))
                .andExpect(status().isOk())
                .andExpect(content().string("WatchList added successfully"));

        Mockito.verify(userService, Mockito.times(1)).addWatchedAnimeId(Mockito.any(WatchList.class), Mockito.eq("malliga@gmail.com"));
    }


    @Test
    @WithMockUser(username = "malliga@gmail.com", authorities = {"user:post"})
    void deleteWatchList_Success() throws Exception {
        ExtraDTO extraDTO = new ExtraDTO();
        extraDTO.setAnimeId(1);

        Mockito.when(userService.deleteWatchList(extraDTO.getAnimeId(), user)).thenReturn("WatchList item deleted successfully");

        mockMvc.perform(post("/deleteWatchList")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(extraDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string("WatchList item deleted successfully"));

        Mockito.verify(userService, Mockito.times(1)).deleteWatchList(extraDTO.getAnimeId(), user);
    }

    @Test
    @WithMockUser(username = "malliga@gmail.com", authorities = {"user:post"})
    void deleteWatchList_NotFound() throws Exception {
        ExtraDTO extraDTO = new ExtraDTO();
        extraDTO.setAnimeId(1);

        Mockito.when(userService.deleteWatchList(extraDTO.getAnimeId(), user)).thenReturn("WatchList item not found");

        mockMvc.perform(post("/deleteWatchList")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(extraDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string("WatchList item not found"));

        Mockito.verify(userService, Mockito.times(1)).deleteWatchList(extraDTO.getAnimeId(), user);
    }


    @Test
    @WithMockUser(username = "malliga@gmail.com", authorities = {"user:post"})
    void changePassword_Success() throws Exception {
        ExtraDTO extraDTO = new ExtraDTO();
        extraDTO.setOldPassword("oldPass");
        extraDTO.setNewPassword("newPass");

        Mockito.when(userService.verifyCurrentPassword("malliga@gmail.com", "oldPass")).thenReturn(true);

        mockMvc.perform(post("/changePassword")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(extraDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string("Password changed successfully."));

        Mockito.verify(userService, Mockito.times(1)).updateUser("malliga@gmail.com", "newPass");
    }

    @Test
    @WithMockUser(username = "malliga@gmail.com", authorities = {"user:post"})
    void changePassword_Failure() throws Exception {
        ExtraDTO extraDTO = new ExtraDTO();
        extraDTO.setOldPassword("wrongOldPass");
        extraDTO.setNewPassword("newPass");

        Mockito.when(userService.verifyCurrentPassword("malliga@gmail.com", "wrongOldPass")).thenReturn(false);

        mockMvc.perform(post("/changePassword")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(extraDTO)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Current password is incorrect"));

        Mockito.verify(userService, Mockito.never()).updateUser(Mockito.anyString(), Mockito.anyString());
    }

    @Test
    @WithMockUser(username = "hari@gmail.com", authorities = {"admin:post"})
    void deleteComment_Success() throws Exception {
        int commentId = 1;

        mockMvc.perform(get("/deleteComment")
                        .param("commentId", String.valueOf(commentId)))
                .andExpect(status().isOk())
                .andExpect(content().string("Comment deleted successfully."));

        Mockito.verify(reviewService, Mockito.times(1)).deleteComment(commentId);
    }

    @Test
    @WithMockUser(username = "malliga@gmail.com", authorities = {"user:post"})
    void deleteComment_Unauthorized() throws Exception {
        int commentId = 1;

        mockMvc.perform(get("/deleteComment")
                        .param("commentId", String.valueOf(commentId)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Only Admin is allowed to delete comment."));

        Mockito.verify(reviewService, Mockito.never()).deleteComment(Mockito.anyInt());
    }
}
