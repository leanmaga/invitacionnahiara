// src/components/dashboard/AdminStats.js
"use client";

import { motion } from "framer-motion";
import { Users, MessageSquare, Utensils, Phone, Music } from "lucide-react";

export default function AdminStats({ stats }) {
  const statCards = [
    {
      title: "Total Confirmaciones",
      value: stats.totalConfirmations || 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Personas confirmadas",
    },
    {
      title: "Con Teléfono",
      value: stats.withPhone || 0,
      icon: Phone,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Teléfonos proporcionados",
    },
    {
      title: "Restricciones Alimentarias",
      value: stats.withDietary || 0,
      icon: Utensils,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Con restricciones",
    },
    {
      title: "Con Mensajes",
      value: stats.withMessages || 0,
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Mensajes especiales",
    },
    {
      title: "Canciones Solicitadas",
      value: stats.totalSongs || 0,
      icon: Music,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      description: "Peticiones musicales",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm font-medium text-gray-900 mt-1">
              {stat.title}
            </p>
            <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
