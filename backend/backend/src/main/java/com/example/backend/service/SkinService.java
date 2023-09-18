package com.example.backend.service;

import com.example.backend.entity.Skin;
import com.example.backend.repository.skin.SkinRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SkinService {

    private final SkinRepository skinRepository;

    public void createSkin(Skin skin) {

        skinRepository.save(skin);
    }
}
