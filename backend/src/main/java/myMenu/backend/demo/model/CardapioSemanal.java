package myMenu.backend.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cardapio_semanal")
public class CardapioSemanal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate dataInicio;

    @Column(nullable = false)
    private LocalDate dataFim;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToMany
    @JoinTable(
        name = "cardapio_receitas",
        joinColumns = @JoinColumn(name = "cardapio_id"),
        inverseJoinColumns = @JoinColumn(name = "receita_id")
    )
    private List<Receita> receitas = new ArrayList<>();

    public CardapioSemanal() {
        this.dataInicio = LocalDate.now();
        this.dataFim = LocalDate.now().plusDays(7);
    }

    public void adicionarReceita(Receita receita, String dia, String refeicao) {
        this.receitas.add(receita);
    }

    public void removerReceita(Receita receita) {
        this.receitas.remove(receita);
    }

    public Long getId() { 
        return id; 
    }
    
    public void setId(Long id) { 
        this.id = id; 
    }
    
    public LocalDate getDataInicio() { 
        return dataInicio; 
    }
    
    public void setDataInicio(LocalDate dataInicio) { 
        this.dataInicio = dataInicio; 
    }
    
    public LocalDate getDataFim() { 
        return dataFim; 
    }
    
    public void setDataFim(LocalDate dataFim) { 
        this.dataFim = dataFim; 
    }
    
    public Usuario getUsuario() { 
        return usuario; 
    }
    
    public void setUsuario(Usuario usuario) { 
        this.usuario = usuario; 
    }
    
    public List<Receita> getReceitas() { 
        return receitas; 
    }
    
    public void setReceitas(List<Receita> receitas) { 
        this.receitas = receitas; 
    }
}