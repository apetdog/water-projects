/**
 * 视频配置表 - 树形结构
 * 用于配置不同按钮对应的视频路径
 * 
 * 结构说明：
 * - 主按钮作为第一层节点
 * - 子按钮作为 children 属性，形成树形结构
 * - 每个节点包含：id（按钮ID）、name（按钮名称）、videoPath（视频路径）、iconUrl（图标路径，可选）
 * - isDefault 标记默认选中的按钮
 * 
 * 视频地址支持格式：
 * 1. 本地路径（相对于 public 目录）：
 *    - "/bigscreen.mp4" 
 *    - "./bigscreen.mp4"
 *    - "bigscreen.mp4"
 * 
 * 2. 远程 URL：
 *    - "https://example.com/video.mp4"
 *    - "http://example.com/video.mp4"
 * 
 * 3. 相对路径（相对于项目根目录）：
 *    - "/assets/videos/video.mp4"
 * 
 * 图标地址支持格式（iconUrl）：
 * 1. 相对路径（相对于 src/assets/icons 目录）：
 *    - "../assets/icons/home-icon.svg"  (支持 SVG)
 *    - "../assets/icons/icon-error.png" (支持 PNG)
 * 
 * 2. 远程 URL：
 *    - "https://example.com/icon.svg"
 *    - "http://example.com/icon.png"
 * 
 * 3. 绝对路径（相对于 public 目录）：
 *    - "/assets/icons/icon.svg"
 *    - "/assets/icons/icon.png"
 */

/**
 * 系统配置
 */
export const SYSTEM_CONFIG = {
  // 导航标题
  navTitle: '智慧园区3D可视化系统'
};

/**
 * 视频配置树
 * 树形结构，清晰表达按钮层级关系
 */
export const VIDEO_CONFIG_TREE = {
  // 园区总览
  btn_one: {
    id: 'btn_one',
    name: '园区总览',
    videoPath: '/bigscreen.mp4', // 支持本地路径或远程URL
    isDefault: true, // 是否为默认选中项
    children: null // 无子按钮
  },
  
  // 园区态势
  btn_two: {
    id: 'btn_two',
    name: '园区态势',
    videoPath: '/bigscreen.mp4', // 可根据需要修改为其他视频路径
    children: null // 无子按钮
  },
  
  // 首页
  home: {
    id: 'home',
    name: '首页',
    videoPath: '/bingscreen2.mp4', // 可根据需要修改为其他视频路径
    iconUrl: '../assets/icons/home-icon.svg', // 图标路径（支持 SVG 和 PNG 格式）
    children: null, // 无子按钮
    // isDefault: true, // 设置为默认选中的子按钮
  },
  
  // 安防管理（有子按钮）
  btn_three: {
    id: 'btn_three',
    name: '安防管理',
    videoPath: '/bigscreen.mp4', // 可根据需要修改为其他视频路径
    children: {
      // 分层分户
      layering: {
        id: 'layering',
        name: '分层分户',
        videoPath: '/bigscreen.mp4', // 可根据需要修改为其他视频路径
        isDefault: true // 设置为默认选中的子按钮
      },
      // 室内查看
      indoor: {
        id: 'indoor',
        name: '室内查看',
        videoPath: '/bigscreen.mp4' // 可根据需要修改为其他视频路径
      },
      // 安防预警
      warning: {
        id: 'warning',
        name: '安防预警',
        videoPath: '/bigscreen.mp4' // 可根据需要修改为其他视频路径
      },
      // 逃生路径
      rescueroad: {
        id: 'rescueroad',
        name: '逃生路径',
        videoPath: '/bigscreen.mp4' // 可根据需要修改为其他视频路径
      },
      // 人员聚集
      crowd: {
        id: 'crowd',
        name: '人员聚集',
        videoPath: '/bigscreen.mp4' // 可根据需要修改为其他视频路径
      }
    }
  },
  
  // 设备管理（有子按钮）
  btn_four: {
    id: 'btn_four',
    name: '设备管理',
    videoPath: '/bigscreen.mp4', // 可根据需要修改为其他视频路径
    children: {
      // 监控视频
      camera: {
        id: 'camera',
        name: '监控视频',
        videoPath: '/bigscreen.mp4', // 可根据需要修改为其他视频路径
        isDefault: true // 设置为默认选中的子按钮
      },
      // 停车场设备
      car: {
        id: 'car',
        name: '停车场设备',
        videoPath: '/bigscreen.mp4' // 可根据需要修改为其他视频路径
      },
      // 路灯设备
      lamp: {
        id: 'lamp',
        name: '路灯设备',
        videoPath: '/bigscreen.mp4' // 可根据需要修改为其他视频路径
      }
    }
  }
};

/**
 * 默认视频配置
 */
export const DEFAULT_VIDEO_CONFIG = {
  // 默认视频路径，支持本地和远程地址
  defaultVideoPath: '/bigscreen.mp4'
};


/**
 * 递归查找树中的节点
 * @param {Object} tree - 配置树
 * @param {string} buttonId - 按钮ID
 * @returns {Object|null} 找到的节点，未找到返回null
 */
function findNodeInTree(tree, buttonId) {
  for (const key in tree) {
    const node = tree[key];
    
    // 如果当前节点匹配
    if (node.id === buttonId) {
      return node;
    }
    
    // 如果有子节点，递归查找
    if (node.children) {
      const found = findNodeInTree(node.children, buttonId);
      if (found) {
        return found;
      }
    }
  }
  
  return null;
}

