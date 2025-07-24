import { useState } from 'react';
import { Brain, Lightbulb, BookOpen, Play, ChevronRight, Award, Star } from 'lucide-react';
import { toast } from 'sonner';

interface KnowledgeSection {
  id: string;
  title: string;
  emoji: string;
  description: string;
  content: string[];
  quiz?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

export default function AIKnowledge() {
  const [activeSection, setActiveSection] = useState<string>('what-is-ai');
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: number}>({});
  const [showQuizResult, setShowQuizResult] = useState<{[key: string]: boolean}>({});

  const knowledgeSections: KnowledgeSection[] = [
    {
      id: 'what-is-ai',
      title: '什么是人工智能？',
      emoji: '🤖',
      description: '了解AI的基本概念',
      content: [
        '人工智能（AI）就像给电脑装上了"大脑"，让它能够像人类一样思考和学习！',
        '想象一下，如果你的画笔能够自己画画，那就是AI绘画的魔法！',
        'AI通过学习成千上万张图片，就像你通过看很多画作来提高绘画技能一样。',
        '现在，AI可以帮助我们创作出从未见过的奇妙图画和动画！'
      ],
      quiz: {
        question: 'AI绘画是如何工作的？',
        options: [
          '电脑随机画出图片',
          'AI学习了很多图片后，根据文字描述创作新图片',
          '人类远程控制电脑画画',
          '电脑复制现有的图片'
        ],
        correct: 1,
        explanation: '正确！AI通过学习大量图片，理解不同物体的特征，然后根据我们的文字描述创作出全新的图片。'
      }
    },
    {
      id: 'how-ai-draws',
      title: 'AI是怎么画画的？',
      emoji: '🎨',
      description: '探索AI绘画的神奇过程',
      content: [
        '第一步：AI读懂你的文字描述，就像理解"画一只可爱的小猫"这样的指令。',
        '第二步：AI在"脑海"中搜索关于猫咪的所有知识 - 毛茸茸的、有胡须、会喵喵叫。',
        '第三步：AI开始从一片"噪点"（像电视雪花屏）慢慢"雕刻"出图像。',
        '第四步：经过多次调整和优化，一幅美丽的猫咪图片就诞生了！',
        '整个过程就像魔法师从空气中变出画作一样神奇！'
      ],
      quiz: {
        question: 'AI绘画的第一步是什么？',
        options: [
          '直接开始画画',
          '理解文字描述',
          '选择颜色',
          '准备画布'
        ],
        correct: 1,
        explanation: '没错！AI首先要理解我们给它的文字描述，就像我们画画前要先想清楚要画什么一样。'
      }
    },
    {
      id: 'types-of-ai-art',
      title: 'AI艺术的类型',
      emoji: '🌈',
      description: '发现不同的AI创作方式',
      content: [
        '📝 文生图：用文字描述，AI帮你画出想象中的画面！',
        '🎬 文生视频：描述一个故事，AI创作动态的视频！',
        '📸 图生视频：给AI一张图片，它能让图片"动"起来！',
        '🎞️ 帧生视频：提供开始和结束的画面，AI创作中间的过渡动画！',
        '每种方式都有自己的特色，就像不同的画笔有不同的用途！'
      ],
      quiz: {
        question: '如果你想让一张静态图片动起来，应该使用哪种AI功能？',
        options: [
          '文生图',
          '文生视频',
          '图生视频',
          '帧生视频'
        ],
        correct: 2,
        explanation: '正确！图生视频功能可以让静态图片产生动态效果，比如让花朵摇摆、云朵飘动等。'
      }
    },
    {
      id: 'ai-creativity',
      title: 'AI的创造力',
      emoji: '✨',
      description: '理解AI如何发挥创意',
      content: [
        'AI的创造力来自于它学习过的无数艺术作品和图片。',
        '就像你看过很多动画片后，也能想象出新的故事情节一样！',
        'AI能够将不同的元素组合在一起，创造出前所未见的奇妙画面。',
        '比如：彩虹色的独角兽在云朵上跳舞，或者会飞的鱼在星空中游泳！',
        'AI不是简单地复制，而是在理解的基础上进行创新。'
      ],
      quiz: {
        question: 'AI的创造力主要来源于什么？',
        options: [
          '程序员的想象力',
          '随机生成',
          '学习过的大量艺术作品和图片',
          '复制现有图片'
        ],
        correct: 2,
        explanation: '很棒！AI通过学习大量的艺术作品和图片，理解不同元素的特征，然后创造性地组合它们。'
      }
    },
    {
      id: 'future-of-ai',
      title: 'AI艺术的未来',
      emoji: '🚀',
      description: '展望AI艺术的发展前景',
      content: [
        '未来的AI可能会更加智能，能够理解更复杂的创作需求。',
        'AI艺术工具会变得更加简单易用，每个人都能成为艺术家！',
        'AI可能会帮助我们创作3D动画、虚拟现实世界，甚至全息影像！',
        '但是，人类的想象力和创意永远是最重要的，AI只是我们的好帮手。',
        '你们这一代将会见证AI艺术的蓬勃发展，也许还会创造出更神奇的技术！'
      ],
      quiz: {
        question: '在AI艺术的未来发展中，什么是最重要的？',
        options: [
          'AI技术本身',
          '昂贵的设备',
          '人类的想象力和创意',
          '复杂的操作'
        ],
        correct: 2,
        explanation: '完全正确！无论AI多么先进，人类的想象力和创意始终是艺术创作的核心。AI只是帮助我们实现创意的工具。'
      }
    }
  ];

