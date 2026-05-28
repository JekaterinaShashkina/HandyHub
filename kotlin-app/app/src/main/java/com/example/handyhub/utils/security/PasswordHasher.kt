package com.example.handyhub.utils.security

import android.util.Base64
import java.security.MessageDigest
import java.security.SecureRandom

object PasswordHasher {

    fun generateSalt(): String {
        val salt = ByteArray(16)
        SecureRandom().nextBytes(salt)
        return Base64.encodeToString(salt, Base64.NO_WRAP)
    }

    fun hashPassword(password: String, salt: String): String {
        val digest = MessageDigest.getInstance("SHA-256")
        val saltedPassword = salt + password
        val hash = digest.digest(saltedPassword.toByteArray(Charsets.UTF_8))
        return Base64.encodeToString(hash, Base64.NO_WRAP)
    }

    fun verifyPassword(
        password: String,
        salt: String,
        expectedHash: String
    ): Boolean {
        val actualHash = hashPassword(password, salt)
        return actualHash == expectedHash
    }
}
