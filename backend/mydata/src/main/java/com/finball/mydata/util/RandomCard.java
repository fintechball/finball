package com.finball.mydata.util;

import com.finball.mydata.dto.card.CardDto;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.Random;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;

@Component
public class RandomCard {

    Random random = new Random();

    static final String JSON_FILE_PATH = "C:\\Users\\SSAFY\\Desktop\\ssafy2\\ssafy2-2\\S09P22E106\\backend\\mydata\\src\\main\\java\\com\\finball\\mydata\\util\\json\\card.json";

    public CardDto create() throws IOException, ParseException {
        JSONParser parser = new JSONParser();
        Reader reader = new FileReader(JSON_FILE_PATH);

        JSONObject data = (JSONObject) parser.parse(reader);
        JSONArray cards = (JSONArray) data.get("cards");
        JSONObject card = getRandomCard(cards);

        return createCardDto(card);
    }

    private CardDto createCardDto(JSONObject card) {
        String cardNumber = createCardNumber(card);
        String name = (String) card.get("name");
        Long companyId = (Long) card.get("cp_id");
        String image = (String) card.get("image");

        return CardDto.builder()
                .cardNumber(cardNumber)
                .companyId(companyId)
                .name(name)
                .image(image)
                .build();
    }

    private String createCardNumber(JSONObject card) {
        JSONArray length = (JSONArray) card.get("length");
        JSONArray bin = (JSONArray) card.get("bin");

        String cardNumber = "";

        int randIndex = random.nextInt(bin.size());

        cardNumber += bin.get(randIndex);

        cardNumber += getIntervalNumber((long) length.get(randIndex), cardNumber.length());

        return addDash(cardNumber);
    }

    // - 넣어주기
    private String addDash(String cardNumber) {

        StringBuffer sb = new StringBuffer();
        sb.append(cardNumber);

        if (cardNumber.length() == 16) { //16글자 4-4-4-4

            sb.insert(12, "-");
            sb.insert(8, "-");
            sb.insert(4, "-");

            return sb.toString();
        }

        //14글자, 15글자 => 4-6-*
        sb.insert(10, "-");
        sb.insert(4, "-");

        return sb.toString();
    }

    private String getIntervalNumber(long length, int cardNumberLength) {
        int loop = (int) length - cardNumberLength;
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < loop; i++) {
            sb.append(random.nextInt(10));
        }

        return sb.toString();
    }

    private JSONObject getRandomCard(JSONArray cards) {
        int cardIndex = random.nextInt(cards.size());

        return (JSONObject) cards.get(cardIndex);
    }
}
