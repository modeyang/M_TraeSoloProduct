import { useState } from 'react';
import { Video, Play, Download, RefreshCw, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function TextToVideo() {
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState('3');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const durations = [
    { value: '3', label: '3秒', description: '快速预览' },
    { value: '5', label: '5秒', description: '标准时长' },
    { value: '10', label: '10秒', description: '详细展示' }
  ];

  const presetPrompts = [
    '小鸟在蓝天白云中自由飞翔',
    '彩虹独角兽在草地上奔跑',
    '小猫咪在阳光下打盹',
    '蝴蝶在花丛中翩翩起舞',
    '小火车穿过美丽的山谷',
    '海豚在清澈的海水中游泳'
  ];

  const generateVideo = async () => {
    if (!prompt.trim()) {
      toast.error('请输入视频描述！');
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
          return prev + Math.random() * 15;
        });
      }, 500);

      // 模拟视频生成时间（比图片更长）
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // 由于实际视频生成API较复杂，这里使用静态视频作为演示
      // 实际项目中应该调用真实的视频生成API
      const videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
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
      link.download = `ai-video-${Date.now()}.mp4`;
      link.click();
      toast.success('视频已保存！');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎬</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            文字生成视频
          </h1>
          <p className="text-lg text-gray-600">
            描述一个场景，AI会为你创作动态视频！
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：输入区域 */}
          <div className="space-y-6">
            {/* 描述输入区 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Video className="mr-2 text-purple-500" size={24} />
                描述你想要的视频场景
              </h2>
              
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="例如：小鸟在蓝天白云中自由飞翔..."
                className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none text-gray-700"
              />
              
              {/* 预设提示词 */}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">💡 试试这些场景：</h3>
                <div className="flex flex-wrap gap-2">
                  {presetPrompts.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(preset)}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 时长选择区 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="mr-2 text-blue-500" size={24} />
                选择视频时长
              </h2>
              
              <div className="grid grid-cols-3 gap-3">
                {durations.map((dur) => (
                  <button
                    key={dur.value}
                    onClick={() => setDuration(dur.value)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      duration === dur.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-bold text-lg text-gray-900">{dur.label}</div>
                    <div className="text-xs text-gray-600 mt-1">{dur.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 生成按钮 */}
            <button
              onClick={generateVideo}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="animate-spin" size={20} />
                  <span>AI正在制作视频...</span>
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
                  <span className="text-sm font-medium text-gray-700">生成进度</span>
                  <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">视频生成需要更多时间，请耐心等待...</p>
              </div>
            )}
          </div>

          {/* 右侧：视频预览区 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🎥 生成的视频
            </h2>
            
            <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              {isGenerating ? (
                <div className="text-center">
                  <div className="animate-bounce text-4xl mb-4">🎬</div>
                  <p className="text-gray-600">AI正在制作你的视频...</p>
                  <div className="mt-4 flex space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              ) : generatedVideo ? (
                <div className="w-full h-full relative group">
                  <video
                    src={generatedVideo}
                    controls
                    className="w-full h-full object-cover rounded-xl"
                    poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23f3f4f6'/%3E%3Ctext x='200' y='112.5' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='16'%3E点击播放视频%3C/text%3E%3C/svg%3E"
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
              ) : (
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">🎭</div>
                  <p>输入场景描述，点击生成按钮</p>
                  <p className="text-sm mt-2">AI会为你创作精彩的视频！</p>
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
                  className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2"
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