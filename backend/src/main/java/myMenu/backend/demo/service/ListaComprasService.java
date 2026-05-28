package myMenu.backend.demo.service;

import lombok.RequiredArgsConstructor;
import myMenu.backend.demo.model.Ingrediente;
import myMenu.backend.demo.model.ItemListaCompras;
import myMenu.backend.demo.model.ListaDeCompras;
import myMenu.backend.demo.repository.IngredienteRepository;
import myMenu.backend.demo.repository.ListaDeComprasRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ListaComprasService {

    private final ListaDeComprasRepository listaRepository;
    private final IngredienteRepository ingredienteRepository;

    @Transactional
    public ListaDeCompras adicionarItemNaLista(Long usuarioId, Long listaId, String nomeIngrediente, double qtde, String unidade) {
        ListaDeCompras lista = listaRepository.findById(listaId)
                .orElseThrow(() -> new IllegalArgumentException("Lista não encontrada."));
                
        Ingrediente ingrediente = ingredienteRepository.findByNomeIgnoreCase(nomeIngrediente)
                .orElseGet(() -> ingredienteRepository.save(new Ingrediente(nomeIngrediente)));

        lista.adicionarItem(ingrediente, qtde, unidade);
        return listaRepository.save(lista);
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
}