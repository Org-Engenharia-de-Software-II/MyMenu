package myMenu.backend.demo.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import myMenu.backend.demo.model.Receita;
import myMenu.backend.demo.model.Usuario;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.ai.chat.client.ChatClient;
import org.mockito.Answers;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(MockitoExtension.class)
class CardapioAIServiceTest {

    @Mock(answer = Answers.RETURNS_DEEP_STUBS)
    private ChatClient chatClientMock;

    @Mock
    private ChatClient.Builder builderMock;

    private CardapioAIService aiService;

    @BeforeEach
    void setUp() {
        when(builderMock.build()).thenReturn(chatClientMock);
        aiService = new CardapioAIService(builderMock);
    }

    @Test
    void deveGerarSugestaoRetornandoJson() {
        Usuario usuario = new Usuario("Teste", "teste@email.com");
        usuario.setObjetivo("Emagrecimento");
        
        List<Receita> receitas = new ArrayList<>();
        Receita r = new Receita();
        r.setId(1L);
        r.setNome("Tacos");
        receitas.add(r);

        String jsonEsperado = "[{\"dia\":\"SEGUNDA\", \"refeicao\":\"ALMOCO\", \"receitaId\":1}]";

        // Simula o comportamento encadeado da biblioteca do Spring AI
        when(chatClientMock.prompt().user(anyString()).call().content()).thenReturn(jsonEsperado);

        String resposta = aiService.gerarSugestaoSemanal(usuario, receitas);

        assertEquals(jsonEsperado, resposta);
    }
}