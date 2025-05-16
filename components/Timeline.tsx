"use client"

import { motion } from "framer-motion"

interface TimelineItem {
  title: string
  company: string
  period: string
  description: string[]
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-12 mt-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="space-y-2">
            {/* Company and Year */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <h3 className="text-xl font-bold text-emerald-500">{item.company}</h3>
              <p className="text-md font-light text-gray-400 sm:text-right mt-1 sm:mt-0">
                {item.period}
              </p>
            </div>

            {/* Title */}
            <p className="text-base font-medium text-secondary">{item.title}</p>

            {/* Description with bullet points */}
            <div className="max-w-[85%]">
              <ul className="list-disc pl-5 space-y-1">
                {item.description.map((point, pointIndex) => (
                  <li key={pointIndex} className="text-sm text-gray-500 dark:text-gray-400">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
