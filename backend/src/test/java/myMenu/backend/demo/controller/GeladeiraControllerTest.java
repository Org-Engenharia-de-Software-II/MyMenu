package myMenu.backend.demo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import myMenu.backend.demo.dto.AdicionarItemGeladeiraDTO;
import myMenu.backend.demo.model.Geladeira;
import myMenu.backend.demo.service.GeladeiraService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(GeladeiraController.class)
class GeladeiraControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private GeladeiraService geladeiraService;

    @Test
    void deveAdicionarItemNaGeladeira() throws Exception {
        AdicionarItemGeladeiraDTO dto = new AdicionarItemGeladeiraDTO(
            "Frango",
            500.0,
            "g",
            "Proteína",
            LocalDate.of(2026, 7, 1)
        );

        when(geladeiraService.adicionarItem(
            eq(1L), any(), anyDouble(), any(), any(), any()
        )).thenReturn(new Geladeira());

        mockMvc.perform(post("/usuarios/1/geladeira/itens")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isOk());
    }

    @Test
    void deveRetornar400QuandoUsuarioNaoExisteAoAdicionar() throws Exception {
        AdicionarItemGeladeiraDTO dto = new AdicionarItemGeladeiraDTO(
            "Frango",
            500.0,
            "g",
            "Proteína",
            LocalDate.of(2026, 7, 1)
        );

        when(geladeiraService.adicionarItem(
            eq(99L), any(), anyDouble(), any(), any(), any()
        )).thenThrow(new IllegalArgumentException("Usuário não encontrado."));

        mockMvc.perform(post("/usuarios/99/geladeira/itens")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("Usuário não encontrado."));
    }

    @Test
    void deveRetornar400QuandoUnidadeIncompativelAoAdicionar() throws Exception {
        AdicionarItemGeladeiraDTO dto = new AdicionarItemGeladeiraDTO(
            "Frango",
            500.0,
            "ml",
            "Proteína",
            LocalDate.of(2026, 7, 1)
        );

        when(geladeiraService.adicionarItem(
            eq(1L), any(), anyDouble(), any(), any(), any()
        )).thenThrow(new IllegalArgumentException("Unidade de medida incompatível. Unidade certa: g"));

        mockMvc.perform(post("/usuarios/1/geladeira/itens")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("Unidade de medida incompatível. Unidade certa: g"));
    }

    @Test
    void deveRemoverItemDaGeladeira() throws Exception {
        when(geladeiraService.removerItem(1L, "Frango"))
            .thenReturn(new Geladeira());

        mockMvc.perform(delete("/usuarios/1/geladeira/itens/Frango"))
            .andExpect(status().isOk());
    }

    @Test
    void deveRetornar400QuandoIngredienteNaoExisteAoRemover() throws Exception {
        when(geladeiraService.removerItem(1L, "Frango"))
            .thenThrow(new IllegalArgumentException("Ingrediente não encontrado."));

        mockMvc.perform(delete("/usuarios/1/geladeira/itens/Frango"))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("Ingrediente não encontrado."));
    }

    @Test
    void deveRetornar400QuandoUsuarioNaoExisteAoRemover() throws Exception {
        when(geladeiraService.removerItem(99L, "Frango"))
            .thenThrow(new IllegalArgumentException("Usuário não encontrado."));

        mockMvc.perform(delete("/usuarios/99/geladeira/itens/Frango"))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("Usuário não encontrado."));
    }
}