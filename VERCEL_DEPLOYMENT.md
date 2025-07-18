# 🚀 Vercel 部署指南 (更新版)

## 📋 部署步骤

### 1. 设置数据库 ✅ (已完成)

- MongoDB Atlas 已设置
- 连接字符串已获取

### 2. 部署后端 API

1. 打开 [Vercel.com](https://vercel.com)
2. 用 GitHub 账号登录
3. 点击 **"New Project"**
4. 选择你的 `Spotify-Lite` 仓库
5. 在 **"Root Directory"** 中选择 `backend`
6. 在环境变量中添加：
   ```
   MONGODB_URI=mongodb+srv://zihanxia0819:L1G3hibauDLRFlFN@cluster0.tle7tth.mongodb.net/spotify-lite?retryWrites=true&w=majority
   NODE_ENV=production
   ```
7. 点击 **"Deploy"**

### 3. 部署前端

1. 在 Vercel 中创建另一个项目
2. 选择同一个 `Spotify-Lite` 仓库
3. 在 **"Root Directory"** 中选择 `frontend`
4. 在环境变量中添加：
   ```
   REACT_APP_API_URL=https://你的后端域名.vercel.app/api
   ```
5. 点击 **"Deploy"**

### 4. 更新前端 API 地址

部署完成后，更新 `frontend/src/services/api.js` 中的 API 地址：

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";
```

## ✅ 完成！

你的应用现在有两个 URL：

- **后端 API**: `https://backend-project.vercel.app`
- **前端**: `https://frontend-project.vercel.app`

## 🔧 故障排除

### 如果遇到构建错误：

1. 确保选择了正确的根目录
2. 检查环境变量设置
3. 查看构建日志

### 本地测试：

```bash
# 后端
cd backend && npm start

# 前端
cd frontend && npm start
```

---

**现在重新部署吧！🎵**
