package com.example.handyhub.navigation

object Routes {
    const val HOME = "home"
    const val  MASTER_DETAIL = "master_detail/{masterId}"
    const val ADD_REVIEW = "add_review/{masterId}"
    const val LOGIN = "login"
    const val REGISTER_USER = "register_user"
    const val PROFILE = "profile"
    const val BECOME_MASTER = "become_master"

    fun masterDetail(masterId: Int): String {
        return "master_detail/$masterId"
    }
    fun addReview(masterId: Int): String {
        return "add_review/$masterId"
    }
}