/**
 * 根据按钮ID获取视频路径
 * @param {string} buttonId - 按钮ID
 * @returns {string} 视频路径，如果未找到则返回默认路径
 */
export function getVideoPathByButtonId(buttonId) {
  if (!buttonId) {
    return DEFAULT_VIDEO_CONFIG.defaultVideoPath;
  }
  
  const node = findNodeInTree(VIDEO_CONFIG_TREE, buttonId);
  
  if (node && node.videoPath) {
    return node.videoPath;
  }
  
  // 如果都没找到，返回默认视频路径
  return DEFAULT_VIDEO_CONFIG.defaultVideoPath;
}

/**
 * 获取默认按钮ID
 * 查找树中标记为 isDefault: true 的节点
 * @returns {string|null} 默认按钮ID，未找到返回null
 */
export function getDefaultButtonId() {
  for (const key in VIDEO_CONFIG_TREE) {
    const node = VIDEO_CONFIG_TREE[key];
    
    if (node.isDefault === true) {
      return node.id;
    }
  }
  
  // 如果没有找到默认按钮，返回第一个按钮的ID
  const firstKey = Object.keys(VIDEO_CONFIG_TREE)[0];
  return firstKey ? VIDEO_CONFIG_TREE[firstKey].id : null;
}

/**
 * 获取所有视频配置（扁平化）
 * 将树形结构扁平化为 { buttonId: videoPath } 的格式
 * @returns {Object} 包含所有按钮ID和对应视频路径的配置对象
 */
export function getAllVideoConfig() {
  const config = {};
  
  /**
   * 递归遍历树，收集所有节点的视频路径
   * @param {Object} tree - 配置树
   */
  function traverseTree(tree) {
    for (const key in tree) {
      const node = tree[key];
      
      // 添加当前节点的视频路径
      if (node.id && node.videoPath) {
        config[node.id] = node.videoPath;
      }
      
      // 如果有子节点，递归遍历
      if (node.children) {
        traverseTree(node.children);
      }
    }
  }
  
  traverseTree(VIDEO_CONFIG_TREE);
  
  return config;
}

/**
 * 获取指定按钮的所有子按钮
 * @param {string} buttonId - 父按钮ID
 * @returns {Object|null} 子按钮配置对象，如果没有子按钮返回null
 */
export function getChildrenButtons(buttonId) {
  const node = findNodeInTree(VIDEO_CONFIG_TREE, buttonId);
  
  if (node && node.children) {
    return node.children;
  }
  
  return null;
}

/**
 * 获取指定按钮的默认子按钮ID
 * 优先返回标记为 isDefault: true 的子按钮，如果没有则返回第一个子按钮
 * @param {string} buttonId - 父按钮ID
 * @returns {string|null} 默认子按钮ID，如果没有子按钮返回null
 */
export function getDefaultChildButtonId(buttonId) {
  const children = getChildrenButtons(buttonId);
  
  if (children) {
    // 优先查找标记为 isDefault: true 的子按钮
    for (const key in children) {
      const child = children[key];
      if (child && child.isDefault === true) {
        return child.id;
      }
    }
    
    // 如果没有找到默认标记的，返回第一个子按钮
    const firstChildKey = Object.keys(children)[0];
    if (firstChildKey && children[firstChildKey]) {
      return children[firstChildKey].id;
    }
  }
  
  return null;
}

/**
 * 获取指定按钮的第一个子按钮ID（兼容旧函数名）
 * @param {string} buttonId - 父按钮ID
 * @returns {string|null} 第一个子按钮ID，如果没有子按钮返回null
 * @deprecated 请使用 getDefaultChildButtonId 代替
 */
export function getFirstChildButtonId(buttonId) {
  return getDefaultChildButtonId(buttonId);
}

/**
 * 检查按钮是否有子按钮
 * @param {string} buttonId - 按钮ID
 * @returns {boolean} 是否有子按钮
 */
export function hasChildren(buttonId) {
  const node = findNodeInTree(VIDEO_CONFIG_TREE, buttonId);
  return node && node.children !== null && node.children !== undefined;
}

/**
 * 获取按钮信息
 * @param {string} buttonId - 按钮ID
 * @returns {Object|null} 按钮信息对象，包含 id, name, videoPath, iconUrl 等
 */
export function getButtonInfo(buttonId) {
  return findNodeInTree(VIDEO_CONFIG_TREE, buttonId);
}

/**
 * 获取按钮图标 URL
 * 支持 SVG 和 PNG 格式
 * @param {string} buttonId - 按钮ID
 * @returns {string|null} 图标 URL，如果未配置则返回 null
 */
export function getButtonIconUrl(buttonId) {
  const buttonInfo = getButtonInfo(buttonId);
  if (buttonInfo && buttonInfo.iconUrl) {
    const iconUrl = buttonInfo.iconUrl;
    
    // 如果是相对路径（以 ../ 开头），转换为相对于 src 的路径
    if (iconUrl.startsWith('../')) {
      // 移除 ../ 前缀，直接使用相对于 src 的路径
      // 例如：../assets/icons/home-icon.svg -> /src/assets/icons/home-icon.svg
      return iconUrl.replace('../', '/src/');
    }
    
    // 如果是绝对路径（以 / 开头）或远程 URL（http:// 或 https://），直接返回
    if (iconUrl.startsWith('/') || iconUrl.startsWith('http://') || iconUrl.startsWith('https://')) {
      return iconUrl;
    }
    
    // 其他情况，假设是相对于 src/assets/icons 的路径
    return `/src/assets/icons/${iconUrl}`;
  }
  return null;
}
