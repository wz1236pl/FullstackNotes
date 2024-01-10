package projekt.be.notes.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import projekt.be.notes.auth.AuthenticationService;
import projekt.be.notes.auth.AuthenticatonRequest;
import projekt.be.notes.auth.RegisterRequest;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerIT {

    @MockBean
    AuthenticationService service;

    @Autowired
    MockMvc mockMvc;

    ObjectWriter objectWriter = new ObjectMapper().writer();

    @Test
    void shouldTestRegisterEndpoint() throws Exception {
        RegisterRequest request = new RegisterRequest("aaa", "aaa");
        mockMvc.perform(
                MockMvcRequestBuilders.post("/auth/register").content(request.toString())
        ).andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void shouldTestAuthenticateEndpoint() throws Exception {
        AuthenticatonRequest request = new AuthenticatonRequest("aaa", "aaa");
        mockMvc.perform(
                MockMvcRequestBuilders.post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectWriter.writeValueAsString(request))
        ).andExpect(MockMvcResultMatchers.status().isOk());
    }

}