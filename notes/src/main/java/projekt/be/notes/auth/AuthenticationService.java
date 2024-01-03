package projekt.be.notes.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import projekt.be.notes.classes.AppUser;
import projekt.be.notes.jwt.JwtService;
import projekt.be.notes.repos.AppUserRepo;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AppUserRepo appUserRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    public AuthenticationResponse register(RegisterRequest request) {
        if(appUserRepo.findByEmail(request.getEmail()).isPresent()){
             return AuthenticationResponse.builder().token(null).build();
        }
        var appUser = AppUser.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
            appUserRepo.save(appUser);
            var jwtToken = jwtService.generateToken(appUser);
            return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticatonRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        AppUser appUser = appUserRepo.findByEmail(request.getEmail()).orElseThrow();
        if (!passwordEncoder.matches(request.getPassword(), appUser.getPassword())){
            return null;
        }
        var jwtToken = jwtService.generateToken((UserDetails) appUser);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
    
}
