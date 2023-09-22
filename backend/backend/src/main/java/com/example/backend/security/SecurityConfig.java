package com.example.backend.security;

import com.example.backend.repository.member.MemberRepository;
import com.example.backend.security.filter.FormLoginFilter;
import com.example.backend.security.filter.JwtAuthFilter;
import com.example.backend.security.jwt.HeaderTokenExtractor;
import com.example.backend.security.jwt.JwtTokenUtils;
import com.example.backend.security.provider.FormLoginAuthProvider;
import com.example.backend.security.provider.JwtAuthProvider;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig {

    private final JwtTokenUtils jwtTokenUtils;
    private final HeaderTokenExtractor extractor;
    private final MemberRepository memberRepository;
    private final UserDetailsServiceImpl userDetailsService;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        return http
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()  // 필터 생성할때 마다 and해줘야됨
                .formLogin().disable()
                .httpBasic().disable()
                .apply(new CustomFilter())
                .and()
                .authorizeRequests().anyRequest().permitAll() // 인증이 필요한 요청들 다 받아줌
                .and()
                .build();

    }

    @Bean
    public BCryptPasswordEncoder encodePassword() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    void registerProvider(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(new FormLoginAuthProvider(userDetailsService));
        auth.authenticationProvider(new JwtAuthProvider(jwtTokenUtils, memberRepository));
    }


    FormLoginFilter formLoginFilter(AuthenticationManager authenticationManager) {
        FormLoginFilter formLoginFilter = new FormLoginFilter(authenticationManager);

        formLoginFilter.setFilterProcessesUrl("/api/user/login"); // 해당 URL로 접근하면 Filter를 실행할 것이다.
        formLoginFilter.setAuthenticationSuccessHandler(
                new FormLoginSuccessHandler(jwtTokenUtils)
        ); // filter를 실행해서 성공되는 경우 커스텀한 Handler 실행
        formLoginFilter.afterPropertiesSet();  // 모든 properties들이 설정이 완료되고 fliter가 실행되게 하겠다.

        return formLoginFilter;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("http://localhost:5173"); // local 테스트 시
        configuration.setAllowCredentials(true);
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.addExposedHeader("*");
        configuration.addExposedHeader("Access_Token");
        configuration.addExposedHeader("Refresh_Token");
        val source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    JwtAuthFilter jwtAuthFilter(AuthenticationManager authenticationManager) {
        List<Path> skipPathList = new ArrayList<>();

        // User
        skipPathList.add(new Path(HttpMethod.POST, "/api/user"));
        skipPathList.add(new Path(HttpMethod.POST, "/api/user/login"));
        skipPathList.add(new Path(HttpMethod.POST, "/api/user/authentication/id"));


        // Deploy
        skipPathList.add(new Path(HttpMethod.GET, "/api/profile"));

        // HealthCheck
        skipPathList.add(new Path(HttpMethod.GET, "/actuator/health"));

        // sms
        skipPathList.add(new Path(HttpMethod.POST, "/api/user/sms"));

        FilterSkipMatcher matcher = new FilterSkipMatcher(skipPathList, "/**");
        JwtAuthFilter filter = new JwtAuthFilter(matcher, extractor);
        filter.setAuthenticationManager(authenticationManager);
        return filter;
    }

    public class CustomFilter extends AbstractHttpConfigurer<CustomFilter, HttpSecurity> {

        @Override
        public void configure(HttpSecurity http) throws Exception {
            System.out.println("CustomFilter : configure");

            AuthenticationManager authenticationManager = http
                    .getSharedObject(AuthenticationManager.class);

            http
                    .addFilterBefore(formLoginFilter(authenticationManager),
                            UsernamePasswordAuthenticationFilter.class)
                    .addFilterBefore(jwtAuthFilter(authenticationManager),
                            UsernamePasswordAuthenticationFilter.class);
        }
    }

}
