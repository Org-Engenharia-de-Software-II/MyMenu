package myMenu.backend.demo.dto;

public record AdicionarItemListaDTO(
    String nomeIngrediente,
    double quantidade,
    String unidade,
    String categoria
) {}