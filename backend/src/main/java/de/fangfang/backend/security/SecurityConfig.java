package de.fangfang.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    /*    @Bean
        public InMemoryUserDetailsManager userDetailsManager() {
            return new InMemoryUserDetailsManager(
                    User.builder()
                            .username("max")
                            .password("max")
                            .roles("ADMIN")
                            .build()
            );
        }
    */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf().disable()
                .httpBasic()
                .authenticationEntryPoint((request, response, authException) ->
                        response.sendError(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase()))
                .and()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/login").permitAll()
                        .requestMatchers("/any-endpoint").permitAll()
                        .requestMatchers("/admin-only").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .build();

    }
}
