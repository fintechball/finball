package com.finball.mydata.service;

import com.finball.mydata.dto.card.RegistCardDto;
import com.finball.mydata.entity.Card;
import com.finball.mydata.entity.Company;
import com.finball.mydata.entity.Member;
import com.finball.mydata.repository.CardRepository;
import com.finball.mydata.repository.CompanyRepository;
import com.finball.mydata.repository.MemberRepository;
import com.finball.mydata.util.RandomCard;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CardService {

    private final CardRepository cardRepository;
    private final MemberRepository memberRepository;
    private final CompanyRepository companyRepository;
    private final RandomCard randomCard;

    public void createCard(Long memberId) throws IOException, ParseException {
        Member member = memberRepository.findById(memberId).get();
        RegistCardDto registCardDto = randomCard.create();

        Long companyId = registCardDto.getCompanyId();
        Company company = companyRepository.findById(companyId).get();
        Card card = registCardDto.toCard(member, company);

        cardRepository.save(card);

    }
}
