package com.example.backend.document;

import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collation = "event")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EventDoc {

    @Id
    private String _id;

    private String title;

    private String image;


}
