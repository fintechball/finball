package com.example.backend.document.message;

import com.example.backend.type.MessageType;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MessageDto {
    private String _id;

    private String body;

    private Long userId;

    private MessageType type;

    private LocalDateTime createAt;
}
