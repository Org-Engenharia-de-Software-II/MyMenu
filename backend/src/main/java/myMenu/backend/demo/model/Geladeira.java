package myMenu.backend.demo.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "geladeira")
public class Geladeira {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "geladeira", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemGeladeira> itens = new ArrayList<>();

    public Geladeira() {}

    public void adicionarIngrediente(Ingrediente ingrediente, String quantidade) {
        ItemGeladeira item = new ItemGeladeira(quantidade, this, ingrediente);
        this.itens.add(item);
    }

    public void removerIngrediente(Ingrediente ingrediente) {
        this.itens.removeIf(i -> i.getIngrediente().getNome().equalsIgnoreCase(ingrediente.getNome()));
    }

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }
    public List<ItemGeladeira> getItens() { 
        return itens; 
    }
    public void setItens(List<ItemGeladeira> itens) { 
        this.itens = itens; 
    }
}