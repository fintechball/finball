package com.finball.mydata.service;

import com.finball.mydata.dto.card.CardInfoDto;
import com.finball.mydata.dto.card.GetCardsDto;
import com.finball.mydata.dto.card.GetCardsDto.Request;
import com.finball.mydata.dto.card.GetCardsDto.Response;
import com.finball.mydata.dto.card.RegistCardDto;
import com.finball.mydata.entity.Card;
import com.finball.mydata.entity.Company;
import com.finball.mydata.entity.Member;
import com.finball.mydata.repository.card.CardCustomRepository;
import com.finball.mydata.repository.card.CardRepository;
import com.finball.mydata.repository.CompanyRepository;
import com.finball.mydata.repository.MemberRepository;
import com.finball.mydata.util.RandomCard;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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
    private final CardCustomRepository cardCustomRepository;

    public void createCard(Long memberId) throws IOException, ParseException {
        Member member = memberRepository.findById(memberId).get();
        RegistCardDto registCardDto = randomCard.create();

        Long companyId = registCardDto.getCompanyId();
        Company company = companyRepository.findById(companyId).get();
        Card card = registCardDto.toCard(member, company);

        cardRepository.save(card);

    }

    public GetCardsDto.Response getCardList(GetCardsDto.Request request, Member member) {

        List<Long> cardCompanyList = request.getCardCompanyCodeList();
        List<Card> cards = cardCustomRepository.findAllByMemberIdAndCompanyIdInWithFetchJoin(member.getId(), cardCompanyList);

        List<CardInfoDto> cardInfoList = new ArrayList<>();
        for(Card card :cards){
            cardInfoList.add(card.toCardInfoDto());
        }

        return GetCardsDto.Response.builder()
                .cardList(cardInfoList)
                .build();
    }
}
