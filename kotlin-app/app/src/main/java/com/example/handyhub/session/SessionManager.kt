package com.example.handyhub.session

import android.content.Context
import androidx.core.content.edit

class SessionManager(context: Context) {
    private val prefs = context.getSharedPreferences(
        "handyhub_session",
        Context.MODE_PRIVATE
    )

    fun saveUserId(userId: Int) {
        prefs.edit {
            putInt("current_user_id", userId)
        }
    }
    fun getUserId(): Int? {
        val id = prefs.getInt("current_user_id", -1)
        return if (id == -1) null else id
    }
    fun clearSession() {
        prefs.edit {
            remove("current_user_id")
        }
    }
}