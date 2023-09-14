package com.finball.mydata.util;

import com.finball.mydata.dto.account.RegistAccountDto;
import com.finball.mydata.entity.Member;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.time.LocalDateTime;
import java.util.Random;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;

@Component
public class RandomAccount {

    Random random = new Random();
    static final String JSON_FILE_PATH = "C:\\Users\\SSAFY\\Desktop\\S09P22E106\\backend\\mydata\\src\\main\\java\\com\\finball\\mydata\\util\\json\\account.json";

    public RegistAccountDto create(Member member) throws IOException, ParseException {
        JSONParser parser = new JSONParser();
        Reader reader = new FileReader(JSON_FILE_PATH);

        JSONObject data = (JSONObject) parser.parse(reader);
        JSONArray banks = (JSONArray) data.get("banks");
        JSONObject bank = getRandomBank(banks);

        return createAccountDto(bank, member);
    }

    private RegistAccountDto createAccountDto(JSONObject bank, Member member) {
        String accountNumber = createAccountNumber(bank);
        LocalDateTime registerDt = LocalDateTime.now();
        String name = (String) bank.get("name");
        Long companyId = (Long) bank.get("cp_id");
        String accountName = createAccountName(bank);


        return RegistAccountDto.builder()
                .accountNumber(accountNumber)
                .registerDt(registerDt)
                .balance(0L)
                .accountName(accountName)
                .companyId(companyId)
                .build();
    }

    private String createAccountName(JSONObject bank){
        JSONArray names = (JSONArray) bank.get("accountName");
        int randIndex = random.nextInt(names.size());

        return (String) names.get(randIndex);
    }

    private String createAccountNumber(JSONObject bank) {
        JSONArray form = (JSONArray) bank.get("form");
        JSONArray type = (JSONArray) bank.get("type");
        Long typeIndex = (Long) bank.get("typeIndex");

        String accountNumber = "";

        for (int i = 0; i < form.size(); i++) {
            Long intervalSize = (Long) form.get(i);

            if (i == typeIndex) {
                accountNumber += getAccountTypeNumber(type);
            } else {
                accountNumber += getIntervalNumber(intervalSize);
            }

            accountNumber += "-";
        }

        accountNumber = accountNumber.substring(0, accountNumber.length() - 1);

        return accountNumber;
    }

    private String getAccountTypeNumber(JSONArray type) {
        int randIndex = random.nextInt(type.size());
        return (String) type.get(randIndex);
    }

    private String getIntervalNumber(Long intervalSize) {
        String intervalNumber = "";

        for (int j = 0; j < intervalSize; j++) {
            intervalNumber += Integer.toString(random.nextInt(10));
        }

        return intervalNumber;
    }

    private JSONObject getRandomBank(JSONArray banks) {
        int bankIndex = random.nextInt(10);
        return (JSONObject) banks.get(bankIndex);
    }
}
