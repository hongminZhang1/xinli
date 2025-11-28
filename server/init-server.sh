#!/bin/bash

# 服务器初始化脚本
# 在空白的Linux服务器上安装必要的环境

set -e

echo "=== 开始初始化服务器环境 ==="

# 更新系统包
echo "更新系统包..."
apt update && apt upgrade -y

# 安装基础工具
echo "安装基础工具..."
apt install -y curl wget git unzip

# 安装Node.js (使用NodeSource仓库安装最新LTS版本)
echo "安装Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# 验证安装
echo "验证安装..."
node --version
npm --version

# 安装PM2进程管理器
echo "安装PM2..."
npm install -g pm2

# 创建应用目录
echo "创建应用目录..."
mkdir -p /opt/xinli-api
cd /opt/xinli-api

# 设置防火墙规则 (如果使用ufw)
echo "配置防火墙..."
ufw allow 22    # SSH
ufw allow 3001  # API端口
ufw --force enable

# 创建非root用户 (可选，推荐)
echo "创建应用用户..."
useradd -m -s /bin/bash xinli || true
usermod -aG sudo xinli || true

# 设置目录权限
chown -R xinli:xinli /opt/xinli-api

echo "=== 服务器环境初始化完成 ==="
echo "Node.js版本: $(node --version)"
echo "NPM版本: $(npm --version)"
echo "PM2版本: $(pm2 --version)"
echo ""
echo "接下来请："
echo "1. 上传项目文件到 /opt/xinli-api"
echo "2. 运行 npm install 安装依赖"
echo "3. 配置环境变量"
echo "4. 启动服务"