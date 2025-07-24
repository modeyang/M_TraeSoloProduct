import { useState } from 'react';
import { Wand2, Download, RefreshCw, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function TextToImage() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('cartoon');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const styles = [
    { id: 'cartoon', name: '卡通风格', emoji: '🎨', description: '可爱的卡通画风' },
    { id: 'realistic', name: '写实风格', emoji: '📸', description: '真实的照片效果' },
    { id: 'watercolor', name: '水彩风格', emoji: '🖌️', description: '柔美的水彩画' },
    { id: 'anime', name: '动漫风格', emoji: '🌟', description: '日式动漫画风' }
  ];

  const presetPrompts = [
    '可爱的小猫咪在花园里玩耍',
    '彩虹色的独角兽在云朵上飞翔',
    '神奇的魔法城堡在山顶上',
    '友好的机器人在帮助小朋友',
    '美丽的蝴蝶在花丛中飞舞',
    '勇敢的小恐龙在探险'
  ];

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast.error('请输入描述文字！');
      return;
    }

    setIsGenerating(true);
    try {
      // 构建提示词，加入风格描述
      const stylePrompt = `${prompt}, ${selectedStyle} style, high quality, detailed`;
      const encodedPrompt = encodeURIComponent(stylePrompt);
      const imageUrl = `https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=${encodedPrompt}&image_size=square_hd`;
      
      // 模拟生成时间
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setGeneratedImage(imageUrl);
      toast.success('图片生成成功！');
    } catch (error) {
      toast.error('生成失败，请重试！');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `ai-generated-${Date.now()}.jpg`;
      link.click();
      toast.success('图片已保存！');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎨</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            文字生成图片
          </h1>
          <p className="text-lg text-gray-600">
            用文字描述你想要的图片，AI会帮你画出来！
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：输入区域 */}
          <div className="space-y-6">
            {/* 文字输入区 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Wand2 className="mr-2 text-blue-500" size={24} />
                描述你想要的图片
              </h2>
              
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="例如：一只可爱的小猫咪在花园里玩耍..."
                className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none text-gray-700"
              />
              
              {/* 预设提示词 */}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">💡 试试这些创意：</h3>
                <div className="flex flex-wrap gap-2">
                  {presetPrompts.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(preset)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 风格选择区 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Sparkles className="mr-2 text-purple-500" size={24} />
                选择画风
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedStyle === style.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{style.emoji}</div>
                    <div className="font-medium text-gray-900">{style.name}</div>
                    <div className="text-xs text-gray-600">{style.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 生成按钮 */}
            <button
              onClick={generateImage}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="animate-spin" size={20} />
                  <span>AI正在创作中...</span>
                </>
              ) : (
                <>
                  <Wand2 size={20} />
                  <span>开始生成图片</span>
                </>
              )}
            </button>
          </div>

          {/* 右侧：图片生成区 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🖼️ 生成的图片
            </h2>
            
            <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              {isGenerating ? (
                <div className="text-center">
                  <div className="animate-spin text-4xl mb-4">🎨</div>
                  <p className="text-gray-600">AI正在为你创作...</p>
                  <div className="mt-4 w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ) : generatedImage ? (
                <div className="w-full h-full relative group">
                  <img
                    src={generatedImage}
                    alt="AI生成的图片"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-xl flex items-center justify-center">
                    <button
                      onClick={downloadImage}
                      className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200 shadow-lg"
                    >
                      <Download size={16} />
                      <span>下载图片</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">🎭</div>
                  <p>输入描述文字，点击生成按钮</p>
                  <p className="text-sm mt-2">AI会为你创作独特的图片！</p>
                </div>
              )}
            </div>
            
            {generatedImage && (
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={downloadImage}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download size={16} />
                  <span>下载</span>
                </button>
                <button
                  onClick={generateImage}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <RefreshCw size={16} />
                  <span>重新生成</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}