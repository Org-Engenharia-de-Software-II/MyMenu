package myMenu.backend.demo.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;

class GeladeiraTest {

    private Geladeira geladeira;

    @BeforeEach
    void setup(){
        geladeira = new Geladeira();
    }

    @Test
    void deveAdicionarNovoIngredienteNaGeladeira() {
        Ingrediente tomate = new Ingrediente("Tomate");
        geladeira.adicionarIngrediente(tomate, 2.0, "unidades");
        assertEquals("Tomate", geladeira.getItens().get(0).getIngrediente().getNome());
        assertEquals(1, geladeira.getItens().size());
        assertEquals(2.0, geladeira.getItens().get(0).getQuantidade());
        assertEquals("unidades", geladeira.getItens().get(0).getUnidadeMedida());
    }

    @Test
    void deveSomarQuantidadeQuandoIngredienteJaExisteComMesmaUnidade() {
        Ingrediente frango = new Ingrediente("Peito de Frango");
        geladeira.adicionarIngrediente(frango, 500.0, "g");
        geladeira.adicionarIngrediente(frango, 300.0, "g");
        assertEquals(1, geladeira.getItens().size(), "Não deve criar nova linha, apenas atualizar a existente");
        assertEquals(800.0, geladeira.getItens().get(0).getQuantidade(), "A quantidade total deve ser 800.0");
    }

    @Test
    void deveLancarExcecaoQuandoUnidadesForemDiferentes() {
        Ingrediente leite = new Ingrediente("Leite");
        geladeira.adicionarIngrediente(leite, 1.0, "L");
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            geladeira.adicionarIngrediente(leite, 500.0, "ml");
        });
        assertTrue(exception.getMessage().contains("Unidade de medida incompatível. Unidade certa: L"));
    }

    @Test
    void deveRemoverIngredienteCompletamente() {
        Ingrediente cebola = new Ingrediente("Cebola");
        geladeira.adicionarIngrediente(cebola, 3.0, "unidades");
        geladeira.removerIngrediente(cebola);
        assertTrue(geladeira.getItens().isEmpty(), "A geladeira deve ficar vazia após a remoção");
    }
    
}