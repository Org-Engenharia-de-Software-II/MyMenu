package myMenu.backend.demo.controller;

import myMenu.backend.demo.model.Receita;
import myMenu.backend.demo.service.ReceitaService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ReceitaController.class)
class ReceitaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReceitaService receitaService;

    @Test
    void deveBuscarReceitasPorNome() throws Exception {
        when(receitaService.buscarPorNome("frango"))
            .thenReturn(List.of(new Receita()));

        mockMvc.perform(get("/receitas?nome=frango"))
            .andExpect(status().isOk());
    }

    @Test
    void deveBuscarReceitasComIngredientesDaGeladeira() throws Exception {
        when(receitaService.buscarReceitasComIngredientesDaGeladeira(1L))
            .thenReturn(List.of(new Receita()));

        mockMvc.perform(get("/receitas/geladeira/1"))
            .andExpect(status().isOk());
    }

    @Test
    void deveRetornar400QuandoUsuarioNaoExisteNaGeladeira() throws Exception {
        when(receitaService.buscarReceitasComIngredientesDaGeladeira(99L))
            .thenThrow(new IllegalArgumentException("Usuário não encontrado."));

        mockMvc.perform(get("/receitas/geladeira/99"))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("Usuário não encontrado."));
    }

    @Test
    void deveBuscarSugestoesPriorizandoGeladeira() throws Exception {
        when(receitaService.buscarPriorizandoGeladeira(1L))
            .thenReturn(List.of(new Receita()));

        mockMvc.perform(get("/receitas/sugestoes/1"))
            .andExpect(status().isOk());
    }

    @Test
    void deveBuscarReceitasRicasEmProteina() throws Exception {
        when(receitaService.buscarReceitasRicasEmProteina(30.0))
            .thenReturn(List.of(new Receita()));

        mockMvc.perform(get("/receitas/filtro/proteina?minimo=30.0"))
            .andExpect(status().isOk());
    }

    @Test
    void deveBuscarReceitasBaixaCaloria() throws Exception {
        when(receitaService.buscarReceitasBaixaCaloria(400))
            .thenReturn(List.of(new Receita()));

        mockMvc.perform(get("/receitas/filtro/calorias?maximo=400"))
            .andExpect(status().isOk());
    }

    @Test
    void deveBuscarReceitasLowCarb() throws Exception {
        when(receitaService.buscarReceitasLowCarb(20.0))
            .thenReturn(List.of(new Receita()));

        mockMvc.perform(get("/receitas/filtro/carbo?maximo=20.0"))
            .andExpect(status().isOk());
    }
}