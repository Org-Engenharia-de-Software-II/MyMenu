package myMenu.backend.demo.service;

import lombok.RequiredArgsConstructor;
import myMenu.backend.demo.model.Ingrediente;
import myMenu.backend.demo.model.ItemListaCompras;
import myMenu.backend.demo.model.ListaDeCompras;
import myMenu.backend.demo.model.Usuario;
import myMenu.backend.demo.repository.IngredienteRepository;
import myMenu.backend.demo.repository.ListaDeComprasRepository;
import myMenu.backend.demo.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ListaComprasService {

    private final ListaDeComprasRepository listaRepository;
    private final IngredienteRepository ingredienteRepository;
    private final UsuarioRepository usuarioRepository;

    @Transactional
    public ListaDeCompras adicionarItemNaLista(Long listaId, String nomeIngrediente, double qtde, String unidade, String categoria) {
        ListaDeCompras lista = listaRepository.findById(listaId)
                .orElseThrow(() -> new IllegalArgumentException("Lista não encontrada."));
                
        Ingrediente ingrediente = ingredienteRepository.findByNomeIgnoreCase(nomeIngrediente)
                .orElseGet(() -> ingredienteRepository.save(new Ingrediente(nomeIngrediente)));

        lista.adicionarItem(ingrediente, qtde, unidade, categoria);
        return listaRepository.save(lista);
    }

    public ListaDeCompras buscarPorId(Long listaId) {
        return listaRepository.findById(listaId)
                .orElseThrow(() -> new IllegalArgumentException("Lista não encontrada."));
    }

    @Transactional
    public ListaDeCompras checkItemComprado(Long listaId, Long itemId) {
        ListaDeCompras lista = listaRepository.findById(listaId)
                .orElseThrow(() -> new IllegalArgumentException("Lista não encontrada."));
                
        ItemListaCompras item = lista.getItens().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Item não encontrado na lista."));
                
        lista.marcarComoComprado(item);
        return listaRepository.save(lista);
    }

    @Transactional
    public ListaDeCompras buscarOuCriarListaPorUsuario(Long usuarioId) {
        return listaRepository.findFirstByUsuarioId(usuarioId)
                .orElseGet(() -> {
                    Usuario usuario = usuarioRepository.findById(usuarioId)
                            .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
                    ListaDeCompras lista = new ListaDeCompras();
                    lista.setUsuario(usuario);
                    return listaRepository.save(lista);
                });
    }
}
