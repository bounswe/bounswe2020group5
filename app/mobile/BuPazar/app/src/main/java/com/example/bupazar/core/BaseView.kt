package com.example.bupazar.core

interface BaseView<T : BasePresenter> {
    fun setPresenter(presenter: T)
}