package projekt.be.notes.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import projekt.be.notes.classes.AppUser;

import java.util.Optional;

public interface AppUserRepo extends JpaRepository<AppUser, Long>  {

    Optional<AppUser> findByEmail(String email);
}
