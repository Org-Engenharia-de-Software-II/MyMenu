package myMenu.backend.demo.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "receita")
@Getter
@Setter
@NoArgsConstructor
public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    private int tempoPreparo;
    private String nivelDificuldade;
    private double custoEstimado;

    @Column(columnDefinition = "TEXT")
    private String instrucoes;

    @OneToMany(mappedBy = "receita", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Fetch(FetchMode.JOIN)
    private List<ItemReceita> itens = new ArrayList<>();

    @Column(length = 500)
    private String imagemUrl;

    private int kcal;
    private double proteina;
    private double carboidrato;
    private double gordura;

    public boolean atendeRestricoesAlimentares(List<String> restricoes, List<String> ingredientesEvitados) {
        if (restricoes != null && !restricoes.isEmpty()) {
            for (String restricao : restricoes) {
                String restricaoLower = restricao.toLowerCase();
                
                if (restricaoLower.contains("vegano")) {
                    if (contemCarneOuPeixeOuOvoOuLaticinios()) {
                        return false;
                    }
                } else if (restricaoLower.contains("vegetariano")) {
                    if (contemCarneOuPeixe()) {
                        return false;
                    }
                }
            }
        }

        if (ingredientesEvitados != null && !ingredientesEvitados.isEmpty()) {
            for (ItemReceita item : this.itens) {
                boolean temEvitado = ingredientesEvitados.stream()
                    .anyMatch(evitado -> item.getIngrediente().getNome().equalsIgnoreCase(evitado));
                if (temEvitado) {
                    return false; 
                }
            }
        }

        return true;
    }

    private boolean contemCarneOuPeixeOuOvoOuLaticinios() {
        for (ItemReceita item : this.itens) {
            String ingrediente = item.getIngrediente().getNome();
            if (isCarneOuPeixe(ingrediente) || isOvoOuLaticinios(ingrediente)) {
                return true;
            }
        }
        
        if (this.descricao != null) {
            String descLower = this.descricao.toLowerCase();
            if (descLower.contains("ovo") || descLower.contains("leite") || descLower.contains("queijo") ||
                descLower.contains("iogurte") || descLower.contains("manteiga") || descLower.contains("creme") ||
                descLower.contains("frango") || descLower.contains("carne") || descLower.contains("peixe") ||
                descLower.contains("atum") || descLower.contains("tilápia") || descLower.contains("tilapi") ||
                descLower.contains("salmão") || descLower.contains("salmon") || descLower.contains("peru") ||
                descLower.contains("bacon") || descLower.contains("presunto") || descLower.contains("bacalhau") ||
                descLower.contains("galinha") || descLower.contains("caldo de")) {
                return true;
            }
        }
        
        if (this.instrucoes != null) {
            String instrLower = this.instrucoes.toLowerCase();
            if (instrLower.contains("ovo") || instrLower.contains("leite") || instrLower.contains("queijo") ||
                instrLower.contains("iogurte") || instrLower.contains("manteiga") || instrLower.contains("creme") ||
                instrLower.contains("frango") || instrLower.contains("carne") || instrLower.contains("peixe") ||
                instrLower.contains("atum") || instrLower.contains("tilápia") || instrLower.contains("tilapi") ||
                instrLower.contains("salmão") || instrLower.contains("salmon") || instrLower.contains("peru") ||
                instrLower.contains("bacon") || instrLower.contains("presunto") || instrLower.contains("bacalhau") ||
                instrLower.contains("galinha") || instrLower.contains("caldo de")) {
                return true;
            }
        }
        
        return false;
    }

    private boolean contemCarneOuPeixe() {
        for (ItemReceita item : this.itens) {
            String ingrediente = item.getIngrediente().getNome();
            if (isCarneOuPeixe(ingrediente)) {
                return true;
            }
        }
        
        if (this.descricao != null) {
            String descLower = this.descricao.toLowerCase();
            if (descLower.contains("frango") || descLower.contains("carne") || descLower.contains("peixe") ||
                descLower.contains("atum") || descLower.contains("tilápia") || descLower.contains("tilapi") ||
                descLower.contains("salmão") || descLower.contains("salmon") || descLower.contains("peru") ||
                descLower.contains("bacon") || descLower.contains("presunto") || descLower.contains("bacalhau") ||
                descLower.contains("galinha") || descLower.contains("caldo de") || descLower.contains("patinho") ||
                descLower.contains("bife") || descLower.contains("bolonhesa")) {
                return true;
            }
        }
        
        if (this.instrucoes != null) {
            String instrLower = this.instrucoes.toLowerCase();
            if (instrLower.contains("frango") || instrLower.contains("carne") || instrLower.contains("peixe") ||
                instrLower.contains("atum") || instrLower.contains("tilápia") || instrLower.contains("tilapi") ||
                instrLower.contains("salmão") || instrLower.contains("salmon") || instrLower.contains("peru") ||
                instrLower.contains("bacon") || instrLower.contains("presunto") || instrLower.contains("bacalhau") ||
                instrLower.contains("galinha") || instrLower.contains("caldo de") || instrLower.contains("patinho") ||
                instrLower.contains("bife") || instrLower.contains("bolonhesa") || instrLower.contains("moído")) {
                return true;
            }
        }
        
        return false;
    }

    private boolean isCarneOuPeixe(String ingrediente) {
        String lower = ingrediente.toLowerCase();
        return lower.contains("carne") || lower.contains("frango") || lower.contains("peixe") ||
               lower.contains("pesca") || lower.contains("camarão") || lower.contains("camarao") ||
               lower.contains("polvo") || lower.contains("lula") || lower.contains("marisco") ||
               lower.contains("presunto") || lower.contains("bacon") || lower.contains("linguiça") ||
               lower.contains("embutido") || lower.contains("caldo de carne") || lower.contains("peru") ||
               lower.contains("cordeiro") || lower.contains("vaca") || lower.contains("boi") ||
               lower.contains("vitela") || lower.contains("costela") || lower.contains("file") ||
               lower.contains("caldo de galinha") || lower.contains("caldo de peixe");
    }

    private boolean isOvoOuLaticinios(String ingrediente) {
        String lower = ingrediente.toLowerCase();
        return lower.contains("ovo") || lower.contains("leite") || lower.contains("queijo") ||
               lower.contains("iogurte") || lower.contains("iogurt") || lower.contains("butter") ||
               lower.contains("manteiga") || lower.contains("creme") || lower.contains("nata") ||
               lower.contains("requeijão") || lower.contains("requeijao") || lower.contains("coalhada") ||
               lower.contains("lácteo") || lower.contains("lacteo");
    }

    public boolean possuiTodosIngredientes(Geladeira geladeira) {
        if (geladeira == null || geladeira.getItens() == null || geladeira.getItens().isEmpty()) {
            return false;
        }

        for (ItemReceita item : this.itens) {
            boolean encontrado = geladeira.getItens().stream()
                .anyMatch(ig -> ig.getIngrediente().getNome()
                    .equalsIgnoreCase(item.getIngrediente().getNome()));
            if (!encontrado) {
                return false;
            }
        }
        return true; 
    }
}