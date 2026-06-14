package myMenu.backend.demo.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import myMenu.backend.demo.model.Usuario;
import myMenu.backend.demo.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    // Cria uma versão simulada do repositório
    @Mock
    private UsuarioRepository usuarioRepository;

    // Injeta o repositório simulado dentro do serviço real
    @InjectMocks
    private UsuarioService usuarioService;

    @Test
    void deveCriarNovoUsuarioComSucesso() {
        // Prepara o Mock: diz que o e-mail não existe no banco
        when(usuarioRepository.existsByEmail("teste@email.com")).thenReturn(false);
        // Prepara o Mock: quando mandar salvar, apenas retorna o próprio objeto
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(i -> i.getArguments()[0]);

        Usuario usuarioCriado = usuarioService.criarNovoUsuario("Nicolas", "teste@email.com", "senha123", "Emagrecimento");

        assertNotNull(usuarioCriado);
        assertEquals("Nicolas", usuarioCriado.getNome());
        assertEquals("senha123", usuarioCriado.getSenha());
        
        // Verifica se o método save foi chamado exatamente uma vez
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }

    @Test
    void deveLancarExcecaoQuandoEmailJaEstiverEmUso() {
        // Prepara o Mock: simula que o banco já tem esse e-mail
        when(usuarioRepository.existsByEmail("teste@email.com")).thenReturn(true);

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            usuarioService.criarNovoUsuario("Teste", "teste@email.com", "123", "Ganho de massa");
        });

        assertEquals("Este e-mail já está em uso.", exception.getMessage());
        
        // Garante que o sistema bloqueou a execução antes de chegar no save()
        verify(usuarioRepository, never()).save(any(Usuario.class));
    }
}