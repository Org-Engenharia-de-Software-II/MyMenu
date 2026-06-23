package myMenu.backend.demo.service;

import lombok.RequiredArgsConstructor;
import myMenu.backend.demo.model.Geladeira;
import myMenu.backend.demo.model.ItemGeladeira;
import myMenu.backend.demo.model.ItemReceita;
import myMenu.backend.demo.model.Receita;
import myMenu.backend.demo.model.Usuario;
import myMenu.backend.demo.repository.ReceitaRepository;
import myMenu.backend.demo.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReceitaService {

    private final ReceitaRepository receitaRepository;
    private final UsuarioRepository usuarioRepository;

    public List<Receita> buscarPorNome(String nome) {
        return receitaRepository.findByNomeContainingIgnoreCase(nome);
    }

    public List<Receita> buscarReceitasComIngredientesDaGeladeira(Long usuarioId) {   
        Usuario usuario = buscarUsuarioOuFalhar(usuarioId);
        
        return receitaRepository.findAll().stream()
                .filter(receita -> receita.atendeRestricoesAlimentares(usuario.getRestricoes(), usuario.getIngredientesEvitados()))
                .filter(receita -> receita.possuiTodosIngredientes(usuario.getGeladeira()))
                .collect(Collectors.toList());
    }

    public List<Receita> buscarPriorizandoGeladeira(Long usuarioId) {     
        Usuario usuario = buscarUsuarioOuFalhar(usuarioId);
        List<Receita> todasReceitas = receitaRepository.findAll().stream()
                .filter(receita -> receita.atendeRestricoesAlimentares(usuario.getRestricoes(), usuario.getIngredientesEvitados()))
                .collect(Collectors.toList());
        ordenarPorMatchGeladeira(todasReceitas, usuario.getGeladeira());
        
        return todasReceitas;
    }

    public List<Receita> buscarCandidatasParaCardapio(Usuario usuario) {
        List<Receita> todas = receitaRepository.findAll();
        System.out.println(todas.stream()
                .filter(r -> r.atendeRestricoesAlimentares(usuario.getRestricoes(), usuario.getIngredientesEvitados())));
        return todas.stream()
                .filter(r -> r.atendeRestricoesAlimentares(usuario.getRestricoes(), usuario.getIngredientesEvitados()))
                // .sorted((r1, r2) -> Long.compare(
                //     calcularMatchDeIngredientes(r2, usuario.getGeladeira()), 
                //     calcularMatchDeIngredientes(r1, usuario.getGeladeira())
                // ))
                
                .limit(40)
                .collect(Collectors.toList());
    }

    public List<Receita> buscarReceitasRicasEmProteina(double minimoProteina) {
        return receitaRepository.findByProteinaGreaterThanEqualOrderByProteinaDesc(minimoProteina);
    }

    public List<Receita> buscarReceitasBaixaCaloria(int maximoCalorias) {   
        return receitaRepository.findByKcalLessThanEqualOrderByKcalAsc(maximoCalorias);
    }

    public List<Receita> buscarReceitasLowCarb(double maximoCarboidrato) {
        return receitaRepository.findByCarboidratoLessThanEqualOrderByCarboidratoAsc(maximoCarboidrato);
    }

    private Usuario buscarUsuarioOuFalhar(Long usuarioId) {
        return usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
    }

    private List<Receita> filtrarReceitasIncompativeis(List<Receita> receitas, Usuario usuario) {
        return receitas.stream()
                .filter(receita -> receita.atendeRestricoesAlimentares(usuario.getRestricoes(), usuario.getIngredientesEvitados()))
                .collect(Collectors.toList());
    }

    private void ordenarPorMatchGeladeira(List<Receita> receitas, Geladeira geladeira) {
        receitas.sort((r1, r2) -> {
            long matchR1 = calcularMatchDeIngredientes(r1, geladeira);
            long matchR2 = calcularMatchDeIngredientes(r2, geladeira);
            return Long.compare(matchR2, matchR1);
        });
    }

    private long calcularMatchDeIngredientes(Receita receita, Geladeira geladeira) {
        if (geladeira == null || geladeira.getItens().isEmpty()) return 0;
        return receita.getItens().stream()
                .filter(itemReceita -> aGeladeiraPossui(geladeira, itemReceita))
                .count();
    }

    private boolean aGeladeiraPossui(Geladeira geladeira, ItemReceita itemReceita) {
        return geladeira.getItens().stream()
                .anyMatch(itemGel -> itemGel.getIngrediente().getNome()
                        .equalsIgnoreCase(itemReceita.getIngrediente().getNome()));
    }
}