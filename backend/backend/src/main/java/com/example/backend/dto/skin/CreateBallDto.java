package com.example.backend.dto.skin;

import com.example.backend.entity.Skin;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class CreateBallDto {

    @Data
    @AllArgsConstructor
    public class Request {

        Skin skin;
    }

}
