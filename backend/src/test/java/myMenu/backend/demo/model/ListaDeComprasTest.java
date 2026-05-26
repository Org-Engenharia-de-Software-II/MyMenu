package myMenu.backend.demo.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;

class ListaDeComprasTest {

    private ListaDeCompras lista;

    @BeforeEach
    void setup(){
        lista = new ListaDeCompras();
    }

    @Test
    void deveSomarItensRepetidosNaListaDeCompras() {
        Ingrediente queijo = new Ingrediente("Queijo Mussarela");
        lista.adicionarItem(queijo, 200.0, "g");
        lista.adicionarItem(queijo, 150.0, "g");
        assertEquals(1, lista.getItens().size());
        assertEquals(350.0, lista.getItens().get(0).getQuantidade());
        assertFalse(lista.getItens().get(0).isComprado(), "O item deve nascer como não comprado");
    }

    @Test
    void deveMarcarItemComoComprado() {
        Ingrediente arroz = new Ingrediente("Arroz");
        lista.adicionarItem(arroz, 5.0, "kg");
        ItemListaCompras itemCadastrado = lista.getItens().get(0);
        lista.marcarComoComprado(itemCadastrado);
        assertTrue(itemCadastrado.isComprado(), "O item deve constar como comprado");
    }
    
}