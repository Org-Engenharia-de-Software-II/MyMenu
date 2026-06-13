package myMenu.backend.demo.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import myMenu.backend.demo.model.CardapioSemanal;
import myMenu.backend.demo.service.CardapioSemanalService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(CardapioSemanalController.class)
class CardapioSemanalControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CardapioSemanalService cardapioSemanalService;

    @Test
    void deveGerarCardapioComSucesso() throws Exception {
        CardapioSemanal cardapio = new CardapioSemanal();

        when(cardapioSemanalService.gerarCardapio(1L)).thenReturn(cardapio);

        mockMvc.perform(post("/usuarios/1/cardapio/gerar"))
                .andExpect(status().isOk());
    }

    @Test
    void deveRetornarBadRequestQuandoUsuarioNaoEncontrado() throws Exception {
        when(cardapioSemanalService.gerarCardapio(99L))
                .thenThrow(new IllegalArgumentException("Usuário não encontrado."));

        mockMvc.perform(post("/usuarios/99/cardapio/gerar"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Usuário não encontrado."));
    }

    @Test
    void deveRetornarBadRequestQuandoReceitasInsuficientes() throws Exception {
        when(cardapioSemanalService.gerarCardapio(1L))
                .thenThrow(new IllegalStateException("Receitas insuficientes para as suas restrições e perfil."));

        mockMvc.perform(post("/usuarios/1/cardapio/gerar"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Receitas insuficientes para as suas restrições e perfil."));
    }
}