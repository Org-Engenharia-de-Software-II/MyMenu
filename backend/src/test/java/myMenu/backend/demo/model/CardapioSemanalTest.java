package myMenu.backend.demo.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;

class CardapioSemanalTest {

    private CardapioSemanal cardapio;

    @BeforeEach
    void setup(){
        cardapio = new CardapioSemanal();
    }

    @Test
    void deveAgendarReceitaNoCardapio() {
        Receita lasanha = new Receita();
        lasanha.setId(1L);
        lasanha.setNome("Lasanha");
        cardapio.adicionarReceita(lasanha, "SEGUNDA-FEIRA", "ALMOÇO");
        assertEquals(1, cardapio.getItensCardapio().size());
        assertEquals("SEGUNDA-FEIRA", cardapio.getItensCardapio().get(0).getDiaDaSemana());
    }

    @Test
    void deveRemoverReceitaApenasDoDiaEspecifico() {
        Receita pizza = new Receita();
        pizza.setId(2L);
        cardapio.adicionarReceita(pizza, "SEXTA-FEIRA", "JANTAR");
        cardapio.adicionarReceita(pizza, "SABADO", "JANTAR");
        cardapio.removerReceitaEspecifica(pizza, "SEXTA-FEIRA", "JANTAR");
        assertEquals(1, cardapio.getItensCardapio().size(), "Deve sobrar 1 pizza no cardápio");
        assertEquals("SABADO", cardapio.getItensCardapio().get(0).getDiaDaSemana(), "A pizza de sábado deve ser mantida");
    }

    @Test
    void deveRemoverReceitaTotalmenteDaSemana() {
        Receita sopa = new Receita();
        sopa.setId(3L);
        cardapio.adicionarReceita(sopa, "SEGUNDA-FEIRA", "JANTAR");
        cardapio.adicionarReceita(sopa, "TERÇA-FEIRA", "JANTAR");
        cardapio.removerReceitaTotalmente(sopa);
        assertTrue(cardapio.getItensCardapio().isEmpty(), "Todas as instâncias da sopa devem ser apagadas");
    }
    
}