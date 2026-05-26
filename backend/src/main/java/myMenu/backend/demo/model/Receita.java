package myMenu.backend.demo.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "receita")
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

    public Receita() {}

    public boolean verificarCompatibilidade(Geladeira geladeira, List<String> restricoes) {
        if (geladeira == null || geladeira.getItens() == null) return false;

        for (ItemReceita item : this.itens) {
            boolean encontrado = geladeira.getItens().stream()
                .anyMatch(ig -> ig.getIngrediente().getNome()
                    .equalsIgnoreCase(item.getIngrediente().getNome()));
            if (!encontrado) return false;
        }
        return true;
    }

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }
    public String getNome() { 
        return nome; 
    }
    public void setNome(String nome) { 
        this.nome = nome; 
    }
    public String getDescricao() { 
        return descricao; 
    }
    public void setDescricao(String descricao) { 
        this.descricao = descricao; 
    }
    public int getTempoPreparo() { 
        return tempoPreparo; 
    }
    public void setTempoPreparo(int tempoPreparo) { 
        this.tempoPreparo = tempoPreparo; 
    }
    public String getNivelDificuldade() { 
        return nivelDificuldade; 
    }
    public void setNivelDificuldade(String nivelDificuldade) { 
        this.nivelDificuldade = nivelDificuldade; 
    }
    public double getCustoEstimado() { 
        return custoEstimado; 
    }
    public void setCustoEstimado(double custoEstimado) { 
        this.custoEstimado = custoEstimado; 
    }
    public String getInstrucoes() { 
        return instrucoes; 
    }
    public void setInstrucoes(String instrucoes) { 
        this.instrucoes = instrucoes; 
    }
    public List<ItemReceita> getItens() { 
        return itens; 
    }
    public void setItens(List<ItemReceita> itens) { 
        this.itens = itens; 
    }
}