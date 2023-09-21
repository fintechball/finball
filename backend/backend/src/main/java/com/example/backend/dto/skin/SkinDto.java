package com.example.backend.dto.skin;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SkinDto {

    private Long id;
    private String image;
    private String name;
    private int value;
    private boolean isInvented;

}
