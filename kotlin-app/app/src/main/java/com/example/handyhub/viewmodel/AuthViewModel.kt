package com.example.handyhub.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.handyhub.data.repository.HandyHubRepository
import com.example.handyhub.model.User
import com.example.handyhub.utils.security.PasswordHasher
import com.example.handyhub.utils.validation.AuthValidator
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class AuthViewModel(
    private val repository: HandyHubRepository
) : ViewModel() {
    private val _currentUser = MutableStateFlow<User?>(null)
    val currentUser = _currentUser.asStateFlow()

    fun login(
        email: String,
        password: String,
        onSuccess: () -> Unit,
        onError: () -> Unit
    ) {
        viewModelScope.launch {
            val user = repository.getUserByEmail(email)
            if (user != null && PasswordHasher.verifyPassword(
                    password = password,
                    salt = user.passwordSalt,
                    expectedHash = user.passwordHash
                )
            ){
                _currentUser.value = user
                onSuccess()
            } else {
                onError()
            }
        }

    }

    fun logout() {
        _currentUser.value = null
    }

    fun register(
        name: String,
        surname: String,
        email: String,
        phone: String,
        password: String,
        repeatPassword: String,
        onSuccess: () -> Unit,
        onError: (String) -> Unit
    ) {
        viewModelScope.launch {
            val validationError = AuthValidator.validateRegister(
                name = name,
                surname = surname,
                phone = phone,
                email = email,
                password = password,
                repeatPassword = repeatPassword
            )

            if (validationError != null) {
                onError(validationError)
                return@launch
            }
            if (password != repeatPassword) {
                onError("Passwords do not match")
                return@launch
            }
            val existingUser = repository.getUserByEmail(email.trim())
            if (existingUser != null) {
                onError("User with this email already exists")
                return@launch
            }
            val salt = PasswordHasher.generateSalt()
            val hashedPassword = PasswordHasher.hashPassword(password, salt)

            repository.insertUser(
                User(
                    id = 0,
                    name = name.trim(),
                    surname = surname.trim(),
                    email = email.trim(),
                    phone = phone.trim(),
                    passwordHash = hashedPassword,
                    passwordSalt = salt,
                    avatarUrl = null,
                    roleId = 1,
                    createdAt = System.currentTimeMillis(),
                    updatedAt = System.currentTimeMillis(),
                )
            )
            onSuccess()
        }
    }
}