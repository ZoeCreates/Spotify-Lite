# 🚀 Spotify Lite 部署指南

## 📋 部署选项

### 选项 1: Vercel + MongoDB Atlas (推荐)

#### 后端部署 (Vercel)

1. **准备后端代码**

   ```bash
   cd backend
   npm install
   ```

2. **设置环境变量**

   - 在 Vercel 项目设置中添加：
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/spotify-lite
     NODE_ENV=production
     CORS_ORIGIN=https://your-frontend-domain.vercel.app
     ```

3. **部署到 Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

#### 前端部署 (Vercel)

1. **更新 API 地址**

   ```bash
   cd frontend
   # 更新 src/services/api.js 中的 API_BASE_URL
   ```

2. **部署到 Vercel**
   ```bash
   vercel
   ```

### 选项 2: Heroku

#### 后端部署

1. **创建 Heroku 应用**

   ```bash
   heroku create your-spotify-lite-backend
   ```

2. **设置环境变量**

   ```bash
   heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/spotify-lite
   heroku config:set NODE_ENV=production
   ```

3. **部署**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

#### 前端部署 (Netlify)

1. **构建前端**

   ```bash
   cd frontend
   npm run build
   ```

2. **部署到 Netlify**
   - 拖拽 `build` 文件夹到 Netlify
   - 或使用 Netlify CLI

### 选项 3: 自托管服务器

#### 服务器要求

- Node.js 14+
- MongoDB 4.4+
- Nginx (可选)

#### 部署步骤

1. **安装依赖**

   ```bash
   # 后端
   cd backend
   npm install --production

   # 前端
   cd frontend
   npm install
   npm run build
   ```

2. **配置环境变量**

   ```bash
   cp env.example .env
   # 编辑 .env 文件
   ```

3. **启动服务**

   ```bash
   # 后端
   cd backend
   npm start

   # 前端 (使用 serve)
   cd frontend
   npx serve -s build -l 3000
   ```

## 🗄️ 数据库设置

### MongoDB Atlas (推荐)

1. 创建 MongoDB Atlas 账户
2. 创建新集群
3. 获取连接字符串
4. 更新环境变量

### 本地 MongoDB

```bash
# macOS
brew services start mongodb-community

# Ubuntu
sudo systemctl start mongod
```

## 🔧 环境变量配置

### 后端 (.env)

```env
PORT=5001
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/spotify-lite
CORS_ORIGIN=https://your-frontend-domain.com
```

### 前端

更新 `src/services/api.js` 中的 `API_BASE_URL`

## 📁 图片文件

### 必需文件

将以下图片放在 `frontend/public/images/` 文件夹中：

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

## 🌐 域名和 SSL

### 自定义域名

1. 购买域名
2. 配置 DNS 记录
3. 在部署平台设置自定义域名

### SSL 证书

- Vercel/Netlify: 自动提供
- Heroku: 自动提供
- 自托管: 使用 Let's Encrypt

## 📊 监控和维护

### 日志监控

- 使用 Vercel/Netlify 内置日志
- 或集成 Sentry 等第三方服务

### 性能优化

- 启用 CDN
- 图片压缩
- 代码分割

## 🔒 安全考虑

### 生产环境安全

1. 使用环境变量存储敏感信息
2. 启用 CORS 保护
3. 使用 HTTPS
4. 定期更新依赖

### 数据库安全

1. 使用强密码
2. 限制 IP 访问
3. 启用数据库备份

## 🚀 快速部署检查清单

- [ ] 后端代码准备完成
- [ ] 前端代码准备完成
- [ ] 环境变量配置
- [ ] 数据库连接测试
- [ ] 图片文件上传
- [ ] API 端点测试
- [ ] 前端构建成功
- [ ] 域名配置
- [ ] SSL 证书配置
- [ ] 性能测试

## 📞 支持

如果遇到部署问题，请检查：

1. 环境变量配置
2. 数据库连接
3. 网络连接
4. 日志输出

---

**Happy Deploying! 🎵**
