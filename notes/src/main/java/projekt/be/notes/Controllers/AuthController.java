package projekt.be.notes.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import projekt.be.notes.auth.AuthenticationResponse;
import projekt.be.notes.auth.AuthenticationService;
import projekt.be.notes.auth.AuthenticatonRequest;
import projekt.be.notes.auth.RegisterRequest;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthenticationService service;

    @PostMapping(value = "/register")
    public ResponseEntity<AuthenticationResponse> register(RegisterRequest request){
        System.out.println(request);
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticatonRequest request){
        return ResponseEntity.ok(service.authenticate(request));
    }

}
