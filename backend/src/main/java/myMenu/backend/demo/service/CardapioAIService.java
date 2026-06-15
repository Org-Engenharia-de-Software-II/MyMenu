package myMenu.backend.demo.service;

import myMenu.backend.demo.model.Receita;
import myMenu.backend.demo.model.Usuario;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardapioAIService {

    private final ChatClient chatClient;

    public CardapioAIService(ObjectProvider<ChatClient.Builder> chatClientBuilderProvider) {
        ChatClient.Builder chatClientBuilder = chatClientBuilderProvider.getIfAvailable();
        this.chatClient = chatClientBuilder != null ? chatClientBuilder.build() : null;
    }

    public String gerarSugestaoSemanal(Usuario usuario, List<Receita> candidatas) {
        if (chatClient == null) {
            throw new IllegalStateException("Serviço de IA desativado. Configure OpenAI para habilitar geração de cardápio.");
        }

        String catalogo = construirCatalogo(candidatas);
        
        String objetivo = usuario.getObjetivo() != null ? usuario.getObjetivo() : "Alimentação saudável";
        String dieta = usuario.getDietaEspecifica() != null ? usuario.getDietaEspecifica() : "Nenhuma";

        String prompt = String.format("""
            Atue como um nutricionista inteligente. Monte um cardápio semanal completo.
            
            PERFIL DO USUÁRIO:
            Objetivo: %s
            Dieta: %s
            
            REGRAS RÍGIDAS E ABSOLUTAS:
            1. Escolha EXATAMENTE 14 receitas do catálogo abaixo (uma para o ALMOCO e uma para o JANTAR, para os 7 dias da semana).
            2. NENHUMA receita pode se repetir.
            3. A escolha deve estar alinhada ao objetivo, balanceando os macronutrientes.
            4. Você DEVE responder ÚNICA E EXCLUSIVAMENTE com um array JSON válido. Nenhuma palavra a mais, nenhum bloco de formatação Markdown (como ```json).
            
            FORMATO DE SAÍDA OBRIGATÓRIO:
            [
              {"dia": "SEGUNDA", "refeicao": "ALMOCO", "receitaId": 1},
              {"dia": "SEGUNDA", "refeicao": "JANTAR", "receitaId": 5},
              {"dia": "TERCA", "refeicao": "ALMOCO", "receitaId": 12}
            ]
            (Continue até DOMINGO, JANTAR)
            
            CATÁLOGO DISPONÍVEL:
            %s
            """,
            objetivo,
            dieta,
            catalogo
        );

        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }

    private String construirCatalogo(List<Receita> receitas) {
        StringBuilder sb = new StringBuilder();
        for (Receita r : receitas) {
            sb.append(String.format("- ID: %d | Nome: %s | %d kcal | Prot: %.1fg | Carbo: %.1fg | Gord: %.1fg\n",
                    r.getId(), r.getNome(), r.getKcal(), r.getProteina(), r.getCarboidrato(), r.getGordura()));
        }
        return sb.toString();
    }
}