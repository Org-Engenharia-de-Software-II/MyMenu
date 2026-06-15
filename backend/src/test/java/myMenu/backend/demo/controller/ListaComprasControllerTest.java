package myMenu.backend.demo.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import myMenu.backend.demo.model.ListaDeCompras;
import myMenu.backend.demo.service.ListaComprasService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ListaComprasController.class)
class ListaComprasControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ListaComprasService listaComprasService;

    @Test
    void deveAdicionarItemNaListaComSucesso() throws Exception {
        ListaDeCompras lista = new ListaDeCompras();

        when(listaComprasService.adicionarItemNaLista(1L, "Arroz", 2.0, "kg", "Grãos"))
                .thenReturn(lista);

        mockMvc.perform(post("/listas/1/itens")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "nomeIngrediente": "Arroz",
                        "quantidade": 2.0,
                        "unidade": "kg",
                        "categoria": "Grãos"
                    }
                """))
                .andExpect(status().isOk());
    }

    @Test
    void deveRetornarBadRequestQuandoListaNaoEncontrada() throws Exception {
        when(listaComprasService.adicionarItemNaLista(99L, "Arroz", 2.0, "kg", "Grãos"))
                .thenThrow(new IllegalArgumentException("Lista não encontrada."));

        mockMvc.perform(post("/listas/99/itens")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "nomeIngrediente": "Arroz",
                        "quantidade": 2.0,
                        "unidade": "kg",
                        "categoria": "Grãos"
                    }
                """))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Lista não encontrada."));
    }

    @Test
    void deveMarcarItemComoComprado() throws Exception {
        ListaDeCompras lista = new ListaDeCompras();

        when(listaComprasService.checkItemComprado(1L, 2L)).thenReturn(lista);

        mockMvc.perform(patch("/listas/1/itens/2/comprado"))
                .andExpect(status().isOk());
    }

    @Test
    void deveRetornarBadRequestQuandoItemNaoEncontrado() throws Exception {
        when(listaComprasService.checkItemComprado(1L, 99L))
                .thenThrow(new IllegalArgumentException("Item não encontrado na lista."));

        mockMvc.perform(patch("/listas/1/itens/99/comprado"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Item não encontrado na lista."));
    }

    @Test
    void deveBuscarListaPorIdComSucesso() throws Exception {
        ListaDeCompras lista = new ListaDeCompras();

        when(listaComprasService.buscarPorId(1L)).thenReturn(lista);

        mockMvc.perform(get("/listas/1"))
                .andExpect(status().isOk());
    }

    @Test
    void deveBuscarOuCriarListaPorUsuarioComSucesso() throws Exception {
        ListaDeCompras lista = new ListaDeCompras();

        when(listaComprasService.buscarOuCriarListaPorUsuario(1L)).thenReturn(lista);

        mockMvc.perform(get("/listas/usuario/1"))
                .andExpect(status().isOk());
    }

}