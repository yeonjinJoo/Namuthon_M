package com.example.teamm

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.teamm.databinding.ActivityLoginSuccessBinding

class LoginSuccessActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginSuccessBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginSuccessBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val intent = intent
        val name = intent.getStringExtra("name")

        binding.textView.text = " ${name}님 회원가입을 축하합니다!"
    }
}