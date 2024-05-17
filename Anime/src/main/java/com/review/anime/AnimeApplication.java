package com.review.anime;

import com.review.anime.entites.Role;
import com.review.anime.entites.User;
import com.review.anime.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import java.util.Calendar;

@SpringBootApplication
public class AnimeApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnimeApplication.class, args);
	}

	@Component
	class AdminIntiailizer implements CommandLineRunner {
		@Autowired
		private UserService userService;

		@Transactional
		public void run(String... args) throws Exception {

			if(!userService.getAdminList().isEmpty()) return;

			User user = new User();
			user.setEmail("admin@gmail.com");
			user.setPassword("Admin");
			user.setName("Admin");
			user.setRole(Role.ADMIN);
			user.setStatus(true);

			userService.addUser(user);
		}
	}
}
