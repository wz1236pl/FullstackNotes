package projekt.be.notes.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import projekt.be.notes.classes.Note;

import java.util.List;

public interface NoteRepo extends JpaRepository<Note, Long> {
    List<Note> findAll();
    List<Note> findAllByAppUserEmailAndArchivedIsTrue(String email);
    List<Note> findAllByAppUserEmailAndArchivedIsFalse(String email);
}
