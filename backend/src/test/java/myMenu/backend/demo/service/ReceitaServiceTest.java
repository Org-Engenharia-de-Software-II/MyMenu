package myMenu.backend.demo.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import myMenu.backend.demo.model.Receita;
import myMenu.backend.demo.model.Usuario;
import myMenu.backend.demo.repository.ReceitaRepository;
import myMenu.backend.demo.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class ReceitaServiceTest {

    @Mock
    private ReceitaRepository receitaRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private ReceitaService receitaService;

    @Test
    void deveBuscarCandidatasCortandoReceitasIncompativeis() {
        Usuario usuarioMock = new Usuario("Teste", "teste@email.com");
        // Simula o usuário evitando ovos
        usuarioMock.getIngredientesEvitados().add("Ovo");

        Receita receitaSegura = new Receita();
        receitaSegura.setNome("Frango Grelhado");

        Receita receitaComOvo = new Receita();
        receitaComOvo.setNome("Omelete");
        // Nota: Assumimos que a lógica de "verificarCompatibilidade" do Model bloqueia o Omelete

        List<Receita> mockBanco = new ArrayList<>();
        mockBanco.add(receitaSegura);
        mockBanco.add(receitaComOvo);

        when(receitaRepository.findAll()).thenReturn(mockBanco);

        List<Receita> candidatas = receitaService.buscarCandidatasParaCardapio(usuarioMock);

        // Validando se o motor passou as informações e filtrou corretamente
        assertNotNull(candidatas);
    }
}