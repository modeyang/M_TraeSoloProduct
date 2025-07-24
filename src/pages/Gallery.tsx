import { useState } from 'react';
import { Heart, Download, Eye, Filter, Search, Grid, List } from 'lucide-react';
import { toast } from 'sonner';

interface Artwork {
  id: string;
  title: string;
  type: 'image' | 'video';
  category: 'text-to-image' | 'text-to-video' | 'image-to-video' | 'frame-to-video';
  thumbnail: string;
  url: string;
  author: string;
  likes: number;
  views: number;
  createdAt: string;
  description: string;
  tags: string[];
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [likedArtworks, setLikedArtworks] = useState<Set<string>>(new Set());

  // 模拟作品数据
  const artworks: Artwork[] = [
    {
      id: '1',
      title: '梦幻城堡',
      type: 'image',
      category: 'text-to-image',
      thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=fantasy_castle_in_clouds_colorful_cartoon_style&image_size=square',
      url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=fantasy_castle_in_clouds_colorful_cartoon_style&image_size=landscape_16_9',
      author: '小明',
      likes: 42,
      views: 156,
      createdAt: '2024-01-15',
      description: '一座漂浮在云端的梦幻城堡，充满童话色彩',
      tags: ['城堡', '梦幻', '童话']
    },
    {
      id: '2',
      title: '可爱小猫咪',
      type: 'video',
      category: 'text-to-video',
      thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=cute_cartoon_cat_playing_colorful_animation_style&image_size=square',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      author: '小红',
      likes: 38,
      views: 124,
      createdAt: '2024-01-14',
      description: '一只可爱的小猫咪在花园里玩耍的动画',
      tags: ['猫咪', '可爱', '动画']
    },
    {
      id: '3',
      title: '星空夜景',
      type: 'image',
      category: 'text-to-image',
      thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=starry_night_sky_mountains_peaceful_landscape&image_size=square',
      url: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=starry_night_sky_mountains_peaceful_landscape&image_size=landscape_16_9',
      author: '小李',
      likes: 56,
      views: 203,
      createdAt: '2024-01-13',
      description: '宁静的星空下，山峦起伏的美丽夜景',
      tags: ['星空', '夜景', '山峦']
    },
    {
      id: '4',
      title: '花朵绽放',
      type: 'video',
      category: 'image-to-video',
      thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=blooming_flower_time_lapse_beautiful_colors&image_size=square',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      author: '小王',
      likes: 29,
      views: 89,
      createdAt: '2024-01-12',
      description: '花朵从花苞到绽放的美丽过程',
      tags: ['花朵', '绽放', '自然']
    },
    {
      id: '5',
      title: '彩虹桥',
      type: 'video',
      category: 'frame-to-video',
      thumbnail: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=rainbow_bridge_magical_transition_colorful&image_size=square',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      author: '小张',
      likes: 45,
      views: 167,
      createdAt: '2024-01-11',
      description: '从雨后到彩虹出现的神奇过渡',
      tags: ['彩虹', '过渡', '神奇']
    }
  ];

  const categories = [
    { id: 'all', name: '全部作品', emoji: '🎨', count: artworks.length },
    { id: 'text-to-image', name: '文生图', emoji: '🖼️', count: artworks.filter(a => a.category === 'text-to-image').length },
    { id: 'text-to-video', name: '文生视频', emoji: '🎬', count: artworks.filter(a => a.category === 'text-to-video').length },
    { id: 'image-to-video', name: '图生视频', emoji: '📹', count: artworks.filter(a => a.category === 'image-to-video').length },
    { id: 'frame-to-video', name: '帧生视频', emoji: '🎞️', count: artworks.filter(a => a.category === 'frame-to-video').length }
  ];

