package com.example.teamm

import java.io.Serializable

class User(
    var id: String,
    var pw: String
): Serializable {
    constructor(): this("","")

}