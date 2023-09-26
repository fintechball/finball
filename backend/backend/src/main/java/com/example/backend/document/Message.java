package com.example.backend.document;

import com.example.backend.entity.Member;
import com.example.backend.type.MessageType;
import java.time.LocalDateTime;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "message")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {

    @Id
    private String _id;

    private String body;

    private Long userId;

    private MessageType type;

    private LocalDateTime createAt;


    public Message(RegistMessageDto.Request request, Member member) {
        this.body = request.getAnswer();
        this.userId = member.getId();
        this.type = request.getType();
        this.createAt = LocalDateTime.now();
    }

    public MessageDto toResponse() {
        return MessageDto.builder()
                ._id(this._id)
                .body(this.body)
                .userId(this.userId)
                .type(this.type)
                .createAt(this.createAt)
                .build();
    }
}
