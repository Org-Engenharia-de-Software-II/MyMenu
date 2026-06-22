package myMenu.backend.demo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import myMenu.backend.demo.dto.LoginDTO;
import myMenu.backend.demo.dto.PreferenciasDTO;
import myMenu.backend.demo.dto.UsuarioCadastroDTO;
import myMenu.backend.demo.model.Usuario;
import myMenu.backend.demo.service.UsuarioService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UsuarioController.class)
class UsuarioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UsuarioService usuarioService;

    @Test
    void deveCadastrarUsuarioComSucesso() throws Exception {
        UsuarioCadastroDTO dto = new UsuarioCadastroDTO("Laura", "laura@email.com", "123456", "Perda de peso");
        Usuario retorno = new Usuario("Laura", "laura@email.com");

        when(usuarioService.criarNovoUsuario(any(), any(), any(), any()))
            .thenReturn(retorno);

        mockMvc.perform(post("/usuarios")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isCreated());
    }

    @Test
    void deveRetornar400QuandoEmailJaCadastrado() throws Exception {
        UsuarioCadastroDTO dto = new UsuarioCadastroDTO("Laura", "laura@email.com", "123456", "Perda de peso");

        when(usuarioService.criarNovoUsuario(any(), any(), any(), any()))
            .thenThrow(new IllegalArgumentException("Este e-mail já está em uso."));

        mockMvc.perform(post("/usuarios")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("Este e-mail já está em uso."));
    }

    @Test
    void deveLoginComSucesso() throws Exception {
        LoginDTO dto = new LoginDTO("laura@email.com", "123456");
        Usuario retorno = new Usuario("Laura", "laura@email.com");

        when(usuarioService.autenticarUsuario(any(), any()))
            .thenReturn(retorno);

        mockMvc.perform(post("/usuarios/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isOk());
    }

    @Test
    void deveRetornar401QuandoSenhaErrada() throws Exception {
        LoginDTO dto = new LoginDTO("laura@email.com", "senhaerrada");

        when(usuarioService.autenticarUsuario(any(), any()))
            .thenThrow(new IllegalArgumentException("Senha incorreta."));

        mockMvc.perform(post("/usuarios/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isUnauthorized())
            .andExpect(content().string("Senha incorreta."));
    }

    @Test
    void deveBuscarUsuarioPorId() throws Exception {
        Usuario retorno = new Usuario("Laura", "laura@email.com");

        when(usuarioService.buscarPorId(1L))
            .thenReturn(retorno);

        mockMvc.perform(get("/usuarios/1"))
            .andExpect(status().isOk());
    }

    @Test
    void deveRetornar404QuandoUsuarioNaoExiste() throws Exception {
        when(usuarioService.buscarPorId(99L))
            .thenThrow(new IllegalArgumentException("Usuário não encontrado."));

        mockMvc.perform(get("/usuarios/99"))
            .andExpect(status().isNotFound())
            .andExpect(content().string("Usuário não encontrado."));
    }

    @Test
    void deveAtualizarPreferencias() throws Exception {
        PreferenciasDTO dto = new PreferenciasDTO("Vegana", List.of("Glúten"), List.of("Ovo"));
        Usuario retorno = new Usuario("Laura", "laura@email.com");

        when(usuarioService.atualizarPreferencias(any(), any(), any(), any()))
            .thenReturn(retorno);

        mockMvc.perform(put("/usuarios/1/preferencias")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isOk());
    }
}