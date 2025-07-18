# 🚀 Vercel 一键部署指南

## 📋 部署步骤 (超简单！)

### 1. 设置数据库 (5 分钟)

1. 注册 [MongoDB Atlas](https://www.mongodb.com/atlas) (免费)
2. 创建免费集群
3. 点击 "Connect" → "Connect your application"
4. 复制连接字符串，类似：
   ```
   mongodb+srv://username:password@cluster.mongodb.net/spotify-lite
   ```

### 2. 上传到 GitHub

```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: Spotify Lite app"

# 推送到 GitHub
git push origin main
```

### 3. 部署到 Vercel (2 分钟)

1. 打开 [Vercel.com](https://vercel.com)
2. 用 GitHub 账号登录
3. 点击 "New Project"
4. 选择你的 `spotify-lite-project` 仓库
5. 在环境变量中添加：
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/spotify-lite
   NODE_ENV=production
   ```
6. 点击 "Deploy"

### 4. 添加图片文件

1. 在 Vercel 项目设置中找到 "Functions" 标签
2. 上传以下图片到 `frontend/public/images/`：
   - `taylor-swift.jpg`
   - `drake.jpg`
   - `ed-sheeran.jpg`
   - `bts.jpg`
   - `the-weeknd.jpg`
   - `ariana-grande.jpg`
   - `post-malone.jpg`
   - `dua-lipa.jpg`
   - `bad-bunny.jpg`
   - `billie-eilish.jpg`

## ✅ 完成！

你的应用现在应该可以访问了：

- **URL**: `https://your-project.vercel.app`
- **功能**: 完整的音乐搜索、播放列表、用户系统
- **数据**: 自动加载的示例数据

## 🔧 故障排除

### 如果遇到问题：

1. **数据库连接错误**: 检查 MongoDB Atlas 连接字符串
2. **图片不显示**: 确保图片文件已上传到正确位置
3. **API 错误**: 检查 Vercel 环境变量设置

### 本地测试：

```bash
# 后端
cd backend && npm start

# 前端
cd frontend && npm start
```

## 🎯 优势

- ✅ **完全免费** (Vercel + MongoDB Atlas)
- ✅ **自动部署** (Git push 自动触发)
- ✅ **全球 CDN** (快速访问)
- ✅ **自动 SSL** (HTTPS 安全)
- ✅ **自动扩展** (无需服务器管理)

---

**就这么简单！🎵**
