package myMenu.backend.demo.dto;

import java.util.List;

public record PreferenciasDTO
(
    String dietaEspecifica,
    List<String> restricoes,
    List<String> ingredientesEvitados
) 
{
}