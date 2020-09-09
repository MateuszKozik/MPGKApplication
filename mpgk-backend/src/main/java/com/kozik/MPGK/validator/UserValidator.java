package com.kozik.MPGK.validator;

import com.kozik.MPGK.entities.User;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        User user = (User) object;

        if (user.getPassword().length() < 6) {
            errors.rejectValue("password", "Length", "Hasło musi składać się z minimum 6 znaków");
        }
        if (!user.getPassword().equals(user.getConfirmPassword())) {
            errors.rejectValue("confirmPassword", "Match", "Hasła muszą do siebie pasować");
        }
    }
}
