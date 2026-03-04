# Zhouyi Divination System - Deployment Guide

## 项目结构

- **zhouyi-frontend**: React + TypeScript + Vite 前端
- **zhouyi-backend**: Python FastAPI 后端

## 部署步骤

---

## 第一步：部署后端到 Vercel

### 1. 创建 GitHub 仓库

1. 打开浏览器，访问 https://github.com
2. 登录你的 GitHub 账号
3. 点击右上角的 "+" → "New repository"
4. 填写信息：
   - Repository name: `zhouyi-backend`
   - Description: `Zhouyi Divination API`
   - 选择 "Public"
   - 勾选 "Add a README file"
5. 点击 "Create repository"

### 2. 将本地代码推送到 GitHub

在 VS Code 终端中执行以下命令：

```powershell
cd C:\Users\sugar\CascadeProjects\zhouyi-backend
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/zhouyi-backend.git
git push -u origin main
```

注意：将 `你的用户名` 替换为你的实际 GitHub 用户名。

### 3. 在 Vercel 上部署

1. 访问 https://vercel.com 并登录
2. 点击 "Add New Project"
3. 选择 "Import Git Repository"
4. 找到并选择 `zhouyi-backend` 仓库
5. 配置设置：
   - Framework Preset: 选择 "Other"
   - Root Directory: 保持默认（./）
   - Build Command: 留空
   - Output Directory: 留空
6. 点击 "Deploy"

部署完成后，Vercel 会提供一个域名，类似：
`https://zhouyi-backend-你的用户名.vercel.app`

请复制这个地址，稍后在前端配置中会用到。

---

## 第二步：部署前端到 atoms.dev

### 1. 创建 GitHub 仓库

1. 回到 https://github.com
2. 创建新仓库：
   - Repository name: `zhouyi-frontend`
   - Description: `Zhouyi Divination Frontend`
   - 选择 "Public"
   - 勾选 "Add a README file"
3. 点击 "Create repository"

### 2. 将前端代码推送到 GitHub

在 VS Code 终端中执行：

```powershell
cd C:\Users\sugar\CascadeProjects\zhouyi-frontend
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/zhouyi-frontend.git
git push -u origin main
```

### 3. 在 atoms.dev 上部署

1. 访问 https://atoms.dev 并登录
2. 点击 "Create Project"
3. 选择 "Import from GitHub"
4. 授权并选择 `zhouyi-frontend` 仓库
5. 配置构建设置：
   - Framework: 选择 "Vite"
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. **重要：设置环境变量**
   - 点击 "Environment Variables"
   - 添加变量：
     - Name: `VITE_API_BASE_URL`
     - Value: `https://zhouyi-backend-你的用户名.vercel.app`
       （替换为你在 Vercel 上实际获得的地址）
7. 点击 "Deploy"

部署完成后，atoms.dev 会提供一个域名，类似：
`https://zhouyi-frontend-xxx.atoms.dev`

这就是你的周易占卜系统的前端地址，可以直接在浏览器中访问。

---

## 第三步：验证部署

### 测试后端

在浏览器中访问：
```
https://zhouyi-backend-你的用户名.vercel.app/api/health
```

应该看到返回 JSON：
```json
{
  "status": "ok",
  "modules": {
    "utils": true,
    "ziwei": true,
    "bazi": true
  }
}
```

### 测试前端

1. 打开 atoms.dev 提供的地址
2. 检查页面是否正常显示
3. 尝试使用各个占卜功能

---

## 本地开发

如需本地测试：

### 启动后端
```powershell
cd C:\Users\sugar\CascadeProjects\zhouyi-backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn api.server:app --reload
```

后端将运行在 http://localhost:8000

### 启动前端
```powershell
cd C:\Users\sugar\CascadeProjects\zhouyi-frontend
npm install
npm run dev
```

前端将运行在 http://localhost:5173

---

## API 端点说明

后端提供以下 API：

- `POST /api/divine/text` - 文字起卦
- `POST /api/divine/zhuge` - 诸葛神数
- `POST /api/divine/pair` - 数字起卦
- `GET /api/divine/random` - 随机起卦
- `GET /api/divine/current` - 当前时间起卦
- `POST /api/divine/bazi` - 八字分析
- `POST /api/divine/match` - 八字合婚

---

## 故障排除

### 如果后端部署失败

1. 检查 `requirements.txt` 是否包含所有依赖
2. 在 Vercel 部署日志中查看具体错误信息
3. 确保 `vercel.json` 配置正确

### 如果前端调用后端失败

1. 检查 `VITE_API_BASE_URL` 是否正确设置为 Vercel 地址
2. 在浏览器开发者工具（F12）中查看 Network 标签
3. 检查是否有 CORS 错误

### 重新部署

更新代码后，只需重新推送 GitHub，Vercel 和 atoms.dev 会自动重新部署。

```powershell
git add .
git commit -m "Update"
git push
```

---

## 项目文件说明

### 后端文件 (zhouyi-backend)

- `api/index.py` - Vercel 入口点
- `api/server.py` - FastAPI 主应用
- `api/utils.py` - 核心占卜逻辑
- `api/bazi.py` - 八字计算
- `api/ziwei.py` - 紫微斗数计算
- `api/simple_lunar.py` - 简化农历计算
- `api/*.json` - 易经数据和诸葛神数数据
- `vercel.json` - Vercel 配置
- `requirements.txt` - Python 依赖

### 前端文件 (zhouyi-frontend)

- `src/App.tsx` - 主界面组件
- `src/App.css` - 样式文件（中国风）
- `index.html` - 入口 HTML
- `vite.config.ts` - Vite 配置
