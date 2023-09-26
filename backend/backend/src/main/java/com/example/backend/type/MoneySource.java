package com.example.backend.type;

public enum MoneySource {

    월급, 자영업수익, 투자수익, 기타소득, 가족지원, 기타;

    public String toString() {
        return name();
    }
}
