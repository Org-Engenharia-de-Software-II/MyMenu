package myMenu.backend.demo.controller;

import lombok.RequiredArgsConstructor;
import myMenu.backend.demo.dto.AdicionarItemListaDTO;
import myMenu.backend.demo.model.ListaDeCompras;
import myMenu.backend.demo.service.ListaComprasService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/listas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ListaComprasController {

    private final ListaComprasService listaComprasService;

    @PostMapping("/{listaId}/itens")
    public ResponseEntity<?> adicionarItem(
        @PathVariable Long listaId,
        @RequestBody AdicionarItemListaDTO dto
    ) {
        try {
            ListaDeCompras lista = listaComprasService.adicionarItemNaLista(
                listaId,
                dto.nomeIngrediente(),
                dto.quantidade(),
                dto.unidade(),
                dto.categoria()
            );
            return ResponseEntity.ok(lista);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{listaId}/itens/{itemId}/comprado")
    public ResponseEntity<?> marcarComoComprado(
        @PathVariable Long listaId,
        @PathVariable Long itemId
    ) {
        try {
            ListaDeCompras lista = listaComprasService.checkItemComprado(listaId, itemId);
            return ResponseEntity.ok(lista);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{listaId}")
    public ResponseEntity<?> buscarListaPorId(@PathVariable Long listaId) {
        try {
            ListaDeCompras lista = listaComprasService.buscarPorId(listaId);
            return ResponseEntity.ok(lista);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> buscarOuCriarListaPorUsuario(@PathVariable Long usuarioId) {
        try {
            ListaDeCompras lista = listaComprasService.buscarOuCriarListaPorUsuario(usuarioId);
            return ResponseEntity.ok(lista);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}