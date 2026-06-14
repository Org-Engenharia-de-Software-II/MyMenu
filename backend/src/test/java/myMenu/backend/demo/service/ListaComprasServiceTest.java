package myMenu.backend.demo.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import myMenu.backend.demo.model.Ingrediente;
import myMenu.backend.demo.model.ItemListaCompras;
import myMenu.backend.demo.model.ListaDeCompras;
import myMenu.backend.demo.repository.IngredienteRepository;
import myMenu.backend.demo.repository.ListaDeComprasRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class ListaComprasServiceTest {

    @Mock
    private ListaDeComprasRepository listaRepository;

    @Mock
    private IngredienteRepository ingredienteRepository;

    @InjectMocks
    private ListaComprasService listaComprasService;

    @Test
    void deveAdicionarNovoItemNaLista() {
        ListaDeCompras listaMock = new ListaDeCompras();
        Ingrediente cebola = new Ingrediente("Cebola");

        when(listaRepository.findById(1L)).thenReturn(Optional.of(listaMock));
        when(ingredienteRepository.findByNomeIgnoreCase("Cebola")).thenReturn(Optional.of(cebola));
        when(listaRepository.save(any(ListaDeCompras.class))).thenAnswer(i -> i.getArguments()[0]);

        ListaDeCompras resultado = listaComprasService.adicionarItemNaLista(1L, "Cebola", 2.0, "unidades", "Vegetais");

        assertEquals(1, resultado.getItens().size());
        assertEquals("Cebola", resultado.getItens().get(0).getIngrediente().getNome());
    }
}