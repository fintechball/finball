package com.example.backend;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

import com.example.backend.dto.groupaccount.RegistGroupAccountDto;
import com.example.backend.entity.GroupAccount;
import com.example.backend.entity.Member;
import com.example.backend.repository.groupaccount.GroupAccountRepository;
import com.example.backend.repository.member.MemberRepository;
import com.example.backend.service.GroupAccountService;
import com.example.backend.type.GameType;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.Mock;


@RequiredArgsConstructor
@ExtendWith(MockitoExtension.class)
@Transactional
public class GroupAccountServiceTest {
    private final MemberRepository memberRepository;

    @Mock
    private GroupAccountRepository groupAccountRepository;

    @InjectMocks
    GroupAccountService groupAccountService;

    @Test
    @DisplayName("모임 통장 저장 서비스 테스트")
    public void saveGroupAccountServiceTest() {

        // given
        Member newMember = Member.builder()
                .userId("user")
                .password("password")
                .name("name")
                .phoneNumber("phoneNumber")
                .build();
        Member member = memberRepository.save(newMember);

        RegistGroupAccountDto.Request request = RegistGroupAccountDto.Request.builder()
                .name("핫식스더킹제로")
                .gameType(GameType.게임1)
                .build();
        GroupAccount groupAccount = request.toGroupAccount(member);

        given(groupAccountRepository.save(groupAccount)).willReturn(groupAccount);

        // when
        groupAccountService.save(request, member);

        // then
        verify(groupAccountRepository.save(any()));
    }
}
