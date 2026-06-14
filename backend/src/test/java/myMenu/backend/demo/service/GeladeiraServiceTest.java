package myMenu.backend.demo.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import myMenu.backend.demo.model.Geladeira;
import myMenu.backend.demo.model.Ingrediente;
import myMenu.backend.demo.model.Usuario;
import myMenu.backend.demo.repository.IngredienteRepository;
import myMenu.backend.demo.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class GeladeiraServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private IngredienteRepository ingredienteRepository;

    @InjectMocks
    private GeladeiraService geladeiraService;

    private Usuario usuarioMock;

    @BeforeEach
    void setUp() {
        usuarioMock = new Usuario("Teste", "teste@email.com");
    }

    @Test
    void deveAdicionarItemNaGeladeiraComSucesso() {
        Ingrediente tomate = new Ingrediente("Tomate");
        
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuarioMock));
        when(ingredienteRepository.findByNomeIgnoreCase("Tomate")).thenReturn(Optional.of(tomate));

        Geladeira resultado = geladeiraService.adicionarItem(1L, "Tomate", 2.0, "unidades", "Frutas e vegetais", LocalDate.now().plusDays(5));

        assertNotNull(resultado);
        assertEquals(1, resultado.getItens().size());
        assertEquals("Tomate", resultado.getItens().get(0).getIngrediente().getNome());
        assertEquals("Frutas e vegetais", resultado.getItens().get(0).getCategoria());
        
        verify(usuarioRepository, times(1)).save(usuarioMock);
    }

    @Test
    void deveLancarExcecaoSeUsuarioNaoExistirAoAdicionarItem() {
        when(usuarioRepository.findById(99L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            geladeiraService.adicionarItem(99L, "Cenoura", 1.0, "unidades", "Vegetais", LocalDate.now().plusDays(3));
        });

        assertEquals("Usuário não encontrado.", exception.getMessage());
    }
}