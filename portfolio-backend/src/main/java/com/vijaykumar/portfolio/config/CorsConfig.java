/* Problem No. #N/A (Security Configuration)
Difficulty: Easy
Description: CORS Configuration for local and production frontend-backend communication
Link: https://github.com/VijayKumarCode/Portfolio_web
Time Complexity: O(1)
Space Complexity: O(1)
*/

package com.vijaykumar.portfolio.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.lang.NonNull;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(
                            "http://127.0.0.1:5500",      // Local Development (Python Server)
                            "http://localhost:5500",       // Alternative local address
                            "https://vijaykumarcode.vercel.app" // Production Vercel URL
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}