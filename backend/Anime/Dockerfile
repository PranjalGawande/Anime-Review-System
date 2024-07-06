#FROM openjdk:17-jdk-alpin
#ARG JAR_FILE=target/*.jar
#COPY ./target/Anime-0.0.1-SNAPSHOT.jar app.jar
#ENTRYPOINT ["java", "-jar" , "/app.jar"]

# Use the official OpenJDK 11 image as base
FROM openjdk:17

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/Anime-0.0.1-SNAPSHOT.jar /app/

# Command to run the application when the container starts
CMD ["java", "-jar", "Anime-0.0.1-SNAPSHOT.jar"]