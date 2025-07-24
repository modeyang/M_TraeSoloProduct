import { useState, useRef } from 'react';
import { Upload, Video, Download, RefreshCw, X, RotateCw, ZoomIn, Move, Type, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function ImageToVideo() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedEffect, setSelectedEffect] = useState('zoom');
  const [textDescription, setTextDescription] = useState('');
  const [extractedPrompt, setExtractedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const effects = [
    { 
      id: 'zoom', 
      name: '缩放效果', 
      icon: ZoomIn, 
      emoji: '🔍', 
      description: '图片慢慢放大或缩小' 
    },
    { 
      id: 'rotate', 
      name: '旋转效果', 
      icon: RotateCw, 
      emoji: '🌀', 
      description: '图片缓慢旋转' 
    },
    { 
      id: 'float', 
      name: '飘动效果', 
      icon: Move, 
      emoji: '🍃', 
      description: '图片轻柔飘动' 
    },
    { 
      id: 'parallax', 
      name: '视差效果', 
      icon: Video, 
      emoji: '🌊', 
      description: '创造深度感' 
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
          // 自动提取图片描述
          extractImagePrompt(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        toast.success('图片上传成功！');
      } else {
        toast.error('请选择图片文件！');
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        // 自动提取图片描述
        extractImagePrompt(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      toast.success('图片上传成功！');
    } else {
      toast.error('请拖拽图片文件！');
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeImage = () => {
    setSelectedImage(null);
    setGeneratedVideo(null);
    setTextDescription('');
    setExtractedPrompt('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const extractImagePrompt = async (imageData: string) => {
    setIsExtracting(true);
    try {
      // 模拟AI图片分析和提示词提取
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 模拟提取的描述词
      const mockPrompts = [
        '一幅美丽的风景画，包含山脉、湖泊和蓝天白云',
        '可爱的小动物在花园中玩耍，阳光明媚',
        '现代建筑物在城市天际线中闪闪发光',
        '抽象艺术作品，色彩丰富，充满创意',
        '自然风光，绿树成荫，鸟语花香'
      ];
      
      const randomPrompt = mockPrompts[Math.floor(Math.random() * mockPrompts.length)];
      setExtractedPrompt(randomPrompt);
      setTextDescription(randomPrompt);
      
      toast.success('图片描述提取成功！');
    } catch (error) {
      toast.error('提取描述失败，请重试！');
    } finally {
      setIsExtracting(false);
    }
  };

  const generateVideo = async () => {
    if (!selectedImage) {
      toast.error('请先上传图片！');
      return;
    }
    
    if (!textDescription.trim()) {
      toast.error('请输入文字描述！');
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    
    try {
      // 模拟进度更新
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 10;
        });
      }, 400);

      // 模拟视频生成时间
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // 实际项目中这里应该调用图生视频API
      const videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
      setGeneratedVideo(videoUrl);
      
      toast.success('视频生成成功！');
    } catch (error) {
      toast.error('生成失败，请重试！');
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const downloadVideo = () => {
    if (generatedVideo) {
      const link = document.createElement('a');
      link.href = generatedVideo;
      link.download = `image-to-video-${Date.now()}.mp4`;
      link.click();
      toast.success('视频已保存！');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📹</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            图片生成视频
          </h1>
          <p className="text-lg text-gray-600">
            上传一张图片，AI会让它动起来！
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：上传和设置区域 */}
          <div className="space-y-6">
            {/* 图片上传区 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="mr-2 text-green-500" size={24} />
                上传图片
              </h2>
              
              {!selectedImage ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-4xl mb-4">📸</div>
                  <p className="text-gray-600 mb-2">点击或拖拽图片到这里</p>
                  <p className="text-sm text-gray-500">支持 JPG、PNG、GIF 格式</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="上传的图片"
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* 文字描述输入区 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Type className="mr-2 text-purple-500" size={24} />
                文字描述
              </h2>
              
              {/* 反向提示词提取结果 */}
              {extractedPrompt && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-2">
                    <Sparkles className="mr-2 text-blue-500" size={16} />
                    <span className="text-sm font-medium text-blue-700">AI提取的图片描述：</span>
                  </div>
                  <p className="text-sm text-blue-600">{extractedPrompt}</p>
                </div>
              )}
              
              {/* 文字输入框 */}
              <div className="relative">
                <textarea
                  value={textDescription}
                  onChange={(e) => setTextDescription(e.target.value)}
                  placeholder="描述你希望图片如何动起来，比如：让花朵在微风中轻柔摇摆，蝴蝶在花丛中飞舞..."
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={isExtracting}
                />
                {isExtracting && (
                  <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                    <div className="flex items-center space-x-2 text-blue-600">
                      <RefreshCw className="animate-spin" size={16} />
                      <span className="text-sm">正在分析图片...</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* 重新提取按钮 */}
              {selectedImage && (
                <button
                  onClick={() => extractImagePrompt(selectedImage)}
                  disabled={isExtracting}
                  className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  <Sparkles size={16} />
                  <span>{isExtracting ? '分析中...' : '重新提取描述'}</span>
                </button>
              )}
            </div>

            {/* 动效选择区 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Video className="mr-2 text-blue-500" size={24} />
                选择动画效果
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                {effects.map((effect) => {
                  const Icon = effect.icon;
                  return (
                    <button
                      key={effect.id}
                      onClick={() => setSelectedEffect(effect.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedEffect === effect.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{effect.emoji}</div>
                      <div className="flex items-center justify-center mb-2">
                        <Icon size={20} className="text-gray-600" />
                      </div>
                      <div className="font-medium text-gray-900 text-sm">{effect.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{effect.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 生成按钮 */}
            <button
              onClick={generateVideo}
              disabled={isGenerating || !selectedImage || !textDescription.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="animate-spin" size={20} />
                  <span>AI正在制作动画...</span>
                </>
              ) : (
                <>
                  <Video size={20} />
                  <span>开始生成视频</span>
                </>
              )}
            </button>

            {/* 进度条 */}
            {isGenerating && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">处理进度</span>
                  <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">正在为图片添加动画效果...</p>
              </div>
            )}
          </div>

          {/* 右侧：视频预览区 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🎬 生成的动画视频
            </h2>
            
            <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              {isGenerating ? (
                <div className="text-center">
                  <div className="animate-pulse text-4xl mb-4">🎨</div>
                  <p className="text-gray-600">AI正在为图片添加动画...</p>
                  <div className="mt-4 flex space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              ) : generatedVideo ? (
                <div className="w-full h-full relative group">
                  <video
                    src={generatedVideo}
                    controls
                    className="w-full h-full object-cover rounded-xl"
                    poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23f3f4f6'/%3E%3Ctext x='200' y='112.5' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='16'%3E点击播放动画视频%3C/text%3E%3C/svg%3E"
                  >
                    您的浏览器不支持视频播放。
                  </video>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={downloadVideo}
                      className="bg-white text-gray-900 p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
                      title="下载视频"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ) : selectedImage ? (
                <div className="text-center text-gray-500">
                  <img
                    src={selectedImage}
                    alt="预览图片"
                    className="w-32 h-32 object-cover rounded-xl mx-auto mb-4 opacity-50"
                  />
                  <p>选择动画效果，点击生成按钮</p>
                  <p className="text-sm mt-2">让你的图片动起来！</p>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">🖼️</div>
                  <p>先上传一张图片</p>
                  <p className="text-sm mt-2">AI会为它添加精彩的动画效果！</p>
                </div>
              )}
            </div>
            
            {generatedVideo && (
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={downloadVideo}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download size={16} />
                  <span>下载视频</span>
                </button>
                <button
                  onClick={generateVideo}
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