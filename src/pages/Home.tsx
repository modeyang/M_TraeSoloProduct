import { Link } from 'react-router-dom';
import { Image, Video, Camera, Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  const features = [
    {
      title: '文生图',
      description: '用文字描述，AI帮你画出想象中的图片',
      icon: Image,
      path: '/text-to-image',
      color: 'from-blue-500 to-blue-600',
      emoji: '🎨'
    },
    {
      title: '文生视频',
      description: '输入文字，生成精彩的短视频',
      icon: Video,
      path: '/text-to-video',
      color: 'from-purple-500 to-purple-600',
      emoji: '🎬'
    },
    {
      title: '图生视频',
      description: '上传图片，让静态图片动起来',
      icon: Camera,
      path: '/image-to-video',
      color: 'from-green-500 to-green-600',
      emoji: '📹'
    },
    {
      title: '帧生视频',
      description: '两张图片制作流畅的过渡动画',
      icon: Sparkles,
      path: '/frame-to-video',
      color: 'from-pink-500 to-pink-600',
      emoji: '🎞️'
    }
  ];

  const sampleWorks = [
    {
      title: '彩虹独角兽',
      type: '文生图',
      image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20rainbow%20unicorn%20in%20cartoon%20style%20with%20sparkles&image_size=square'
    },
    {
      title: '飞翔的小鸟',
      type: '文生视频',
      image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20bird%20flying%20in%20blue%20sky%20cartoon%20style&image_size=square'
    },
    {
      title: '魔法森林',
      type: '图生视频',
      image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=magical%20forest%20with%20glowing%20trees%20cartoon%20style&image_size=square'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* 欢迎区域 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="text-8xl mb-4">🤖</div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              欢迎来到
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                AI绘画世界
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              🎨 用AI的魔法，让你的想象变成现实！
              <br />
              ✨ 小朋友们，一起来体验神奇的AI创作吧！
            </p>
            <Link
              to="/text-to-image"
              className="inline-flex items-center space-x-2 bg-white text-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>开始创作</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 功能导航 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🌟 选择你喜欢的创作方式
            </h2>
            <p className="text-lg text-gray-600">
              每一种方式都有不同的惊喜等着你发现！
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.path}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-100 hover:border-transparent"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                  
                  <div className="relative">
                    <div className="text-4xl mb-4 text-center">{feature.emoji}</div>
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-center text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="mt-4 flex items-center justify-center text-sm font-medium text-gray-500 group-hover:text-gray-700">
                      <span>点击体验</span>
                      <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 精选作品展示 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🎭 精彩作品展示
            </h2>
            <p className="text-lg text-gray-600">
              看看其他小朋友用AI创作的神奇作品！
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleWorks.map((work, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{work.title}</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {work.type}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">AI创作的精彩作品</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/gallery"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>查看更多作品</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}