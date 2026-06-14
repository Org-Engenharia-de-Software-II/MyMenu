package myMenu.backend.demo.service;

import lombok.RequiredArgsConstructor;
import myMenu.backend.demo.model.Geladeira;
import myMenu.backend.demo.model.Ingrediente;
import myMenu.backend.demo.model.Usuario;
import myMenu.backend.demo.repository.IngredienteRepository;
import myMenu.backend.demo.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class GeladeiraService {

    private final UsuarioRepository usuarioRepository;
    private final IngredienteRepository ingredienteRepository;

    @Transactional
    public Geladeira adicionarItem(Long usuarioId, String nomeIngrediente, double quantidade, String unidade, String categoria, LocalDate dataValidade) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        
        Geladeira geladeira = usuario.getGeladeira();

        Ingrediente ingrediente = ingredienteRepository.findByNomeIgnoreCase(nomeIngrediente)
                .orElseGet(() -> ingredienteRepository.save(new Ingrediente(nomeIngrediente)));

        geladeira.adicionarIngrediente(ingrediente, quantidade, unidade, categoria, dataValidade);

        usuarioRepository.save(usuario);
        return geladeira;
    }
    
    @Transactional
    public Geladeira removerItem(Long usuarioId, String nomeIngrediente) {
         Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
                
         Ingrediente ingrediente = ingredienteRepository.findByNomeIgnoreCase(nomeIngrediente)
                .orElseThrow(() -> new IllegalArgumentException("Ingrediente não encontrado."));
                
         usuario.getGeladeira().removerIngrediente(ingrediente);
         usuarioRepository.save(usuario);
         
         return usuario.getGeladeira();
    }
    
}