  const handleQuizAnswer = (sectionId: string, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [sectionId]: answerIndex }));
    setShowQuizResult(prev => ({ ...prev, [sectionId]: true }));
    
    const section = knowledgeSections.find(s => s.id === sectionId);
    if (section?.quiz) {
      if (answerIndex === section.quiz.correct) {
        toast.success('回答正确！🎉');
        setCompletedSections(prev => new Set([...prev, sectionId]));
      } else {
        toast.error('答案不对，再想想看！');
      }
    }
  };

  const resetQuiz = (sectionId: string) => {
    setQuizAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[sectionId];
      return newAnswers;
    });
    setShowQuizResult(prev => ({ ...prev, [sectionId]: false }));
  };

  const currentSection = knowledgeSections.find(s => s.id === activeSection);
  const completionRate = Math.round((completedSections.size / knowledgeSections.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🧠</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI知识小课堂
          </h1>
          <p className="text-lg text-gray-600">
            一起探索人工智能绘画的奇妙世界！
          </p>
        </div>

        {/* 学习进度 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Award className="text-yellow-500" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">学习进度</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-500" size={20} />
              <span className="text-lg font-bold text-gray-900">{completionRate}%</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-600">
            已完成 {completedSections.size} / {knowledgeSections.length} 个章节
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左侧：章节导航 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen className="mr-2 text-blue-500" size={20} />
                学习章节
              </h2>
              
              <div className="space-y-2">
                {knowledgeSections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      activeSection === section.id
                        ? 'bg-blue-50 border-2 border-blue-500 text-blue-700'
                        : 'hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{section.emoji}</span>
                        <div>
                          <div className="font-medium text-sm">{section.title}</div>
                          <div className="text-xs text-gray-500">{section.description}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {completedSections.has(section.id) && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧：内容区域 */}
          <div className="lg:col-span-3">
            {currentSection && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                {/* 章节标题 */}
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-4xl">{currentSection.emoji}</span>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{currentSection.title}</h1>
                    <p className="text-gray-600">{currentSection.description}</p>
                  </div>
                </div>

                {/* 内容 */}
                <div className="space-y-4 mb-8">
                  {currentSection.content.map((paragraph, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-1">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">{paragraph}</p>
                    </div>
                  ))}
                </div>

                {/* 小测验 */}
                {currentSection.quiz && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                    <div className="flex items-center space-x-2 mb-4">
                      <Lightbulb className="text-purple-500" size={24} />
                      <h3 className="text-lg font-semibold text-gray-900">小测验时间！</h3>
                    </div>
                    
                    <p className="text-gray-700 mb-4 font-medium">{currentSection.quiz.question}</p>
                    
                    <div className="space-y-3 mb-4">
                      {currentSection.quiz.options.map((option, index) => {
                        const isSelected = quizAnswers[currentSection.id] === index;
                        const isCorrect = index === currentSection.quiz!.correct;
                        const showResult = showQuizResult[currentSection.id];
                        
                        let buttonClass = 'w-full text-left p-3 rounded-lg border-2 transition-all ';
                        
                        if (showResult) {
                          if (isCorrect) {
                            buttonClass += 'border-green-500 bg-green-50 text-green-700';
                          } else if (isSelected && !isCorrect) {
                            buttonClass += 'border-red-500 bg-red-50 text-red-700';
                          } else {
                            buttonClass += 'border-gray-200 bg-gray-50 text-gray-500';
                          }
                        } else {
                          if (isSelected) {
                            buttonClass += 'border-purple-500 bg-purple-50 text-purple-700';
                          } else {
                            buttonClass += 'border-gray-200 hover:border-gray-300 text-gray-700';
                          }
                        }
                        
                        return (
                          <button
                            key={index}
                            onClick={() => !showQuizResult[currentSection.id] && handleQuizAnswer(currentSection.id, index)}
                            disabled={showQuizResult[currentSection.id]}
                            className={buttonClass}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold">
                                {String.fromCharCode(65 + index)}
                              </div>
                              <span>{option}</span>
                              {showResult && isCorrect && (
                                <span className="ml-auto text-green-500">✓</span>
                              )}
                              {showResult && isSelected && !isCorrect && (
                                <span className="ml-auto text-red-500">✗</span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    
                    {showQuizResult[currentSection.id] && (
                      <div className="mt-4">
                        <div className={`p-4 rounded-lg ${
                          quizAnswers[currentSection.id] === currentSection.quiz.correct
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-orange-50 border border-orange-200'
                        }`}>
                          <p className="text-sm text-gray-700">
                            <strong>解释：</strong>{currentSection.quiz.explanation}
                          </p>
                        </div>
                        
                        {quizAnswers[currentSection.id] !== currentSection.quiz.correct && (
                          <button
                            onClick={() => resetQuiz(currentSection.id)}
                            className="mt-3 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                          >
                            再试一次
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 导航按钮 */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => {
                      const currentIndex = knowledgeSections.findIndex(s => s.id === activeSection);
                      if (currentIndex > 0) {
                        setActiveSection(knowledgeSections[currentIndex - 1].id);
                      }
                    }}
                    disabled={knowledgeSections.findIndex(s => s.id === activeSection) === 0}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>← 上一章</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      const currentIndex = knowledgeSections.findIndex(s => s.id === activeSection);
                      if (currentIndex < knowledgeSections.length - 1) {
                        setActiveSection(knowledgeSections[currentIndex + 1].id);
                      }
                    }}
                    disabled={knowledgeSections.findIndex(s => s.id === activeSection) === knowledgeSections.length - 1}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>下一章 →</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 完成祝贺 */}
        {completedSections.size === knowledgeSections.length && (
          <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-lg text-center border-2 border-yellow-200">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">恭喜你完成了所有学习！</h2>
            <p className="text-gray-600 mb-4">你已经掌握了AI绘画的基础知识，现在可以去创作属于你的AI艺术作品了！</p>
            <div className="flex justify-center space-x-4">
              <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-medium">🏆 AI知识达人</span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">🎨 未来艺术家</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}