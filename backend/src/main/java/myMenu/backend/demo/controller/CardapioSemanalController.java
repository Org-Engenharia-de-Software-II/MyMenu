package myMenu.backend.demo.controller;

import lombok.RequiredArgsConstructor;
import myMenu.backend.demo.model.CardapioSemanal;
import myMenu.backend.demo.service.CardapioSemanalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/usuarios/{usuarioId}/cardapio")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CardapioSemanalController {

    private final CardapioSemanalService cardapioSemanalService;

    @GetMapping
    public ResponseEntity<?> listarCardapios(@PathVariable Long usuarioId) {
        try {
            List<CardapioSemanal> cardapios = cardapioSemanalService.listarCardapiosPorUsuario(usuarioId);
            return ResponseEntity.ok(cardapios);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{cardapioId}")
    public ResponseEntity<?> obterCardapio(@PathVariable Long usuarioId, @PathVariable Long cardapioId) {
        try {
            CardapioSemanal cardapio = cardapioSemanalService.obterCardapio(usuarioId, cardapioId);
            return ResponseEntity.ok(cardapio);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{cardapioId}")
    public ResponseEntity<?> deletarCardapio(@PathVariable Long usuarioId, @PathVariable Long cardapioId) {
        try {
            cardapioSemanalService.deletarCardapio(usuarioId, cardapioId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/gerar")
    public ResponseEntity<?> gerarCardapio(@PathVariable Long usuarioId) {
        try {
            CardapioSemanal cardapio = cardapioSemanalService.gerarCardapio(usuarioId);
            return ResponseEntity.ok(cardapio);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}