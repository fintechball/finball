package com.example.backend.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpMethod;

@Data
@AllArgsConstructor
public class Path {

    private HttpMethod httpMethod;
    private String url;

}
