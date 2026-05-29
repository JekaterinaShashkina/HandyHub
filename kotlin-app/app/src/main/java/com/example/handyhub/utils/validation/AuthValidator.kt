package com.example.handyhub.utils.validation

import android.util.Patterns

object AuthValidator {
    fun validateRegister(
        name: String,
        surname: String,
        phone: String,
        email: String,
        password: String,
        repeatPassword: String
    ): String? {

        if (
            name.isBlank() ||
            surname.isBlank() ||
            phone.isBlank() ||
            email.isBlank() ||
            password.isBlank()
        ) {
            return "Please fill all fields"
        }

        if (!Patterns.EMAIL_ADDRESS.matcher(email.trim()).matches()) {
            return "Invalid email"
        }

        if (phone.length < 7) {
            return "Invalid phone number"
        }

        if (password.length < 6) {
            return "Password must be at least 6 characters"
        }

        if (password != repeatPassword) {
            return "Passwords do not match"
        }

        return null
    }
}