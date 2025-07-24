import { useState, useRef } from 'react';
import { Upload, Video, Download, RefreshCw, X, Clock, Zap } from 'lucide-react';
import { toast } from 'sonner';

export default function FrameToVideo() {
  const [startImage, setStartImage] = useState<string | null>(null);
  const [endImage, setEndImage] = useState<string | null>(null);
  const [duration, setDuration] = useState('3');
  const [transitionType, setTransitionType] = useState('smooth');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const startFileInputRef = useRef<HTMLInputElement>(null);
  const endFileInputRef = useRef<HTMLInputElement>(null);

  const durations = [
    { value: '2', label: '2秒', description: '快速过渡' },
    { value: '3', label: '3秒', description: '标准时长' },
    { value: '5', label: '5秒', description: '缓慢过渡' }
  ];

  const transitions = [
    { 
      id: 'smooth', 
      name: '平滑过渡', 
      emoji: '🌊', 
      description: '自然流畅的变化' 
    },
    { 
      id: 'morph', 
      name: '形变过渡', 
      emoji: '🔄', 
      description: '形状逐渐变化' 
    },
    { 
      id: 'fade', 
      name: '淡入淡出', 
      emoji: '✨', 
      description: '渐隐渐现效果' 
    },
    { 
      id: 'wipe', 
      name: '擦除过渡', 
      emoji: '🎭', 
      description: '从一边擦除到另一边' 
    }
  ];

  const handleImageUpload = (type: 'start' | 'end', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          if (type === 'start') {
            setStartImage(imageUrl);
          } else {
            setEndImage(imageUrl);
          }
        };
        reader.readAsDataURL(file);
        toast.success(`${type === 'start' ? '起始' : '结束'}图片上传成功！`);
      } else {
        toast.error('请选择图片文件！');
      }
    }
  };

  const handleDrop = (type: 'start' | 'end', event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (type === 'start') {
          setStartImage(imageUrl);
        } else {
          setEndImage(imageUrl);
        }
      };
      reader.readAsDataURL(file);
      toast.success(`${type === 'start' ? '起始' : '结束'}图片上传成功！`);
    } else {
      toast.error('请拖拽图片文件！');
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeImage = (type: 'start' | 'end') => {
    if (type === 'start') {
      setStartImage(null);
      if (startFileInputRef.current) {
        startFileInputRef.current.value = '';
      }
    } else {
      setEndImage(null);
      if (endFileInputRef.current) {
        endFileInputRef.current.value = '';
      }
    }
    setGeneratedVideo(null);
  };

  const generateVideo = async () => {
    if (!startImage || !endImage) {
      toast.error('请上传起始图片和结束图片！');
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
          return prev + Math.random() * 8;
        });
      }, 300);

      // 模拟视频生成时间
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // 实际项目中这里应该调用帧间插值视频生成API
      const videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
      setGeneratedVideo(videoUrl);
      
      toast.success('过渡视频生成成功！');
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
      link.download = `frame-transition-${Date.now()}.mp4`;
      link.click();
      toast.success('视频已保存！');
    }
  };

  const ImageUploadArea = ({ type, image, onUpload, onRemove }: {
    type: 'start' | 'end';
    image: string | null;
    onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
  }) => {
    const inputRef = type === 'start' ? startFileInputRef : endFileInputRef;
    const label = type === 'start' ? '起始图片' : '结束图片';
    const emoji = type === 'start' ? '🎬' : '🎯';

    return (
      <div className="bg-white rounded-xl p-4 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <span className="text-2xl mr-2">{emoji}</span>
          {label}
        </h3>
        
        {!image ? (
          <div
            onDrop={(e) => handleDrop(type, e)}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-500 transition-colors cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <div className="text-3xl mb-2">📸</div>
            <p className="text-gray-600 text-sm mb-1">点击或拖拽图片</p>
            <p className="text-xs text-gray-500">JPG、PNG格式</p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={onUpload}
              className="hidden"
            />
          </div>
        ) : (
          <div className="relative">
            <img
              src={image}
              alt={label}
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              onClick={onRemove}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎞️</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            前后帧生成视频
          </h1>
          <p className="text-lg text-gray-600">
            上传两张图片，AI会创建流畅的过渡动画！
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：上传和设置区域 */}
          <div className="space-y-6">
            {/* 双图上传区 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="mr-2 text-pink-500" size={24} />
                上传前后帧图片
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <ImageUploadArea
                  type="start"
                  image={startImage}
                  onUpload={(e) => handleImageUpload('start', e)}
                  onRemove={() => removeImage('start')}
                />
                <ImageUploadArea
                  type="end"
                  image={endImage}
                  onUpload={(e) => handleImageUpload('end', e)}
                  onRemove={() => removeImage('end')}
                />
              </div>
              
              {startImage && endImage && (
                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <span className="text-2xl">✅</span>
                    <span className="font-medium">两张图片已准备就绪！</span>
                  </div>
                </div>
              )}
            </div>

            {/* 时长选择 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="mr-2 text-blue-500" size={24} />
                过渡时长
              </h2>
              
              <div className="grid grid-cols-3 gap-3">
                {durations.map((dur) => (
                  <button
                    key={dur.value}
                    onClick={() => setDuration(dur.value)}
                    className={`p-3 rounded-xl border-2 transition-all text-center ${
                      duration === dur.value
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-bold text-gray-900">{dur.label}</div>
                    <div className="text-xs text-gray-600 mt-1">{dur.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 过渡类型选择 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Zap className="mr-2 text-orange-500" size={24} />
                过渡效果
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                {transitions.map((transition) => (
                  <button
                    key={transition.id}
                    onClick={() => setTransitionType(transition.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      transitionType === transition.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{transition.emoji}</div>
                    <div className="font-medium text-gray-900 text-sm">{transition.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{transition.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 生成按钮 */}
            <button
              onClick={generateVideo}
              disabled={isGenerating || !startImage || !endImage}
              className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="animate-spin" size={20} />
                  <span>AI正在制作过渡动画...</span>
                </>
              ) : (
                <>
                  <Video size={20} />
                  <span>生成过渡视频</span>
                </>
              )}
            </button>

            {/* 进度条 */}
            {isGenerating && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">生成进度</span>
                  <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">正在计算帧间插值，创建流畅过渡...</p>
              </div>
            )}
          </div>

          {/* 右侧：视频预览区 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🎬 过渡动画预览
            </h2>
            
            <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              {isGenerating ? (
                <div className="text-center">
                  <div className="animate-spin text-4xl mb-4">🔄</div>
                  <p className="text-gray-600">AI正在创建过渡动画...</p>
                  <div className="mt-4 flex space-x-1">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              ) : generatedVideo ? (
                <div className="w-full h-full relative group">
                  <video
                    src={generatedVideo}
                    controls
                    className="w-full h-full object-cover rounded-xl"
                    poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23f3f4f6'/%3E%3Ctext x='200' y='112.5' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='16'%3E点击播放过渡动画%3C/text%3E%3C/svg%3E"
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
              ) : startImage && endImage ? (
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <img src={startImage} alt="起始帧" className="w-16 h-16 object-cover rounded-lg" />
                    <div className="text-2xl animate-pulse">➡️</div>
                    <img src={endImage} alt="结束帧" className="w-16 h-16 object-cover rounded-lg" />
                  </div>
                  <p className="text-gray-600">设置参数，点击生成按钮</p>
                  <p className="text-sm text-gray-500 mt-2">创建流畅的过渡动画！</p>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">🎭</div>
                  <p>上传两张图片</p>
                  <p className="text-sm mt-2">AI会创建它们之间的过渡动画！</p>
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
                  className="flex-1 bg-pink-500 text-white py-2 rounded-lg font-medium hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2"
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