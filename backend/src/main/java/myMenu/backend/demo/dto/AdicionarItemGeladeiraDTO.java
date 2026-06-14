package myMenu.backend.demo.dto;

import java.time.LocalDate;

public record AdicionarItemGeladeiraDTO(
    String nomeIngrediente,
    double quantidade,
    String unidade,
    String categoria,
    LocalDate dataValidade
){}