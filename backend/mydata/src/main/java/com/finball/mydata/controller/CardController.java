package com.finball.mydata.controller;

import com.finball.mydata.dto.Response;
import com.finball.mydata.dto.card.CardListDto;
import com.finball.mydata.security.auth.PrincipalDetails;
import com.finball.mydata.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class CardController {

    private final CardService cardService;

    @GetMapping("/create/card/{memberId}")
    public void createCard(@PathVariable Long memberId) throws Exception {
        cardService.createCard(memberId);
    }

    @PostMapping("/my-data/card")
    public Response<?> getCardList(@RequestBody CardListDto.Request request,
            @AuthenticationPrincipal PrincipalDetails userDetails) {
        System.out.println(userDetails.getMember().getName());
        Long id = userDetails.getMember().getId();
        CardListDto.Response response = cardService.getCardList(request, id);
        return new Response<>(200, "성공적으로 카드목록을 불러왔습니다.", response);
    }
}
