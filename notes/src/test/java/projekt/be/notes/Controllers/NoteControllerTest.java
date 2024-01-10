package projekt.be.notes.Controllers;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import projekt.be.notes.classes.AppUser;
import projekt.be.notes.classes.Note;
import projekt.be.notes.jwt.JwtService;
import projekt.be.notes.repos.AppUserRepo;
import projekt.be.notes.repos.NoteRepo;

import java.time.OffsetDateTime;
import java.util.Optional;

class NoteControllerTest {

    private final NoteRepo noteRepo = Mockito.mock(NoteRepo.class);
    private final AppUserRepo appUserRepo = Mockito.mock(AppUserRepo.class);

    private final JwtService jwtService = Mockito.mock(JwtService.class);
    NoteController noteController = new NoteController(noteRepo, appUserRepo, jwtService);

    @Test
    void shouldGetNote() {
        Note note = new Note(1L, "Title", "content", OffsetDateTime.now(), false, new AppUser());
        Mockito.when(noteRepo.findById(Mockito.anyLong())).thenReturn(Optional.of(note));

        Note noteFromDB = noteController.getNoteById(1L);

        Assertions.assertEquals(noteFromDB.getId(), note.getId());
        Assertions.assertEquals(noteFromDB.getTitle(), note.getTitle());
        Assertions.assertEquals(noteFromDB.getContent(), note.getContent());
        Assertions.assertEquals(noteFromDB.getCreationDate(), note.getCreationDate());
    }

    @Test
    void shouldAddNote() {
        Note note = new Note(1L, "Title", "content", OffsetDateTime.now(), false, new AppUser());
        Mockito.when(jwtService.extractUsername(Mockito.anyString())).thenReturn("email");
        Mockito.when(appUserRepo.findByEmail(Mockito.anyString())).thenReturn(Optional.of(new AppUser()));

        noteController.addNewNote("tokenLongerThanSeven", note);

        Mockito.verify(noteRepo, Mockito.times(1)).save(Mockito.any());
    }

    @Test
    void shouldDeleteNote() {
        noteController.deleteNote(1L);

        Mockito.verify(noteRepo, Mockito.times(1)).deleteById(1L);
    }

}