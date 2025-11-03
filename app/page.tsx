"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeartBreak, FileText, Lightning, CheckCircle, ArrowRight } from "@phosphor-icons/react";

export default function HomePage() {
  const features = [
    {
      icon: <FileText size={24} weight="duotone" />,
      title: "Đa dạng dạng bài",
      description: "Trắc nghiệm, tự luận, viết văn theo chuẩn BGD"
    },
    {
      icon: <Lightning size={24} weight="duotone" />,
      title: "Sinh đề tức thì",
      description: "AI tạo đề trong vài giây, chuẩn xác"
    },
    {
      icon: <CheckCircle size={24} weight="duotone" />,
      title: "Tùy chỉnh linh hoạt",
      description: "Độ khó, số câu, chủ đề theo ý muốn"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50/20 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="max-w-4xl w-full space-y-12"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            {/* Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mt-3  inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 shadow-lg"
            >
              <HeartBreak size={18} weight="fill" className="text-purple-600" />
              <span className="text-sm font-semibold text-purple-700 ">
                Power Ranger 
              </span>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tạo đề Tiếng Việt
              </span>
              <br />
              <span className="text-slate-800">cho Tiểu học</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Sinh đề tự động <strong className="text-slate-800">hỗ trợ cấp tiểu học</strong>
            </p>

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-4 pt-4"
            >
              <Link href="/generator">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-2xl shadow-purple-500/30 overflow-hidden"
                >
                  <motion.div
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                  <span className="relative flex items-center gap-2">
                    Bắt đầu tạo đề
                    <ArrowRight size={20} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>

              <Link href="/guide">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-purple-200 text-purple-700 font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  Hướng dẫn
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-6 pt-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-slate-100 shadow-lg hover:shadow-2xl hover:border-purple-200 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-12 pt-8"
          >
            {[
              { number: "5", label: "Khối lớp" },
              { number: "10+", label: "Dạng bài" },
              { number: "∞", label: "Đề thi" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1"
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-slate-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-20 w-20 h-20 opacity-20"
      >
        <HeartBreak size={80} weight="duotone" className="text-purple-500" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 left-20 w-16 h-16 opacity-20"
      >
        <FileText size={64} weight="duotone" className="text-blue-500" />
      </motion.div>
    </main>
  );
}