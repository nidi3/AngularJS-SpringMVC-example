package example.angularspring.web;

import example.angularspring.dto.Person;
import example.angularspring.dto.ResponseMessage;
import example.angularspring.dto.User;
import example.angularspring.service.PersonService;
import example.angularspring.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import java.util.List;

/**
 * Controller for user actions.
 */
@Controller
public class UserController {
    @Inject
    private UserService userService;

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    @ResponseBody
    public User getCurrentUser() {
        return userService.getCurrentUser();
    }

}
