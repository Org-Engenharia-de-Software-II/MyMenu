package myMenu.backend.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "item_geladeira")
public class ItemGeladeira {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String quantidade;

    @Column
    private LocalDate dataValidade;

    @ManyToOne
    @JoinColumn(name = "geladeira_id", nullable = false)
    private Geladeira geladeira;

    @ManyToOne
    @JoinColumn(name = "ingrediente_id", nullable = false)
    private Ingrediente ingrediente;

    public ItemGeladeira() {
    }

    public ItemGeladeira(String quantidade, Geladeira geladeira, Ingrediente ingrediente) {
        this.quantidade = quantidade;
        this.geladeira = geladeira;
        this.ingrediente = ingrediente;
    }

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }
    public String getQuantidade() { 
        return quantidade; 
    }

    public void setQuantidade(String quantidade) { 
        this.quantidade = quantidade; 
    }

    public LocalDate getDataValidade() { 
        return dataValidade; 
    }

    public void setDataValidade(LocalDate dataValidade) { 
        this.dataValidade = dataValidade; 
    }

    public Geladeira getGeladeira() { 
        return geladeira; 
    }

    public void setGeladeira(Geladeira geladeira) { 
        this.geladeira = geladeira; 
    }

    public Ingrediente getIngrediente() { 
        return ingrediente; 
    }

    public void setIngrediente(Ingrediente ingrediente) { 
        this.ingrediente = ingrediente; 
    }
}