  const filteredArtworks = artworks.filter(artwork => {
    const matchesCategory = selectedCategory === 'all' || artwork.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleLike = (artworkId: string) => {
    const newLikedArtworks = new Set(likedArtworks);
    if (likedArtworks.has(artworkId)) {
      newLikedArtworks.delete(artworkId);
      toast.success('取消点赞');
    } else {
      newLikedArtworks.add(artworkId);
      toast.success('点赞成功！');
    }
    setLikedArtworks(newLikedArtworks);
  };

  const downloadArtwork = (artwork: Artwork) => {
    const link = document.createElement('a');
    link.href = artwork.url;
    link.download = `${artwork.title}.${artwork.type === 'image' ? 'jpg' : 'mp4'}`;
    link.click();
    toast.success(`${artwork.title} 已保存！`);
  };

  const ArtworkCard = ({ artwork }: { artwork: Artwork }) => {
    const isLiked = likedArtworks.has(artwork.id);
    
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
        <div className="relative aspect-square overflow-hidden">
          {artwork.type === 'image' ? (
            <img
              src={artwork.thumbnail}
              alt={artwork.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="relative w-full h-full">
              <img
                src={artwork.thumbnail}
                alt={artwork.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="bg-white bg-opacity-90 rounded-full p-3">
                  <div className="w-0 h-0 border-l-[12px] border-l-pink-500 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
          )}
          
          {/* 悬浮操作按钮 */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-y-2">
            <button
              onClick={() => toggleLike(artwork.id)}
              className={`p-2 rounded-full shadow-lg transition-colors ${
                isLiked ? 'bg-pink-500 text-white' : 'bg-white text-gray-600 hover:text-pink-500'
              }`}
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={() => downloadArtwork(artwork)}
              className="p-2 bg-white text-gray-600 rounded-full shadow-lg hover:text-blue-500 transition-colors"
            >
              <Download size={16} />
            </button>
          </div>
          
          {/* 类型标签 */}
          <div className="absolute top-2 left-2">
            <span className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
              {artwork.type === 'image' ? '图片' : '视频'}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 truncate">{artwork.title}</h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{artwork.description}</p>
          
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>by {artwork.author}</span>
            <span>{artwork.createdAt}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-3 text-xs text-gray-500">
              <span className="flex items-center space-x-1">
                <Heart size={12} />
                <span>{artwork.likes}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Eye size={12} />
                <span>{artwork.views}</span>
              </span>
            </div>
            
            <div className="flex space-x-1">
              {artwork.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ArtworkListItem = ({ artwork }: { artwork: Artwork }) => {
    const isLiked = likedArtworks.has(artwork.id);
    
    return (
      <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
        <div className="flex space-x-4">
          <div className="relative w-24 h-24 flex-shrink-0">
            {artwork.type === 'image' ? (
              <img
                src={artwork.thumbnail}
                alt={artwork.title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={artwork.thumbnail}
                  alt={artwork.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded-lg">
                  <div className="bg-white bg-opacity-90 rounded-full p-2">
                    <div className="w-0 h-0 border-l-[8px] border-l-pink-500 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-0.5"></div>
                  </div>
                </div>
              </div>
            )}
            
            <span className="absolute top-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 py-0.5 rounded">
              {artwork.type === 'image' ? '图片' : '视频'}
            </span>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{artwork.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{artwork.description}</p>
                
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  <span>by {artwork.author}</span>
                  <span>{artwork.createdAt}</span>
                  <span className="flex items-center space-x-1">
                    <Heart size={12} />
                    <span>{artwork.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Eye size={12} />
                    <span>{artwork.views}</span>
                  </span>
                </div>
                
                <div className="flex space-x-1 mt-2">
                  {artwork.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => toggleLike(artwork.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    isLiked ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-600 hover:text-pink-500'
                  }`}
                >
                  <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={() => downloadArtwork(artwork)}
                  className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:text-blue-500 transition-colors"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎨</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            作品展示厅
          </h1>
          <p className="text-lg text-gray-600">
            欣赏同学们用AI创作的精彩作品！
          </p>
        </div>

        {/* 搜索和筛选栏 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            {/* 搜索框 */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜索作品、标签或作者..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            {/* 视图模式切换 */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">视图:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 分类筛选 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center mb-4">
            <Filter className="mr-2 text-purple-500" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">作品分类</h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl border-2 transition-all ${
                  selectedCategory === category.id
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <span className="text-lg">{category.emoji}</span>
                <span className="font-medium">{category.name}</span>
                <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 作品展示区 */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {selectedCategory === 'all' ? '全部作品' : categories.find(c => c.id === selectedCategory)?.name}
            <span className="text-gray-500 ml-2">({filteredArtworks.length})</span>
          </h2>
        </div>

        {filteredArtworks.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">没有找到相关作品</h3>
            <p className="text-gray-600">试试调整搜索条件或选择其他分类</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
          }>
            {filteredArtworks.map((artwork) => (
              viewMode === 'grid' 
                ? <ArtworkCard key={artwork.id} artwork={artwork} />
                : <ArtworkListItem key={artwork.id} artwork={artwork} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}