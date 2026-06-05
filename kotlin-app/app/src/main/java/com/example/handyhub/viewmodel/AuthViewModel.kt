package com.example.handyhub.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.handyhub.data.repository.HandyHubRepository
import com.example.handyhub.model.User
import com.example.handyhub.session.SessionManager
import com.example.handyhub.utils.security.PasswordHasher
import com.example.handyhub.utils.validation.AuthValidator
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class AuthViewModel(
    private val repository: HandyHubRepository,
    private val sessionManager: SessionManager
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
            val user = repository.getUserByEmail(email.trim())
            if (user != null && PasswordHasher.verifyPassword(
                    password = password,
                    salt = user.passwordSalt,
                    expectedHash = user.passwordHash
                )
            ){
                _currentUser.value = user
                sessionManager.saveUserId(user.id)
                onSuccess()
            } else {
                onError()
            }
        }

    }

    fun register(
        name: String,
        surname: String,
        email: String,
        phone: String,
        password: String,
        repeatPassword: String,
        onSuccess: () -> Unit,
        onError: (String) -> Unit,
        avatarUri: String?
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
                    avatarUri = avatarUri
                )
            )
            onSuccess()
        }
    }
    fun logout() {
        _currentUser.value = null
        sessionManager.clearSession()
    }

    fun refreshCurrentUser() {
        val userId = _currentUser.value?.id ?: return

        viewModelScope.launch {
            _currentUser.value = repository.getUserById(userId)
        }
    }

    fun loadSavedUser() {
        viewModelScope.launch {
            val userId = sessionManager.getUserId()

            if (userId != null) {
                _currentUser.value = repository.getUserById(userId)
            }
        }
    }
    fun updateProfile(
        name: String,
        surname: String,
        email: String,
        phone: String,
        avatarUri: String?,
        onSuccess: () -> Unit,
        onError: (String) -> Unit
    ) {
        viewModelScope.launch {
            val user = _currentUser.value

            if (user == null) {
                onError("User not found")
                return@launch
            }

            if (
                name.isBlank() ||
                surname.isBlank() ||
                email.isBlank() ||
                phone.isBlank()
            ) {
                onError("Please fill all fields")
                return@launch
            }

            val updatedUser = user.copy(
                name = name.trim(),
                surname = surname.trim(),
                email = email.trim(),
                phone = phone.trim(),
                avatarUri = avatarUri,
                updatedAt = System.currentTimeMillis()
            )

            repository.updateUser(updatedUser)
            _currentUser.value = updatedUser

            onSuccess()
        }
    }
}