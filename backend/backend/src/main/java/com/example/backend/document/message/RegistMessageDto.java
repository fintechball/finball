package com.example.backend.document.message;

import com.example.backend.type.MessageType;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class RegistMessageDto {

    @Data
    public static class Request {
        private String answer;
        private MessageType type;
    }

    @Data
    @AllArgsConstructor
    public static class Response {
        private List<MessageDto> messageList;
    }
}
