package myMenu.backend.demo.model;

import jakarta.persistence.*;
import lombok.*;
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

    @OneToMany(mappedBy = "receita", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemReceita> itens = new ArrayList<>();

    @Column(length = 500)
    private String imagemUrl;

    private int kcal;
    private double proteina;
    private double carboidrato;
    private double gordura;

    public boolean atendeRestricoesAlimentares(List<String> restricoes, List<String> ingredientesEvitados) {
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