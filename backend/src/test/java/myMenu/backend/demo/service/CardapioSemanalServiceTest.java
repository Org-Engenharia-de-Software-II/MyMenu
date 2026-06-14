package myMenu.backend.demo.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import myMenu.backend.demo.model.CardapioSemanal;
import myMenu.backend.demo.model.Receita;
import myMenu.backend.demo.model.Usuario;
import myMenu.backend.demo.repository.CardapioSemanalRepository;
import myMenu.backend.demo.repository.ReceitaRepository;
import myMenu.backend.demo.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class CardapioSemanalServiceTest {

    @Mock private ReceitaService receitaService;
    @Mock private CardapioAIService aiService;
    @Mock private ReceitaRepository receitaRepository;
    @Mock private CardapioSemanalRepository cardapioRepository;
    @Mock private UsuarioRepository usuarioRepository;
    @Mock private ObjectMapper objectMapper;

    @InjectMocks
    private CardapioSemanalService cardapioSemanalService;

    @Test
    void deveLancarExcecaoSeMenosDe14ReceitasDisponiveis() {
        Usuario usuarioMock = new Usuario("Teste", "teste@email.com");
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuarioMock));
        
        // Simula o banco retornando apenas 5 receitas compatíveis
        List<Receita> poucasReceitas = new ArrayList<>();
        for(int i=0; i<5; i++) poucasReceitas.add(new Receita());
        
        when(receitaService.buscarCandidatasParaCardapio(usuarioMock)).thenReturn(poucasReceitas);

        Exception exception = assertThrows(IllegalStateException.class, () -> {
            cardapioSemanalService.gerarCardapio(1L);
        });

        assertTrue(exception.getMessage().contains("Receitas insuficientes"));
        
        // Garante que a IA não seja chamada se não houver receitas suficientes (economiza tokens)
        verify(aiService, never()).gerarSugestaoSemanal(any(), any());
    }

    @Test
    void deveGerarCardapioComSucesso() throws Exception {
        Usuario usuarioMock = new Usuario("Teste", "teste@email.com");
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuarioMock));

        // Cria as 14+ receitas para passar na trava de segurança
        List<Receita> receitasDisponiveis = new ArrayList<>();
        for(int i=0; i<15; i++) {
            Receita r = new Receita();
            r.setId((long) i);
            receitasDisponiveis.add(r);
        }

        when(receitaService.buscarCandidatasParaCardapio(usuarioMock)).thenReturn(receitasDisponiveis);

        String fakeJson = "JSON";
        when(aiService.gerarSugestaoSemanal(usuarioMock, receitasDisponiveis)).thenReturn(fakeJson);

        // Simulando a conversão do ObjectMapper
        List<Map<String, Object>> mockConvertido = new ArrayList<>();
        Map<String, Object> escolha = new HashMap<>();
        escolha.put("receitaId", 1);
        escolha.put("dia", "SEGUNDA");
        escolha.put("refeicao", "ALMOCO");
        mockConvertido.add(escolha);

        when(objectMapper.readValue(anyString(), any(TypeReference.class))).thenReturn(mockConvertido);
        when(receitaRepository.findById(1L)).thenReturn(Optional.of(new Receita()));
        when(cardapioRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);

        CardapioSemanal gerado = cardapioSemanalService.gerarCardapio(1L);

        assertNotNull(gerado);
        verify(cardapioRepository, times(1)).save(any());
    }
}