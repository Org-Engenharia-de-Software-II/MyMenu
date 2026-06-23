package myMenu.backend.demo.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import myMenu.backend.demo.model.*;
import myMenu.backend.demo.repository.CardapioSemanalRepository;
import myMenu.backend.demo.repository.ItemCardapioRepository;
import myMenu.backend.demo.repository.ReceitaRepository;
import myMenu.backend.demo.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CardapioSemanalService {

    private final ReceitaService receitaService;
    private final CardapioAIService aiService;
    private final ReceitaRepository receitaRepository;
    private final CardapioSemanalRepository cardapioRepository;
    private final ItemCardapioRepository itemCardapioRepository;
    private final UsuarioRepository usuarioRepository;
    
    private final ObjectMapper objectMapper; 

    public List<CardapioSemanal> listarCardapiosPorUsuario(Long usuarioId) {
        usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        return cardapioRepository.findByUsuarioId(usuarioId);
    }

    public CardapioSemanal obterCardapio(Long usuarioId, Long cardapioId) {
        usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        
        CardapioSemanal cardapio = cardapioRepository.findById(cardapioId)
                .orElseThrow(() -> new IllegalArgumentException("Cardápio não encontrado."));
        
        if (!cardapio.getUsuario().getId().equals(usuarioId)) {
            throw new IllegalArgumentException("Cardápio não pertence a este usuário.");
        }
        
        return cardapio;
    }

    public void deletarCardapio(Long usuarioId, Long cardapioId) {
        usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        
        CardapioSemanal cardapio = cardapioRepository.findById(cardapioId)
                .orElseThrow(() -> new IllegalArgumentException("Cardápio não encontrado."));
        
        if (!cardapio.getUsuario().getId().equals(usuarioId)) {
            throw new IllegalArgumentException("Cardápio não pertence a este usuário.");
        }
        
        cardapioRepository.deleteById(cardapioId);
    }

    @Transactional
    public CardapioSemanal adicionarItemAoCardapio(Long usuarioId, Long receitaId, String diaDaSemana, String tipoRefeicao) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        Receita receita = receitaRepository.findById(receitaId)
                .orElseThrow(() -> new IllegalArgumentException("Receita não encontrada."));

        CardapioSemanal cardapio = cardapioRepository.findTopByUsuarioIdOrderByDataInicioDesc(usuarioId);
        if (cardapio == null) {
            cardapio = new CardapioSemanal();
            cardapio.setUsuario(usuario);
            cardapio.setDataInicio(LocalDate.now());
            cardapio.setDataFim(LocalDate.now().plusDays(7));
            cardapio = cardapioRepository.save(cardapio);
        }

        String diaFinal = (diaDaSemana == null || diaDaSemana.isBlank()) ? getDiaAtualAbreviado() : diaDaSemana.trim();
        String refeicaoFinal = (tipoRefeicao == null || tipoRefeicao.isBlank()) ? "Almoço" : tipoRefeicao.trim();

        ItemCardapio itemAdicionado = new ItemCardapio(cardapio, receita, diaFinal, refeicaoFinal);
        itemAdicionado.setIngredientesFaltantes(calcularFaltantes(receita, usuario.getGeladeira()));
        itemCardapioRepository.save(itemAdicionado);

        return cardapioRepository.findById(cardapio.getId())
                .orElseThrow(() -> new IllegalArgumentException("Cardápio não encontrado."));
    }

    @Transactional
    public void removerItemDoCardapio(Long usuarioId, Long cardapioId, Long itemCardapioId) {
        usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        CardapioSemanal cardapio = cardapioRepository.findById(cardapioId)
                .orElseThrow(() -> new IllegalArgumentException("Cardápio não encontrado."));

        if (!cardapio.getUsuario().getId().equals(usuarioId)) {
            throw new IllegalArgumentException("Cardápio não pertence a este usuário.");
        }

        ItemCardapio item = cardapio.getItensCardapio().stream()
                .filter(current -> current.getId() != null && current.getId().equals(itemCardapioId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Item do cardápio não encontrado."));

        cardapio.removerItemPorId(item.getId());
        cardapioRepository.save(cardapio);
    }

    @Transactional
    public CardapioSemanal gerarCardapio(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        List<Receita> candidatas = receitaService.buscarCandidatasParaCardapio(usuario);
        
        if (candidatas.size() < 14) {
            throw new IllegalStateException("Receitas insuficientes para as suas restrições e perfil.");
        }

        String respostaIA = aiService.gerarSugestaoSemanal(usuario, candidatas);
        
        CardapioSemanal cardapio = new CardapioSemanal();
        cardapio.setUsuario(usuario);
        cardapio = cardapioRepository.save(cardapio);
        
        List<Map<String, Object>> escolhas = converterJsonParaLista(respostaIA);

        System.out.println("ESCOLHAS: " + escolhas);

        for (Map<String, Object> escolha : escolhas) {
            Long receitaId = Long.valueOf(escolha.get("receitaId").toString());
            String dia = escolha.get("dia").toString();
            String refeicao = escolha.get("refeicao").toString();

            Receita receita = receitaRepository.findById(receitaId)
                    .orElseThrow(() -> new IllegalArgumentException("Receita retornada pela IA não existe."));
            
            ItemCardapio itemAdicionado = new ItemCardapio(cardapio, receita, dia, refeicao);
            itemAdicionado.setIngredientesFaltantes(calcularFaltantes(receita, usuario.getGeladeira()));
            itemCardapioRepository.save(itemAdicionado);
        }

        return cardapioRepository.findById(cardapio.getId())
                .orElseThrow(() -> new IllegalArgumentException("Cardápio não encontrado."));
    }

    private List<String> calcularFaltantes(Receita receita, Geladeira geladeira) {
        if (geladeira == null || geladeira.getItens() == null || geladeira.getItens().isEmpty()) {
            return receita.getItens().stream()
                    .map(i -> i.getIngrediente().getNome())
                    .collect(Collectors.toList());
        }

        List<String> nomesNaGeladeira = geladeira.getItens().stream()
                .map(i -> i.getIngrediente().getNome().toLowerCase())
                .collect(Collectors.toList());

        return receita.getItens().stream()
                .map(i -> i.getIngrediente().getNome())
                .filter(nomeReq -> !nomesNaGeladeira.contains(nomeReq.toLowerCase()))
                .collect(Collectors.toList());
    }

    private String getDiaAtualAbreviado() {
        return switch (LocalDate.now().getDayOfWeek()) {
            case MONDAY -> "SEG";
            case TUESDAY -> "TER";
            case WEDNESDAY -> "QUA";
            case THURSDAY -> "QUI";
            case FRIDAY -> "SEX";
            case SATURDAY -> "SAB";
            case SUNDAY -> "DOM";
        };
    }

    private List<Map<String, Object>> converterJsonParaLista(String json) {
        try {
            String cleanJson = json.replaceAll("```json", "").replaceAll("```", "").trim();
            
            int startIdx = cleanJson.indexOf('[');
            int endIdx = cleanJson.lastIndexOf(']');
            
            if (startIdx == -1 || endIdx == -1 || endIdx < startIdx) {
                throw new RuntimeException("Nenhum array JSON encontrado na resposta da IA. Resposta recebida: " + cleanJson);
            }
            
            cleanJson = cleanJson.substring(startIdx, endIdx + 1);
            
            return objectMapper.readValue(cleanJson, new TypeReference<List<Map<String, Object>>>() {});
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Falha ao processar o JSON retornado pela IA: " + e.getMessage());
        }
    }
}