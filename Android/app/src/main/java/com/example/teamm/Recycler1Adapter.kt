package com.example.teamm

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import java.lang.reflect.Member

class Recycler1Adapter :
    ListAdapter<Recycler1, Recycler1Adapter.Recycler1ViewHolder>(Recycler1DiffCallback()) {
        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Recycler1ViewHolder {
            val view = LayoutInflater.from(parent.context)
                .inflate(R.layout.item_home_recycler1, parent, false)
            return Recycler1ViewHolder(view)
        }

        override fun onBindViewHolder(holder: Recycler1ViewHolder, position: Int) {
            holder.bind(getItem(position)) //position에 해당하는 data type을 전달
        }

        class Recycler1ViewHolder(private val view: View) : RecyclerView.ViewHolder(view) {
            private val recycler1Image = view.findViewById<ImageView>(R.id.recycler1_img)
            private val recycler1Name = view.findViewById<TextView>(R.id.recycler1_title)
            private val recycler1Date = view.findViewById<TextView>(R.id.recycler1_date)
            fun bind(recycler: Recycler1) {
                recycler1Image.setImageDrawable(view.context.getDrawable(recycler.image))
                recycler1Name.text = recycler.name
                recycler1Date.text = recycler.date
            }

        }

    class Recycler1DiffCallback : DiffUtil.ItemCallback<Recycler1>() {
        override fun areItemsTheSame(oldItem: Recycler1, newItem: Recycler1): Boolean {
            return oldItem.name == newItem.name
        }

        override fun areContentsTheSame(oldItem: Recycler1, newItem: Recycler1): Boolean {
            return oldItem == newItem
        }
    }
}