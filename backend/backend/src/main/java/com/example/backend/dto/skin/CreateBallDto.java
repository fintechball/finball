package com.example.backend.dto.skin;

import com.example.backend.entity.Skin;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class CreateBallDto {

    @Data
    @NoArgsConstructor
    public static class Request {

        String name;
        String image;
        int value;

        public Skin toSkin() {
            return Skin.builder()
                    .name(this.name)
                    .image(this.image)
                    .value(this.value).build();
        }
    }


}
