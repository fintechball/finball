package com.example.backend.util;

import com.example.backend.dto.RestDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.charset.Charset;
import java.util.List;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class RestTemplateUtil {

    private final String MYDATA_URL = "http://localhost:8081";
    private ObjectMapper objectMapper = new ObjectMapper();

    public ResponseEntity<String> callMydata(String token, Object request, String url, HttpMethod httpMethod)
            throws JsonProcessingException {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        if (token != null) {
            httpHeaders.setBearerAuth(token);
        }

        String requestBody = objectMapper.writeValueAsString(request);

        HttpEntity<?> entity = new HttpEntity<>(requestBody, httpHeaders);

        ResponseEntity<String> respEntity = restTemplate
                .exchange(MYDATA_URL + url, httpMethod, entity, String.class);

        return respEntity;
    }

    public List<?> parseListBody(RestDto<?> response, String key) throws JsonProcessingException {
        JsonNode body = getBody(response.getRespEntity(), key);
        Class<?> clazz = response.getClassName();
        JavaType listType = objectMapper.getTypeFactory()
                .constructCollectionType(List.class, clazz);

        return objectMapper.readValue(body.toString(), listType);
    }

    public Object parseBody(RestDto<?> response, String key) throws JsonProcessingException {
        JsonNode body = getBody(response.getRespEntity(), key);
        Class<?> clazz = response.getClassName();

        return objectMapper.readValue(body.toString(), clazz);
    }

    public JsonNode getBody(ResponseEntity<String> respEntity, String key)
            throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper
                .enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);  // list deserialization 기능 활성화
        JsonNode jsonNode = objectMapper.readTree(respEntity.getBody());

        JsonNode data = objectMapper.readTree(String.valueOf(jsonNode.get("data")));
        JsonNode body = objectMapper.readTree(String.valueOf(data.get(key)));

        return body;
    }

}
