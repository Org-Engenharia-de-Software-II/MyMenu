package myMenu.backend.demo.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @ElementCollection
    @CollectionTable(
        name = "preferencia_alimentar", 
        joinColumns = @JoinColumn(name = "usuario_id")
    )
    @Column(name = "preferencia")
    private List<String> preferenciasAlimentares = new ArrayList<>();

    @ElementCollection
    @CollectionTable(
        name = "restricao_alimentar", 
        joinColumns = @JoinColumn(name = "usuario_id")
    )
    @Column(name = "restricao")
    private List<String> restricoes = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "usuario_receita_favorita",
        joinColumns = @JoinColumn(name = "usuario_id"),
        inverseJoinColumns = @JoinColumn(name = "receita_id")
    )
    private List<Receita> favoritas = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "geladeira_id")
    private Geladeira geladeira;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<CardapioSemanal> cardapios = new ArrayList<>();

    public Usuario() {
    }

    public Usuario(String nome, String email) {
        this.nome = nome;
        this.email = email;
        this.geladeira = new Geladeira();
    }

    public void editarPerfil(String novoNome, String novoEmail) {
        if (novoNome != null && !novoNome.isBlank()) {
            this.nome = novoNome;
        }
        
        if (novoEmail != null && !novoEmail.isBlank()) {
            this.email = novoEmail;
        }
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

    public String getEmail() { 
        return email; 
    }

    public void setEmail(String email) { 
        this.email = email; 
    }

    public List<String> getPreferenciasAlimentares() { 
        return preferenciasAlimentares; 
    }

    public void setPreferenciasAlimentares(List<String> p) { 
        this.preferenciasAlimentares = p; 
    }

    public List<String> getRestricoes() { 
        return restricoes; 
    }

    public void setRestricoes(List<String> restricoes) { 
        this.restricoes = restricoes; 
    }

    public List<Receita> getFavoritas() { 
        return favoritas; 
    }

    public void setFavoritas(List<Receita> favoritas) { 
        this.favoritas = favoritas; 
    }

    public Geladeira getGeladeira() { 
        return geladeira; 
    }

    public void setGeladeira(Geladeira geladeira) { 
        this.geladeira = geladeira; 
    }

    public List<CardapioSemanal> getCardapios() { 
        return cardapios; 
    }

    public void setCardapios(List<CardapioSemanal> cardapios) { 
        this.cardapios = cardapios; 
    }
}