package myMenu.backend.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "item_receita")
public class ItemReceita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String quantidade;

    @ManyToOne
    @JoinColumn(name = "receita_id", nullable = false)
    private Receita receita;

    @ManyToOne
    @JoinColumn(name = "ingrediente_id", nullable = false)
    private Ingrediente ingrediente;

    public ItemReceita() {}

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

    public Receita getReceita() { 
        return receita; 
    }

    public void setReceita(Receita receita) { 
        this.receita = receita; 
    }

    public Ingrediente getIngrediente() { 
        return ingrediente; 
    }

    public void setIngrediente(Ingrediente ingrediente) { 
        this.ingrediente = ingrediente; 
    }
}