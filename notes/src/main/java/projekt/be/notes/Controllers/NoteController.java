package projekt.be.notes.Controllers;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projekt.be.notes.classes.Note;
import projekt.be.notes.jwt.JwtService;
import projekt.be.notes.repos.AppUserRepo;
import projekt.be.notes.repos.NoteRepo;

import java.time.OffsetDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
public class NoteController {
    @Autowired
    NoteRepo noteRepo;
    @Autowired
    AppUserRepo appUserRepo;
    @Autowired
    JwtService jwtService;


    @Operation(summary = "Pobierz notatki użytkownika", description = "Pobiera wszystkie notatki naszego użytkownika")
    @GetMapping("/get/notes")
    public List<Note> getNotesByToken(@RequestHeader("Authorization") String token) {
        final String email = jwtService.extractUsername(token.substring(7));
        return noteRepo.findAllByAppUserEmailAndArchivedIsFalse(email)
                .stream().sorted(Comparator.comparing(Note::getCreationDate)).collect(Collectors.toList());
    }

    @Operation(summary = "Pobierz notatkę po id", description = "Pobiera wybraną notatkę po id")
    @GetMapping("/get/note{id}")
    public Note getNoteById(@RequestParam Long id) {
        return noteRepo.findById(id).get();
    }

    @Operation(summary = "Pobierz archiwalne notatki użytkownika", description = "Pobiera wszystkie notatki naszego użytkownika z archiwum")
    @GetMapping("/get/notes/archive")
    public List<Note> getArchivedNotesByToken(@RequestHeader("Authorization") String token) {
        final String email = jwtService.extractUsername(token.substring(7));
        return noteRepo.findAllByAppUserEmailAndArchivedIsTrue(email)
                .stream().sorted(Comparator.comparing(Note::getCreationDate)).collect(Collectors.toList());
    }

    @Operation(summary = "Dodaj nową notatke", description = "Dodaje nową notatkę do notatnika")
    @PostMapping("/create/note")
    public ResponseEntity<Note> addNewNote(@RequestHeader("Authorization") String token, Note newNote) {
        final String email = jwtService.extractUsername(token.substring(7));
        newNote.setAppUser(appUserRepo.findByEmail(email).get());
        newNote.setArchived(false);
        newNote.setCreationDate(OffsetDateTime.now());
        noteRepo.save(newNote);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Aktualizuje notatke", description = "Edytuje istniejącą notatkę")
    @PutMapping("/update/note")
    public ResponseEntity<Note> updateNote(Note newNote) {
        Note oldNote = noteRepo.findById(newNote.getId()).get();
        oldNote.setContent(newNote.getContent());
        oldNote.setTitle(newNote.getTitle());
        noteRepo.save(oldNote);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Przenieś notatke do archiwum", description = "Przenosi notatke do archiwum, nie usuwa")
    @PutMapping("/archive/note{id}")
    public ResponseEntity<Note> archiveNote(@RequestParam Long id) {
        Note note = noteRepo.findById(id).get();
        note.setArchived(true);
        noteRepo.save(note);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Przenieś notatke z archiwum", description = "Przenosi notatke z archiwum do panelu głównego")
    @PutMapping("/dearchive/note{id}")
    public ResponseEntity<Note> dearchiveNote(@RequestParam Long id) {
        Note note = noteRepo.findById(id).get();
        note.setArchived(false);
        noteRepo.save(note);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Usuwa notatke", description = "Na stałe usuwa notatke z archiwum")
    @DeleteMapping("/delete/note{id}")
    public ResponseEntity<Note> deleteNote(@RequestParam Long id) {
        noteRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
